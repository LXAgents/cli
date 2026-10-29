/**
 * OpenRouter client — single responsibility: perform the
 * POST /chat/completions request and stream text deltas to a callback.
 * Does not parse CLI args, does not touch stdout.
 */

import { StreamParser } from "./stream-parser.js";

export class OpenRouterClient {
  constructor({ apiKey, baseUrl, referer, title }) {
    if (!apiKey) {
      throw new Error(
        "OPENROUTER_API_KEY is not set. Export it or pass apiKey to the client."
      );
    }
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.referer = referer;
    this.title = title;
    this.parser = new StreamParser();
  }

  headers() {
    return {
      Authorization: `Bearer ${this.apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": this.referer,
      "X-Title": this.title,
    };
  }

  /**
   * Stream a chat completion, invoking onText with each text delta.
   * Resolves with the full assembled text.
   */
  async chat({ model, messages, system, onText }) {
    const body = {
      model,
      messages,
      stream: true,
      ...(system ? { system } : {}),
    };

    const res = await fetch(`${this.baseUrl}/chat/completions`, {
      method: "POST",
      headers: this.headers(),
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`OpenRouter request failed (${res.status}): ${text}`);
    }

    if (!res.body) {
      throw new Error("OpenRouter returned no response body");
    }

    const decoder = new TextDecoderStream();
    const stream = res.body.pipeThrough(decoder);
    const reader = stream.getReader();

    let text = "";
    let done = false;

    try {
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          text += this.parser.process(value, onText);
        }
      }
    } finally {
      reader.releaseLock();
    }

    return text;
  }
}

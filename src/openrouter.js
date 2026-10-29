/**
 * OpenRouter chat/completions client.
 *
 * POST https://openrouter.ai/api/v1/chat/completions
 * Auth: Authorization: Bearer <OPENROUTER_API_KEY>
 *
 * `chat()` streams text chunks to an `onText` callback so callers can render
 * tokens as they arrive. Returns the full assembled completion.
 */

const OPENROUTER_BASE = "https://openrouter.ai/api/v1";

export class OpenRouterClient {
  constructor({ apiKey, baseUrl = OPENROUTER_BASE } = {}) {
    this.apiKey = apiKey || process.env.OPENROUTER_API_KEY;
    if (!this.apiKey) {
      throw new Error(
        "OPENROUTER_API_KEY is not set. Export it or pass apiKey to the client."
      );
    }
    this.baseUrl = baseUrl;
  }

  headers() {
    return {
      "Authorization": `Bearer ${this.apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://github.com/claude-mirror",
      "X-Title": "claude-mirror",
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
      throw new Error(
        `OpenRouter request failed (${res.status}): ${text}`
      );
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
          text += this.processChunk(value, onText);
        }
      }
    } finally {
      reader.releaseLock();
    }

    return text;
  }

  /**
   * Parse a single SSE data frame's worth of text, splitting on newlines and
   * extracting `data:` fields. OpenRouter sends one or more `data: {...}\n\n`
   * frames per chunk; each data line is either `{...}` JSON or `[DONE]`.
   */
  processChunk(chunk, onText) {
    let out = "";
    for (const line of chunk.split("\n")) {
      if (!line.startsWith("data: ")) continue;
      const payload = line.slice(6).trim();
      if (payload === "[DONE]") continue;
      try {
        const parsed = JSON.parse(payload);
        const delta =
          parsed.choices?.[0]?.delta?.content ||
          parsed.choices?.[0]?.delta?.text ||
          "";
        if (delta) {
          out += delta;
          if (onText) onText(delta);
        }
      } catch {
        // Ignore non-JSON data lines (heartbeats, etc.).
      }
    }
    return out;
  }
}

/**
 * Chat tool — single responsibility: define the claude-mirror MCP tool
 * (input schema) and handle calls by streaming through the OpenRouter client.
 * No transport logic, no CLI args.
 */

import { OpenRouterClient } from "../../client/openrouter.js";
import { resolveConfig } from "../../config.js";

export const CHAT_TOOL = {
  name: "claude-mirror.chat",
  description: "Send a message to an OpenRouter model and stream the text response.",
  inputSchema: {
    type: "object",
    properties: {
      message: {
        type: "string",
        description: "The user message to send to the model.",
      },
      model: {
        type: "string",
        description:
          "OpenRouter model id (overrides OPENROUTER_DEFAULT_MODEL or default).",
      },
      system: {
        type: "string",
        description: "Optional system prompt.",
      },
    },
    required: ["message"],
  },
};

export function createChatTool({ client, onText }) {
  async function call({ message, model, system } = {}) {
    if (!message || typeof message !== "string") {
      throw new Error("message is required");
    }

    const config = resolveConfig();
    const openrouter = client || new OpenRouterClient({
      apiKey: config.apiKey,
      baseUrl: config.baseUrl,
      referer: config.referer,
      title: config.title,
    });

    const chunks = [];
    await openrouter.chat({
      model: model || config.defaultModel,
      messages: [{ role: "user", content: message }],
      system,
      onText: (delta) => {
        chunks.push(delta);
        if (onText) onText(delta);
      },
    });

    const text = chunks.join("");
    return {
      structuredContent: { text, model: model || config.defaultModel },
      content: [{ type: "text", text }],
    };
  }

  return {
    definition: CHAT_TOOL,
    call,
  };
}

/**
 * MCP server tools composition — single responsibility: assemble an
 * McpServer with the claude-mirror chat tool registered. Owns composition
 * of protocol server + tools; delegates networking to OpenRouterClient.
 */

import { McpServer } from "./server.js";
import { CAPABILITIES } from "./protocol.js";
import { createChatTool } from "./tools/chat-tool.js";

export function createMcpChatServer({ onText } = {}) {
  const chatTool = createChatTool({ onText });

  const server = new McpServer({
    capabilities: CAPABILITIES,
    tools: [chatTool.definition],
    onToolCall: (name, arguments_) => {
      if (name !== chatTool.definition.name) {
        throw new Error(`unknown tool: ${name}`);
      }
      return chatTool.call(arguments_);
    },
  });

  return { server, chatTool };
}

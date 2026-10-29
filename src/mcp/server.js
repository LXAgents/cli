/**
 * MCP server — single responsibility: handle MCP JSON-RPC requests
 * (initialize, tools/list, tools/call) and route tool calls to a handler.
 * No transport logic, no CLI args.
 */

import {
  initializeResponse,
  toolsListResponse,
  jsonrpc,
  jsonrpcError,
  ErrorCode,
} from "./protocol.js";

export class McpServer {
  constructor({ capabilities, tools = [], onToolCall }) {
    this.capabilities = capabilities;
    this.tools = tools;
    this.onToolCall = onToolCall;
  }

  /**
   * Handle one MCP JSON-RPC message. Returns a response object (or a
   * Promise<Response> when a tool call is async), or null for notifications.
   */
  async handle(message) {
    const { id, method, params } = message;

    switch (method) {
      case "initialize":
        return jsonrpc(id, initializeResponse(this.capabilities));
      case "initialized":
        // Notification: no response.
        return null;
      case "tools/list":
        return jsonrpc(id, toolsListResponse({ tools: this.tools }));
      case "tools/call": {
        const name = params?.name;
        const arguments_ = params?.arguments ?? {};
        if (!this.onToolCall) {
          return jsonrpcError(id, ErrorCode.INTERNAL_ERROR, "no tool handler");
        }
        try {
          const result = await this.onToolCall(name, arguments_);
          return jsonrpc(id, result);
        } catch (err) {
          return jsonrpcError(id, ErrorCode.INTERNAL_ERROR, err.message);
        }
      }
      default:
        return jsonrpcError(id, ErrorCode.METHOD_NOT_FOUND, `method not found: ${method}`);
    }
  }
}

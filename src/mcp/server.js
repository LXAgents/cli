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

  handle(message) {
    const { id, method, params } = message;

    switch (method) {
      case "initialize":
        return this._respond(id, initializeResponse(this.capabilities));
      case "initialized":
        // Notification: no response.
        return null;
      case "tools/list":
        return this._respond(id, toolsListResponse({ tools: this.tools }));
      case "tools/call": {
        const name = params?.name;
        const arguments_ = params?.arguments ?? {};
        if (!this.onToolCall) {
          return this._error(id, ErrorCode.INTERNAL_ERROR, "no tool handler");
        }
        try {
          const result = this.onToolCall(name, arguments_);
          return this._respond(id, result);
        } catch (err) {
          return this._error(id, ErrorCode.INTERNAL_ERROR, err.message);
        }
      }
      default:
        return this._error(id, ErrorCode.METHOD_NOT_FOUND, `method not found: ${method}`);
    }
  }

  _respond(id, result) {
    return jsonrpc(id, result);
  }

  _error(id, code, message) {
    return jsonrpcError(id, code, message);
  }
}

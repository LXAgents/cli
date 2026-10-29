/**
 * MCP protocol — single responsibility: MCP constants, capabilities, and
 * JSON-RPC 2.0 message shapes. No transport, no CLI, no business logic.
 */

export const PROTOCOL_VERSION = "2024-11-05";
export const TRANSPORT = "stdio";

export const CAPABILITIES = {
  tools: { listChanged: false },
};

export function initializeResponse({ protocolVersion, capabilities }) {
  return {
    protocolVersion,
    capabilities,
    serverInfo: {
      name: "claude-mirror",
      version: "1.1.0",
    },
  };
}

export function toolsListResponse({ tools }) {
  return { tools };
}

export function jsonrpc(id, result) {
  return { jsonrpc: "2.0", id, result };
}

export function jsonrpcError(id, code, message) {
  return { jsonrpc: "2.0", id, error: { code, message } };
}

export const ErrorCode = {
  METHOD_NOT_FOUND: -32601,
  INVALID_PARAMS: -32602,
  INTERNAL_ERROR: -32603,
};

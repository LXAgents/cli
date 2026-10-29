/**
 * MCP module entry — re-exports protocol, transport, and server for
 * consumers that want the whole surface at once.
 */

export {
  PROTOCOL_VERSION,
  TRANSPORT,
  CAPABILITIES,
  initializeResponse,
  toolsListResponse,
  jsonrpc,
  jsonrpcError,
  ErrorCode,
} from "./protocol.js";
export { StdioTransport } from "./transport.js";
export { McpServer } from "./server.js";
export { createRunner } from "./runner.js";

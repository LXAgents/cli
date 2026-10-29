/**
 * MCP runner — single responsibility: wire the stdio transport and the MCP
 * server together, awaiting async responses and sending them back.
 * Owns composition of transport + server; contains no protocol logic.
 */

import { StdioTransport } from "./transport.js";
import { McpServer } from "./server.js";

export function createRunner(server) {
  const transport = new StdioTransport();

  transport.onMessage(async (message) => {
    const response = await server.handle(message);
    if (response) {
      transport.send(response);
    }
  });

  return {
    transport,
    start() {
      transport.start();
    },
    close() {
      transport.close();
    },
  };
}

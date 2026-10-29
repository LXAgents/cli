/**
 * Stdio transport — single responsibility: read JSON-RPC lines from stdin and
 * write JSON-RPC lines to stdout. No protocol logic, no business logic.
 */

import { createInterface } from "node:readline";

export class StdioTransport {
  constructor() {
    this._handlers = [];
    this._closed = false;
  }

  onMessage(handler) {
    this._handlers.push(handler);
  }

  start() {
    const rl = createInterface({ input: process.stdin });
    rl.on("line", (line) => {
      if (this._closed) return;
      const trimmed = line.trim();
      if (!trimmed) return;
      try {
        const message = JSON.parse(trimmed);
        for (const handler of this._handlers) {
          handler(message);
        }
      } catch {
        // Ignore unparseable lines.
      }
    });
  }

  send(message) {
    if (this._closed) return;
    process.stdout.write(JSON.stringify(message) + "\n");
  }

  close() {
    this._closed = true;
  }
}

/**
 * Input reading — single responsibility: obtain the user message from CLI
 * arguments or stdin. No network, no output.
 */

import { createInterface } from "node:readline";

export async function readStdin() {
  const lines = [];
  const rl = createInterface({ input: process.stdin });
  for await (const line of rl) {
    lines.push(line);
  }
  return lines.join("\n");
}

export async function resolveMessage(message) {
  if (message) return message;
  if (!process.stdin.isTTY) {
    return readStdin();
  }
  return undefined;
}

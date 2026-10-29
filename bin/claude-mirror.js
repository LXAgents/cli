#!/usr/bin/env node
/**
 * CLI entry point — single responsibility: wire modules and run the program.
 * Delegates config, args, IO, output, and the OpenRouter client to their own
 * modules; contains no business logic of its own.
 */

import { resolveConfig } from "../src/config.js";
import { parseArgs, usage } from "../src/args.js";
import { resolveMessage } from "../src/io.js";
import { Terminal } from "../src/output/terminal.js";
import { OpenRouterClient } from "../src/client/openrouter.js";
import { createMcpChatServer } from "../src/mcp/server-tools.js";
import { createRunner } from "../src/mcp/runner.js";

async function runDirect(terminal, config, options) {
  let message = options.message;
  if (!message) {
    message = await resolveMessage(undefined);
  }

  if (!message) {
    terminal.error(usage(config.defaultModel));
    return 1;
  }

  const messages = [{ role: "user", content: message }];

  const client = new OpenRouterClient({
    apiKey: config.apiKey,
    baseUrl: config.baseUrl,
    referer: config.referer,
    title: config.title,
  });

  try {
    await client.chat({
      model: options.model || config.defaultModel,
      messages,
      system: options.system,
      onText: (delta) => terminal.write(delta),
    });
    terminal.writeLine("");
    return 0;
  } catch (err) {
    terminal.error(`Error: ${err.message}`);
    return 1;
  }
}

async function runMcp(config) {
  if (!config.apiKey) {
    process.stderr.write(
      "Error: OPENROUTER_API_KEY is not set. Export it or pass apiKey to the client.\n"
    );
    return 1;
  }

  const { server } = createMcpChatServer();
  const runner = createRunner(server);
  runner.start();

  // Keep the process alive until stdin closes.
  return new Promise((resolve) => {
    process.stdin.on("end", () => {
      runner.close();
      resolve(0);
    });
    process.stdin.on("error", () => {
      runner.close();
      resolve(0);
    });
  });
}

async function main() {
  const terminal = new Terminal();
  const config = resolveConfig();
  const options = parseArgs(process.argv.slice(2));

  if (options.help) {
    terminal.writeLine(usage(config.defaultModel));
    return 0;
  }

  if (options.mcp) {
    return runMcp(config);
  }

  return runDirect(terminal, config, options);
}

const code = await main();
process.exit(code);

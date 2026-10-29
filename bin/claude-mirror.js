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

async function main() {
  const terminal = new Terminal();
  const config = resolveConfig();
  const options = parseArgs(process.argv.slice(2));

  if (options.help) {
    terminal.writeLine(usage(config.defaultModel));
    return 0;
  }

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

const code = await main();
process.exit(code);

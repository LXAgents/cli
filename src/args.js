/**
 * Argument parsing — single responsibility: parse argv into a normalized
 * options object. No network, no output, no config reading.
 */

const DEFAULT_MODEL = "openai/gpt-4o-mini";

export function parseArgs(argv) {
  const options = { model: DEFAULT_MODEL, system: undefined, message: undefined };
  let i = 0;
  while (i < argv.length) {
    const arg = argv[i];
    if (arg === "--model") {
      options.model = argv[++i];
    } else if (arg === "--system") {
      options.system = argv[++i];
    } else if (arg === "--help" || arg === "-h") {
      options.help = true;
    } else if (!options.message) {
      options.message = arg;
    } else {
      options.message += " " + arg;
    }
    i++;
  }
  return options;
}

export function usage(defaultModel) {
  return `Usage: claude-mirror [options] <message>

Options:
  --model <id>    OpenRouter model id (default: ${defaultModel})
  --system <text> System prompt
  --help          Show this help

The message may be passed as an argument or piped via stdin.
Set OPENROUTER_API_KEY in your environment (or a .env file).`;
}

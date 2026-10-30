# Using claude-mirror with agents

`claude-mirror` is a small CLI that sends a message to an OpenRouter model and streams the text response to the terminal. It has two modes:

- **Direct** — run from the command line or pipe a message through stdin. Good for quick checks and agent scripts.
- **MCP** — run as a Model Context Protocol server over stdio. Good for agent hosts that speak MCP (e.g. Claude Code) and want to call `claude-mirror.chat` as a tool.

## Prerequisites

Node.js >= 22 and an OpenRouter API key:

```sh
export OPENROUTER_API_KEY=sk-or-...
```

## Direct run

Run the entry point directly:

```sh
node src/cli.js "Say hi"
```

Or pipe a message through stdin:

```sh
echo "Say hi" | node src/cli.js
```

Options:

| Flag | Meaning |
|------|---------|
| `--model <id>` | OpenRouter model id (default: `openai/gpt-4o-mini`) |
| `--system <text>` | Optional system prompt |
| `--mcp` | Run as an MCP server over stdio instead of direct chat |
| `--help`, `-h` | Show usage |

The default model can be overridden with `OPENROUTER_DEFAULT_MODEL`.

## MCP server mode

Start claude-mirror as an MCP server:

```sh
node src/cli.js --mcp
```

It speaks JSON-RPC 2.0 over stdio and exposes one tool:

- `claude-mirror.chat` — sends a message to an OpenRouter model and streams the text response.
  - `message` (string, required): the user message.
  - `model` (string, optional): overrides the default model.
  - `system` (string, optional): an optional system prompt.

Configure an MCP client to launch `node src/cli.js --mcp` over stdio. The client can then call `claude-mirror.chat` like any other MCP tool.

## Layout

All code lives under `src/`:

- `src/cli.js` — entry point, wires modules and runs the program
- `src/config.js` — runtime settings from env and defaults
- `src/args.js` — CLI argument parsing
- `src/io.js` — message resolution from args or stdin
- `src/output/terminal.js` — stdout/stderr writing
- `src/client/openrouter.js` — OpenRouter streaming client
- `src/client/stream-parser.js` — SSE delta parsing
- `src/mcp/` — MCP protocol, transport, server, runner, and chat tool

Each module is single-responsibility. The `bin/` directory no longer exists; the entry point is `src/cli.js` (see `package.json`).

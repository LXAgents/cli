# Task record — claude-mirror-openrouter

**Branch:** `master` (all task branches merged in order)
**Goal:** Recreate a Claude CLI mirror for personal use, routing natively through OpenRouter.
**Objective:** A runnable `claude-mirror` CLI that sends a message to an OpenRouter model and streams the text response to the terminal; default model overridable via `--model`; API key read from env/config. Also runnable as an MCP server over stdio.

| # | Title | Branch | Files / areas | PR |
|---|-------|--------|---------------|----|
| 1 | Task record + agents instructions | `plan/claude-mirror-openrouter` | `.agents/memory/tasks/`, `.agents/` | — |
| 2 | Scaffold CLI project | `feat/scaffold` | root, `bin/`, `src/` | — |
| 3 | Verify run | `fix/cli-run` | `src/` | — |
| 4 | Release 1.0.0 | `release/1.0.0` | `wiki/logs/1/0/0/` | — |
| 5 | Refactor to single-responsibility | `refactor/single-responsibility` | `src/`, `bin/`, `.agents/rules/` | — |
| 6 | MCP protocol core | `feat/mcp-core` | `src/mcp/` | — |
| 7 | MCP server tools | `feat/mcp-server` | `src/mcp/` | — |
| 8 | MCP CLI integration | `feat/mcp-cli` | `bin/claude-mirror.js`, `src/args.js` | — |
| 9 | MCP verify run | `fix/mcp-run` | `src/mcp/` | — |
| 10 | Release 1.1.0 | `release/1.1.0` | `wiki/logs/1/1/0/` | — |

## Task 1 — plan/claude-mirror-openrouter

- Created `.agents/memory/tasks/claude-mirror-openrouter.md` (this record) with the plan.
- Copied `.agents/branching-strategy.md`, `.agents/commit-conventions.md`, `.agents/plan-creator.md` into the repo from the workspace `.agents/`.
- `.gitignore` excludes `.agents/plans/` (verified via `git check-ignore -v`).

## Task 2 — feat/scaffold

- `package.json` — bin entry `claude-mirror` → `bin/claude-mirror.js`, `type: module`, node `>=22`
- `.gitignore` — excludes `node_modules/`, `dist/`, `*.log`, `.env*`, `.agents/plans/`
- `src/openrouter.js` — OpenRouter chat/completions streaming client (later split in Task 5)
- `bin/claude-mirror.js` — CLI with `--model`, `--system`, `--help`, stdin/args input
- Committed 14b88a0.

## Task 3 — fix/cli-run

- Syntax-checked `bin/claude-mirror.js` and `src/openrouter.js` (both OK).
- Verified `--help` (rc 0), no-args (usage rc 1), missing-key (clear error rc 1).
- Live end-to-end against OpenRouter complete: `echo "Say hi" | node bin/claude-mirror.js` → streamed response.
- Committed 4d742ca.

## Task 4 — release/1.0.0

- `wiki/logs/1/0/0/README.md` — version claim + changelog.
- PR column filled: no PRs opened (not pushed to a forge).
- Committed 7af4137.

## Task 5 — refactor/single-responsibility

- Split `src/openrouter.js` into single-responsibility modules:
  - `src/config.js` — env + defaults
  - `src/client/openrouter.js` — OpenRouter streaming client
  - `src/client/stream-parser.js` — SSE delta parsing
  - `src/output/terminal.js` — stdout/stderr writing
  - `src/args.js` — CLI argument parsing
  - `src/io.js` — message resolution from args/stdin
  - `bin/claude-mirror.js` — module composition only
- Removed monolithic `src/openrouter.js`
- Added `.agents/rules/no-spaghetti.md`, `.agents/rules/folder-layout.md`, `.agents/rules/single-responsibility.md`
- Verified: all modules pass `node --check`; `--help`, no-args, missing-key paths correct.
- Committed b29bff7.

## Task 6 — feat/mcp-core

- `src/mcp/protocol.js` — MCP constants, capabilities, JSON-RPC 2.0 shapes
- `src/mcp/transport.js` — stdio JSON-RPC read/write transport
- `src/mcp/server.js` — MCP server: initialize, tools/list, tools/call
- `src/mcp/index.js` — module re-exports
- Committed f67d448.

## Task 7 — feat/mcp-server

- `src/mcp/tools/chat-tool.js` — claude-mirror.chat tool definition + OpenRouter call
- `src/mcp/server-tools.js` — compose McpServer with chat tool registered
- `src/mcp/runner.js` — wire stdio transport to MCP server, await async responses
- `src/mcp/server.js`: handle() made async to await tool calls
- `src/mcp/index.js`: re-export createRunner
- Committed b4ed5ee.

## Task 8 — feat/mcp-cli

- `src/args.js` — `--mcp` flag
- `bin/claude-mirror.js` — `--mcp` runs MCP server over stdio; default chat mode unchanged
- Committed 6830b87.

## Task 9 — fix/mcp-run

- Fixed initializeResponse (protocolVersion now from PROTOCOL_VERSION constant).
- Verified MCP protocol end-to-end (no network): initialize, tools/list,
  method-not-found error (-32601), notification (no response). All pass.
- Committed e382189.

## Task 10 — release/1.1.0

- `wiki/logs/1/1/0/README.md` — version claim + changelog.
- Record closed out.

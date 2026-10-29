# claude-mirror 1.0.0

Initial release of the Claude CLI mirror that routes natively through OpenRouter.

## Overview

A personal-use `claude-mirror` CLI that sends a message to an OpenRouter model and streams the text response to the terminal. The API key is read from `OPENROUTER_API_KEY`; the default model is overridable with `--model`; a system prompt can be set with `--system`.

## Added

- `package.json` — bin entry `claude-mirror` → `bin/claude-mirror.js`, `type: module`, node `>=22`
- `.gitignore` — excludes `node_modules/`, `dist/`, `*.log`, `.env*`, `.agents/plans/`
- `src/openrouter.js` — `OpenRouterClient` posting to `https://openrouter.ai/api/v1/chat/completions` with SSE streaming and `onText` delta callback
- `bin/claude-mirror.js` — CLI entry: `--model`, `--system`, `--help`, message as argument or piped via stdin
- `.agents/branching-strategy.md`, `.agents/commit-conventions.md`, `.agents/plan-creator.md` — repo instruction set
- `.agents/memory/tasks/claude-mirror-openrouter.md` — task record for this work

## Modified

(none)

## Deleted

(none)

## Summary

First working release. Live end-to-end verified against OpenRouter: `echo "Say hi" | node bin/claude-mirror.js` returned a streamed completion.

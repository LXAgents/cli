---
name: folder-layout
description: Folder layout rule — src/ subfolders group modules by concern (client, output, config, args, io); bin/ holds only the entry point.
---

# Folder Layout

## `src/config.js`

Responsibility: resolve runtime settings from environment variables and
defaults. Owns nothing else.

## `src/client/`

Responsibility: all network communication with OpenRouter.
- `openrouter.js` — HTTP POST /chat/completions and streaming.
- `stream-parser.js` — SSE chunk → text delta parsing (pure function).

## `src/output/terminal.js`

Responsibility: writing to stdout/stderr. Owns no network or parsing logic.

## `src/args.js`

Responsibility: parsing `process.argv` into a normalized options object.

## `src/io.js`

Responsibility: resolving the user message from CLI arguments or stdin.

## `bin/claude-mirror.js`

Responsibility: wiring the modules together and running the program. Contains
no business logic of its own.

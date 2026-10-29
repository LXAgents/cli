---
name: single-responsibility
description: Single responsibility rule — each file does one thing, one module owns one concern, and cross-cutting behavior is composition, not duplication.
---

# Single Responsibility

## Rule

Each file has one reason to change:

| File | Reason to change |
|------|-----------------|
| `src/config.js` | Environment variable names, defaults, or base URL change. |
| `src/client/openrouter.js` | OpenRouter API shape, auth headers, or fetch behavior changes. |
| `src/client/stream-parser.js` | SSE format or delta field changes. |
| `src/output/terminal.js` | Where output is written (stdout/stderr) changes. |
| `src/args.js` | CLI flags change. |
| `src/io.js` | How input is read changes. |
| `bin/claude-mirror.js` | How modules are composed changes. |

## Composition over duplication

Cross-cutting behavior (e.g. logging every request) is added by composing
modules, not by editing each file. The entry point owns composition; every
other module owns exactly one concern.

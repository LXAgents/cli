# claude-mirror 1.2.1

Rename agents index to `src/index.js`; remove duplicate instruction files from `cli/.agents/`.

## Overview

`claude-mirror` sends a message to an OpenRouter model and streams the text response to the terminal, and can also run as an MCP server over stdio. This release changes only layout and documentation — no behavior change.

## Modified

- `src/index.js` — renamed from `src/index.md`; agents usage index: direct run and MCP stdio modes, CLI flags, and the `src/` layout

## Deleted

- `.agents/branching-strategy.md` — duplicate of `shared-instruction/content/git/branching-strategy.md`
- `.agents/commit-conventions.md` — duplicate of `shared-instruction/content/git/commit-conventions.md`
- `.agents/plan-creator.md` — duplicate of `shared-instruction/content/creators/plan-creator.md`

## Summary

Cleanup release. Entry point remains `src/cli.js`; documentation now at `src/index.js`. No behavior change. Version `1.2.1` (patch).

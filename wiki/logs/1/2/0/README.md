# claude-mirror 1.2.0

CLI restructure: all code now lives under `src/`, the `bin/` directory is gone, and an agents usage index is added.

## Overview

`claude-mirror` sends a message to an OpenRouter model and streams the text response to the terminal, and can also run as an MCP server over stdio. This release changes only layout and documentation — no behavior change.

## Added

- `src/index.md` — agents usage index: direct run and MCP stdio modes, CLI flags, and the `src/` layout

## Modified

- `src/cli.js` — entry point moved here from `bin/claude-mirror.js`; imports now resolve relative to `src/`
- `package.json` — `bin["claude-mirror"]` and the `start` script now point at `src/cli.js`

## Deleted

- `bin/` — removed entirely; the CLI entry point is `src/cli.js`

## Summary

Restructure release. Every module remains single-responsibility under `src/`; the `bin/` entry point no longer exists. Verified: `node --check src/cli.js`, `--help` exits 0, no args prints usage and exits 1, and MCP initialize/tools/list respond over stdio. Version `1.2.0` (minor: adds `src/index.md`, no behavior change).

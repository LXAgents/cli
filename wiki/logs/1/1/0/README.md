# claude-mirror 1.1.0

MCP connector release — claude-mirror can now run as a Model Context Protocol
server over stdio.

## Overview

Add `--mcp` to run claude-mirror as an MCP server. MCP clients connect over
stdio (JSON-RPC 2.0) and can call the `claude-mirror.chat` tool to send
messages to OpenRouter models.

## Added

- `src/mcp/protocol.js` — MCP constants, capabilities, JSON-RPC 2.0 shapes
- `src/mcp/transport.js` — stdio JSON-RPC read/write transport
- `src/mcp/server.js` — MCP server: initialize, tools/list, tools/call
- `src/mcp/runner.js` — wire transport to server, await async responses
- `src/mcp/tools/chat-tool.js` — claude-mirror.chat tool definition + OpenRouter call
- `src/mcp/server-tools.js` — compose McpServer with chat tool registered
- `src/mcp/index.js` — module re-exports
- `src/args.js` — `--mcp` flag
- `bin/claude-mirror.js` --mcp runs MCP server; default chat mode unchanged
- `.agents/rules/no-spaghetti.md`, `folder-layout.md`, `single-responsibility.md`
- `wiki/logs/1/1/0/` — this release changelog

## Modified

- `bin/claude-mirror.js` — added --mcp flag handling and MCP runner wiring
- `src/args.js` -- parse --mcp flag

## Deleted

(none)

## Summary

Second release. claude-mirror is usable both as a direct CLI and as an MCP
server over stdio. MCP protocol verified end-to-end (initialize, tools/list,
error handling). Chat tool call requires OPENROUTER_API_KEY set in the
environment.

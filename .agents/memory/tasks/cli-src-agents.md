# Task record — cli-src-agents

**Branch:** `master` (task branches merged in order)
**Goal:** Restructure the claude-mirror CLI so all code lives under `src/`, delete `bin/`, and add an agents usage index at `src/index.md`.
**Objective:** A runnable `claude-mirror` CLI whose entry point and all modules live under `src/`, with `bin/` removed, `package.json.bin` repointed, and `src/index.md` documenting direct run + MCP stdio use with agents; verified by running the CLI from the new entry point.
**Version:** `1.2.0` (proposed; minor — layout change + new agents index doc, no behavior change). Needs user approval before the `release/1.2.0` branch is created.

| # | Title | Branch | Files / areas | PR |
|---|-------|--------|---------------|----|
| 1 | Task record + plan | `plan/cli-src-agents` | `.agents/memory/tasks/`, `.agents/plans/` | — |
| 2 | Move entry point to src/, delete bin/ | `feat/cli-src-layout` | `bin/`, `src/cli.js`, `package.json` | — |
| 3 | Agents usage index | `docs/cli-agents-index` | `src/index.md` | — |
| 4 | Verify CLI runs from src/ | `fix/cli-verify` | `src/cli.js` | — |
| 5 | Release 1.2.0 | `release/1.2.0` | `wiki/logs/1/2/0/`, task record | — |

## Task 1 — plan/cli-src-agents

- Created `.agents/memory/tasks/cli-src-agents.md` (this record) with the plan.
- Created `.agents/plans/` working plan files: `tasks.md`, `scope.md`, `git-workflow.md`, `verification.md`, `README.md`.
- `.gitignore` already excludes `.agents/plans/` (verified via `git check-ignore -v`).
- Existing instruction files served from workspace `shared-instruction`; no instruction files duplicated into `cli/.agents/` per user request.

## Task 2 — feat/cli-src-layout

- Moved `bin/claude-mirror.js` to `src/cli.js` with imports repointed to `./`.
- Removed `bin/` entirely.
- `package.json` `bin["claude-mirror"]` and `start` script now point at `src/cli.js`.
- Committed 871c1fe.

## Task 3 — docs/cli-agents-index

- Created `src/index.md` documenting direct run and MCP stdio use with agents.
- Committed 834ea47.

## Task 4 — fix/cli-verify

- `node --check src/cli.js` passes.
- `--help` exits 0; no args prints usage and exits 1.
- MCP mode over stdio: initialize and tools/list respond correctly (notification produces no response).
- No commit — pure verification task, nothing changed.

## Task 5 — release/1.2.0

- `wiki/logs/1/2/0/README.md` — version claim + changelog.
- Closed out this record: PR column filled, Task 5 entry added, record marked done.
- PRs not yet opened; awaiting user approval to push and merge (see §F gate).


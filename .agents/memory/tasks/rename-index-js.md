# Task record — rename-index-js

**Branch:** `master` (task branches merged in order)
**Goal:** Rename `src/index.md` → `src/index.js` per PROMPT.md; remove duplicate instruction files in `cli/.agents/`.
**Objective:** `src/index.js` exists with the agents usage content; `src/index.md` gone; three `.agents/` duplicates removed; committed on stacked branches; merged into master; REPORT.md generated.
**Version:** `1.2.1` (patch — rename + cleanup, no behavior change)

| # | Title | Branch | Files / areas | PR |
|---|-------|--------|---------------|----|
| 1 | Task record + plan | `plan/rename-index-js` | `.agents/memory/tasks/`, `.agents/plans/` | — |
| 2 | Rename index + delete duplicates | `feat/rename-index-js` | `src/`, `.agents/` | — |
| 3 | Release 1.2.1 | `release/1.2.1` | `wiki/logs/1/2/1/`, task record | — |

## Task 1 — plan/rename-index-js

- Created `.agents/memory/tasks/rename-index-js.md` (this record) with the plan.
- Created `.agents/plans/` working plan files: `tasks.md`, `scope.md`, `git-workflow.md`, `verification.md`, `README.md`.
- `.gitignore` already excludes `.agents/plans/`.

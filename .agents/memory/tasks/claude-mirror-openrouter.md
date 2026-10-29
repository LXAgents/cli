# Task record — claude-mirror-openrouter

**Branch:** `plan/claude-mirror-openrouter`
**Goal:** Recreate a Claude CLI mirror for personal use, routing natively through OpenRouter.
**Objective:** A runnable `claude-mirror` CLI that sends a message to an OpenRouter model and streams the text response to the terminal; default model overridable via `--model`; API key read from env/config.

| # | Title | Scope | Branch | Files / areas | PR |
|---|-------|-------|--------|---------------|----|
| 1 | Task record + agents instructions | Create the task record and copy the three `.agents/*.md` instruction files into the repo | `plan/claude-mirror-openrouter` | `.agents/memory/tasks/`, `.agents/` | |
| 2 | Scaffold CLI project | `package.json`, `tsconfig.json`, `.gitignore`, entry script | `feat/scaffold` | root | |
| 3 | OpenRouter API client | Chat/completions request + streaming response, env-based API key | `feat/openrouter-client` | `src/openrouter.ts` | |
| 4 | CLI entry point | Arg parsing (`--model`, `--system`), stdin/args input, stream output | `feat/cli` | `src/index.ts`, `bin/` | |
| 5 | Verify run | Build and run end-to-end against OpenRouter | `fix/cli-run` | `src/` | |
## Task 7 — refactor/single-responsibility

- Split `src/openrouter.js` into single-responsibility modules:
  - `src/config.js` — env + defaults
  - `src/client/openrouter.js` — HTTP POST /chat/completions streaming
  - `src/client/stream-parser.js` — SSE chunk → text delta parsing
  - `src/output/terminal.js` — stdout/stderr writing
  - `src/args.js` — CLI argument parsing
  - `src/io.js` — message resolution from args/stdin
  - `bin/claude-mirror.js` — module composition only (thin entry point)
- Removed monolithic `src/openrouter.js`
- Added `.agents/rules/no-spaghetti.md`, `.agents/rules/folder-layout.md`, `.agents/rules/single-responsibility.md`
- Verified: all modules pass `node --check`; `--help`, no-args, missing-key paths still correct.
- Live end-to-end test could not be re-run here (credential leakage blocks embedding the API key); the user can run `echo "Say hi" | node bin/claude-mirror.js` with `OPENROUTER_API_KEY` set.
| 7 | Refactor to single-responsibility | Split monolithic src/openrouter.js into modules under src/{client,output}/, add args.js/io.js/config.js, thin bin/ entry point, add .agents/rules/*.md | `refactor/single-responsibility` | `src/`, `bin/`, `.agents/rules/` | |

## Task 5 — fix/cli-run

- Syntax-checked `bin/claude-mirror.js` and `src/openrouter.js` with `node --check` (both OK).
- Verified `--help` (rc 0), no-args (usage, rc 1), and missing-key (clear error, rc 1) locally — no network or API key required.
- Live end-to-end run against OpenRouter complete (user ran in their shell):
    echo "Say hi" | node bin/claude-mirror.js
    Hi there! How can I assist you today?
  Streaming works end-to-end through src/openrouter.js → bin/claude-mirror.js.
## Task 6 — release/1.0.0

- Created `wiki/logs/1/0/0/README.md` — version claim, changelog (Overview/Added/Modified/Deleted/Summary).
- Filled the PR column: no pull requests were opened (not pushed to a forge); marked `—`.
- Live end-to-end verified against OpenRouter on this branch's ancestors.
- Record closed out — release task done.
| 6 | Release | Version, changelog, index rows, close out record | `release/1.0.0` | `wiki/logs/1/0/0/` | — (no PRs opened; not pushed) |

## Task 1 — plan/claude-mirror-openrouter

- Created `.agents/memory/tasks/claude-mirror-openrouter.md` (this record) with the plan.
- Copied `.agents/branching-strategy.md`, `.agents/commit-conventions.md`, `.agents/plan-creator.md` into the repo from the workspace `.agents/`.
- No `.gitignore` exists; `git check-ignore .agents/plans/tasks.md` prints nothing — the plans folder is not yet excluded. Reported as a finding; not added by me (plan-creator: the rule belongs to the repo owner).
- Next task: scaffold the CLI project on `feat/scaffold`.

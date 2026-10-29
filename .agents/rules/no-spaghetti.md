---
name: no-spaghetti
description: Anti-spaghetti rule — code must be split into single-responsibility files under separate folders; no module may mix concerns.
---

# No Spaghetti Code

## Rule

Every module must have exactly one responsibility, and modules that serve
different concerns must live in separate folders. A file must not mix:
- CLI argument parsing with network calls,
- network calls with terminal output,
- config resolution with business logic,
- SSE parsing with HTTP requests.

## What counts as spaghetti

- A single file that parses argv, makes an HTTP request, and writes to stdout.
- A client class that both fetches from OpenRouter and renders to the terminal.
- Config values hard-coded inside network or CLI code.

## Enforcement

If a new feature touches an existing concern, add it to the module that owns
that concern — do not append it to an unrelated file. If no module owns the
concern, create a new single-responsibility file under the matching folder.

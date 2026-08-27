---
name: diagnose-logs
description: Runs a structured diagnosis workflow when the user provides logs that contain an error or unexpected behavior. States one or more hypotheses for the failure, investigates relevant files (schema, config, source), plans and implements a fix for the primary hypothesis, and verifies the fix. Use when the user shares terminal output with an error, pastes failed command output, provides application/server logs, shares build or CI output, or asks to diagnose any log-based failure.
---

# Diagnose Logs

When the user provides logs that show a failure or unexpected behavior — terminal output, application logs, build output, server logs, CI pipeline output, browser console errors, or any other log-like text — run this process.

## Workflow

1. **Hypothesize**  
   From the log content, state one or more plausible causes (e.g. type mismatch, missing env, wrong path, schema/code drift, dependency version conflict, misconfigured service).

2. **Investigate**  
   Read the files that are most likely involved: migrations, config, seed data, source that the failing component uses. Use whatever location hints the logs provide (file paths, line numbers, component names, module names, HTTP status codes) to decide what to open.

3. **Plan fix for hypothesis #1**  
   Describe the change you will make to address the primary hypothesis (e.g. "Cast enum in seed", "Add env var to example", "Fix import path in config").

4. **Implement**  
   Apply the fix. Prefer minimal, targeted edits.

5. **Verify**  
   Re-run the failing command, test, or process and confirm the error is resolved. If the original trigger is unavailable (e.g. CI logs from a remote pipeline, or a one-off server error), explain what to check instead and why the fix should resolve it.

   If the error is not resolved, return to step 1 with any new information from the verification.

## Tips

- Quote the exact error line when hypothesizing (e.g. `column "x" is of type foo but expression is of type bar`).
- For "not found" or path errors, check cwd and any config that sets paths.
- For HTTP errors in server logs, cross-reference the route handler, middleware, and upstream service config.
- For build/CI failures, check dependency versions, environment variables, and build scripts.
- If verification isn't possible (remote logs, production errors), state your confidence level and what the user should watch for after deploying the fix.
- If verification times out (e.g. `db reset`), use context clues from the existing output to determine if the error might persist or if it has been resolved and the timeout is expected.

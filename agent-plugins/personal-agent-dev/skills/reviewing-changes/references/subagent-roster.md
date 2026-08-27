# Subagent roster

Spawn **at least five** readonly subagents per iteration. Instruct each: **review only, make no changes.**

## Required specialists

| Role | Focus |
|------|--------|
| **Security** | IDOR, auth bypass, injection, secrets exposure, unsafe deserialization, missing authorization on caller-supplied identifiers |
| **Architecture** | Structure of the diff and how it fits the existing project — coupling, layering, naming consistency, scope creep |

## Recommended general reviewers

Pick at least three from this list (adjust to the change):

| Role | Focus |
|------|--------|
| **Correctness** | Logic bugs, edge cases, off-by-one, null/empty handling, race conditions |
| **Tests** | Missing coverage for new behavior, brittle assertions, tests that don't exercise the failure path |
| **Contracts** | API shape, DTO mismatches, breaking changes, error response consistency |
| **Integration** | External service calls, config, migrations, backwards compatibility |
| **UX / data** | User-visible regressions, date/time handling, duplicate or stale UI state |
| **Dead code & cleanup** | Unused or unreachable code, redundancy, and refactor debt introduced or surfaced by the change — see profile below |

## Dead code & cleanup profile

Use when the diff adds, removes, renames, or materially edits behavior. Instruct this reviewer to **search the codebase**, not just read the diff.

### Dead code & orphans

| Signal | What to look for |
|--------|------------------|
| **Orphaned by the diff** | Callers, imports, exports, routes, config keys, or tests that still reference removed or renamed symbols |
| **Unused additions** | New functions, types, components, constants, or DI registrations with no callers in the repo |
| **Stale branches** | Feature flags, env vars, or conditionals that can no longer be true after the change |
| **Duplicate leftovers** | Old implementation kept alongside the new one when the diff replaced a code path |
| **Commented / dead blocks** | Large commented-out sections or `#if false` / unreachable code introduced or left in touched files |
| **Test drift** | Tests exercising deleted behavior, unused fixtures/mocks, or snapshots for removed UI |

### Redundancy & refactor debt

| Signal | What to look for |
|--------|------------------|
| **Near-duplicate logic** | Copy-pasted or parallel code paths in touched files — same validation, mapping, error handling, or UI state repeated with small variations |
| **Bloated touched files** | Files the diff edits that are now unusually long, accumulate unrelated concerns, or grew substantially in this change without extraction |
| **Overgrown units** | Functions, components, or methods added or expanded in the diff that exceed what the surrounding codebase typically keeps inline (deep nesting, many branches, mixed abstraction levels) |
| **Redundant abstractions** | Thin wrappers, duplicate helpers, or parallel types that do the same job as something already in the touched area |
| **Missed consolidation** | The diff adds a third/fourth variant of an existing pattern instead of extending the shared one (e.g. another one-off API client helper, another bespoke form validator) |
| **Deletable complexity** | Indirection, parameters, or layers the diff introduced that nothing else needs yet |

**Method:**

1. Start from symbols **removed, renamed, or replaced** in the diff; grep the repo for remaining references.
2. For symbols **added** in the diff, confirm at least one non-test caller (or document why export-only is intentional).
3. In **files the diff touches**, scan for duplicate blocks, parallel implementations, and units that grew large because of this change.
4. Compare touched code against **nearby conventions** in the same module — flag when the diff invents a one-off instead of reusing an existing helper, hook, or service pattern.
5. Prefer findings in files the diff touched or problems the diff directly created or worsened.
6. Separate **introduced or worsened by this change** from **pre-existing** debt elsewhere in the repo.

**Do not** flag style-only preferences, rename bikesheds, or repo-wide refactors unrelated to the diff. Every finding should tie to a concrete symbol, file, or duplication the reviewer can point at.

**Return format** (in addition to the standard severity buckets):

- **Remove now** — safe to delete or consolidate in this change; low blast radius; no remaining references.
- **Refactor now** — duplication or bloat **introduced by this diff** in a file already being edited; a focused extract/consolidate would clearly improve the change without expanding scope much.
- **Follow-up** — valid dead code, duplication, or bloat, but cleanup exceeds this PR's scope — note file/symbol and a one-line suggested direction only.
- **False positive** — symbol looks unused or redundant but is referenced dynamically (reflection, routing tables, code gen, widget registry, etc.) — explain why.

## Spawn prompt skeleton

```text
Review ONLY — do not edit files.

Scope: [brief summary of what changed]
Focus: [role from table above; for Dead code & cleanup, include "search the repo for orphans, duplication, and bloat in touched files"]

Return:
- Critical (must fix before ship)
- Important (should fix in this change)
- Minor (optional / out of scope)
- No issues found

For each finding: file/location, what's wrong, why it matters, suggested fix (describe only).
```

## Anti-patterns

- Fewer than five reviewers — misses blind spots the loop is designed to catch.
- Subagents that fix issues — causes duplicate/conflicting edits across agents.
- All reviewers with the same focus — repetition without breadth.

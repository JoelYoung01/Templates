# Triage heuristics

The coordinating agent alone decides what to fix. Subagent output is input, not a todo list.

## Priority signals

1. **Frequency** — the same issue in multiple reviews is more likely real.
2. **Severity** — security and data-loss findings default high until disproved.
3. **Scope fit** — in-scope for this change beats "nice refactor while we're here."

## Disprove before fixing

For each finding, briefly attempt to refute it:

- Is the code path actually reachable?
- Does existing auth/validation already cover it?
- Is the reviewer applying a pattern this project deliberately avoids?
- Is it pre-existing, unrelated to the diff?

If disproved, skip with a one-line reason.

## Fix vs skip

| Fix | Skip |
|-----|------|
| Confirmed bug or security hole in the diff | Pre-existing issue outside change scope (note in report) |
| Missing test for new behavior | Style preference with no project convention |
| Breaks stated acceptance criteria | Refactor that doesn't reduce risk in this PR |
| Multiple reviewers agree on importance | Single reviewer, low severity, disproved on inspection |
| Dead code newly orphaned by the diff (unused import, stale test, duplicate impl in touched file) | Pre-existing dead code outside the diff's scope |
| Removing dead code is a one-line delete with no behavioral risk | Dead code removal requires wide refactor or unclear dynamic references |
| Focused refactor in a touched file that removes duplication **introduced by this diff** | Pre-existing bloat or duplication in untouched files |
| Consolidating parallel logic the diff just added (extract helper, reuse existing pattern) | Repo-wide refactor, renames, or "while we're here" cleanups unrelated to the change |

## Dead code & cleanup triage

- **Fix in this change:** symbols the diff made unreachable; unused additions in the same PR; stale tests for deleted behavior; duplicate old implementation in a file the diff already edits; near-duplicate blocks the diff introduced that can be merged with a small, local extract or by reusing an existing helper already in the module.
- **Fix when cheap in touched files:** a function or component the diff expanded that is clearly overgrown and can be split or simplified without leaving the files already being edited.
- **Skip (note in report as follow-up):** unused code elsewhere in the repo the diff didn't touch; pre-existing bloated files the diff only minorly touched; symbols used only via reflection, registries, or framework conventions the reviewer missed; refactors with non-trivial blast radius or unclear behavioral risk.
- **Disprove:** grep for string references, route/config registration, DI wiring, and test-only usage before treating an export as dead; confirm duplicated logic is actually parallel (not intentionally separate) before suggesting consolidation.

## Parallelizing fixes

Group independent fixes into chunks; one subagent per chunk preserves context. Do not parallelize fixes that touch the same files unless dependencies are explicit.

## Convergence signals (nitpick drift)

Stop looping when reviewers:

- Suggest contradictory fixes for the same spot.
- Flag issues already fixed in the prior iteration.
- Shift to naming bikesheds or hypothetical futures with no current failure mode.

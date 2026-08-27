---
name: reviewing-changes
description: >
  Load when the user has finished implementing changes and wants a rigorous pre-ship
  review — bugs, security gaps, architecture missteps, dead code, redundancy, and fit with
  existing project patterns. Also load when explicitly asked to review changes
  before merge or ship.
---

# Reviewing changes

**Type:** Management (iterative feedback). **Constraint:** Subagents review only; the coordinating agent alone triages and applies fixes.

## When to load vs skip

**Load** when implementation is done (or the user asks for review before merge/ship).

**Skip** for mid-implementation brainstorming, preference debates with no code yet, or trivial one-line fixes with no review value.

## Workflow

```text
- [ ] Spawn review subagents (≥5, readonly — see roster)
- [ ] Aggregate findings; triage per heuristics
- [ ] Implement worthwhile fixes (parallelize independent chunks)
- [ ] Repeat until convergence criteria met
- [ ] Run project validation (tests, lint, build)
- [ ] Emit final report
```

## Iteration loop

1. **Spawn** ≥5 readonly subagents per [subagent roster](references/subagent-roster.md). Each reviews the current diff — **no edits**.
2. **Aggregate** all findings. Issues flagged by multiple reviewers rank higher.
3. **Triage** per [triage heuristics](references/triage-heuristics.md): attempt to disprove each finding; weigh against change scope and project context.
4. **Fix** triaged items. Use one subagent per independent fix chunk when context is tight.
5. **Loop** until convergence (below).

## Convergence — stop when

- Suggested changes are out of scope, negligible, or contradictory noise.
- Reviewers disagree on fixes and have shifted to unhelpful nitpicks.

## Validation

After the loop, run whatever automated checks the project provides — do not skip because review passed. See [validation pitfalls](references/validation-pitfalls.md) for environment-specific build/ADO failures.

## Final output

Use [report template](references/report-template.md).

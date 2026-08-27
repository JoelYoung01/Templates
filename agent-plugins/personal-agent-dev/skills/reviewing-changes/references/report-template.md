# Report template

Emit this after validation passes (or note validation failures).

## Structure

```markdown
## Review summary

[1–2 sentences: what was reviewed, how many iterations]

## Fixed

- **[severity]** [file/area]: [what was wrong] → [what changed]

## Skipped

- **[finding]** — [why skipped: disproved / out of scope / negligible / pre-existing]

## Validation

- [command]: [pass | fail — details if fail]
```

## Example (good)

```markdown
## Review summary

Reviewed auth middleware changes across 2 iterations (5 subagents each).

## Fixed

- **Critical** `AuthController.cs`: endpoint accepted userId from body without verifying caller owns resource → added GetAuthorizedCompanyAsync check
- **Important** `auth-middleware.test.ts`: no test for expired token edge case → added test
- **Important** `billing-utils.ts`: old `formatLegacyTotal` left after refactor → removed unused export and stale import in caller
- **Important** `chat-api.ts`: duplicate error-mapping blocks for stream and poll endpoints → extracted shared `mapChatApiError`

## Skipped

- **Rename `HandleRequest` to `ProcessRequest`** — naming preference; no project convention; out of scope
- **Extract helper for token parsing** — valid refactor but pre-existing duplication; file only lightly touched; deferred
- **Missing rate limit on logout** — pre-existing; not introduced by this diff
- **Unused helper in `LegacyBillingService.cs`** — pre-existing dead code; file untouched by this diff
- **`ChatService.cs` (~800 lines)** — file grew substantially in this PR; follow-up to split streaming vs persistence — out of scope for this bugfix

## Validation

- `dotnet test Portal.Server.UnitTests`: pass
- `pnpm lint`: pass
```

## Example (noise — do not emulate)

```markdown
## Fixed

- Renamed variable `data` to `responseData` in 3 files
- Added comment explaining obvious null check
- Reordered imports alphabetically
```

These are nitpick-drift fixes — should appear under **Skipped** or never be implemented.

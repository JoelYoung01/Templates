# Validation pitfalls

Common environment/tooling failures during the review validation step — not code bugs.

## .NET build/test

- Use `dotnet` from `PATH`; fall back to `~/.dotnet/dotnet` only if that file exists.
- Do **not** use `dotnet build -q` — failures surface as opaque "Question build FAILED".
- On `MSB3492` (could not read `AssemblyInfoInputs.cache`) or `CoreGenerateAssemblyInfo` errors:
  ```bash
  dotnet clean Portal.Models/Portal.Models.csproj
  # or: rm -f Portal.Models/obj/Debug/net9.0/*.cache
  dotnet build MA.Portal.sln
  ```
- If `dotnet test --no-build` passes but build fails, rebuild the test project first — do not report tests as failed due to a stale build.

## Frontend

- `pnpm lint` and targeted `vitest run <files>` are usually sufficient; full suite is optional unless the diff is broad.

## Azure DevOps CLI (when validation includes ADO checks)

See MA.Portal skill `managing-ma-portal-board-work` → `references/cli-and-rest.md`: always pass explicit `--organization "https://dev.azure.com/markarch"` and `-p "MA.Portal"`; prefer `-o tsv` over parsing `work-item show -o json`.

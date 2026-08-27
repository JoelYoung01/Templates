---
name: clean-work-tree
description: Analyze all uncommitted changes in the git working tree (staged, unstaged, and untracked files), organize them into logical commits, and create those commits without asking for approval. Use when the working tree has accumulated many uncommitted changes, the user wants to clean up their work tree, organize changes into commits, or asks to tidy up uncommitted work.
---

# Clean Work Tree

Organize a messy git working tree into clean, logical commits.

## Workflow

### Phase 1: Gather Changes

Run all of these in parallel:

1. `git status --porcelain` — full list of changed/untracked files
2. `git diff` — unstaged changes in tracked files
3. `git diff --cached` — already-staged changes
4. `git diff HEAD` — combined view of all changes vs HEAD
5. `git log --oneline -10` — recent commit style reference
6. `git branch --show-current` — current branch name

For untracked files, read each one to understand its contents.

### Phase 2: Analyze and Group

Examine every change and group them into logical commits by **concern**, not by file type. Common groupings:

- **Feature work**: new functionality, its tests, and directly related config
- **Bug fixes**: corrections and their related test updates
- **Refactoring**: renames, restructuring, code cleanup (no behavior change)
- **Configuration**: build config, dependency changes, env files
- **Documentation**: docs, comments, READMEs
- **Style/formatting**: whitespace, linting fixes, import ordering

**Grouping rules:**
- A file may only appear in ONE commit.
- If a file contains changes spanning multiple concerns, prefer the dominant concern.
- Keep related changes together (e.g., a new component + its CSS module + its test = one commit).
- Order commits so that dependencies come first (e.g., shared library changes before consumers).
- If there are staged changes, respect the user's intent — keep them grouped unless they clearly belong to separate concerns.

### Phase 3: Present the Plan and Execute

Present the commit plan as a numbered list, then proceed immediately to Phase 4 without asking for approval. For each proposed commit, show:

```
## Proposed Commit Plan

### Commit 1: <type>(<scope>): <short description>
Files:
- path/to/file1.ts (modified)
- path/to/file2.ts (new)
Summary: <one sentence explaining what this commit does>

### Commit 2: <type>(<scope>): <short description>
Files:
- path/to/file3.ts (modified)
- path/to/file4.css (modified)
Summary: <one sentence explaining what this commit does>

...
```

Do not use AskQuestion or pause for confirmation — execute the plan right after presenting it.

### Phase 4: Execute Commits

Execute commits **sequentially**. For each commit:

1. `git reset HEAD` — unstage everything (clean slate for selective staging)
2. `git add <file1> <file2> ...` — stage only files for this commit
3. Commit using a HEREDOC message:

```bash
git commit -m "$(cat <<'EOF'
<type>(<scope>): <short description>

<body — what and why, not how>
EOF
)"
```

4. Verify with `git status` after each commit.

**Important:**
- Never use `git add .` or `git add -A` — always add specific files.
- Only run `git reset HEAD` once before the first commit, not before each one.
- After the final commit, run `git status` and `git log --oneline -<N>` (where N = number of new commits + 3) to confirm everything is clean.

### Phase 5: Summary

After all commits, show a final summary:

```
## Done! Created N commits:

1. abc1234 - feat(auth): add login form
2. def5678 - fix(api): handle timeout errors
3. ghi9012 - docs: update README

Working tree is clean.
```

## Commit Message Style

Follow [Conventional Commits](https://www.conventionalcommits.org/) unless the repo uses a different style (check `git log` output from Phase 1).

Types: `feat`, `fix`, `refactor`, `docs`, `style`, `test`, `chore`, `build`, `ci`, `perf`

## Edge Cases

- **Merge conflicts in staged area**: Warn the user and skip those files.
- **Binary files**: Include in commits but note them; don't try to diff.
- **Very large change sets (30+ files)**: Consider splitting Phase 2 analysis across multiple passes. Use the Task tool with `subagent_type="explore"` to parallelize file reading if needed.
- **Empty working tree**: Tell the user there's nothing to commit and stop.
- **Only one logical group**: Present the plan and commit immediately.

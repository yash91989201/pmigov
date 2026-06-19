---
description: Session initialization for pmigov — loads project context, checks environment health, shows git status, and sets up the work session.
---

Initialize a new development session for pmigov.

## Step 1 — Load Context

Read:
- `README.md` (project overview)
- `CLAUDE.md` (if exists — project-specific Claude instructions)
- `.claude/skills/project-context/SKILL.md` (stack reference)

## Step 2 — Environment Health Check

Run these checks and report status:

1. **Docker / DB**: Is `pmigov-postgres` running?
   - `docker ps --filter name=pmigov-postgres --format "{{.Status}}"`
   - If not running: `⚠️ DB is down — run: bun run db:start`

2. **Env file**: Does `apps/web/.env` exist with required vars?
   - Check for: `DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `CORS_ORIGIN`
   - If missing: `⚠️ Missing env vars — check apps/web/.env`

3. **Dependencies**: Are node_modules present?
   - `ls node_modules/.package-lock.json 2>/dev/null || echo missing`
   - If missing: `⚠️ Run: bun install`

## Step 3 — Git Status

```bash
git status --short
git log --oneline -10
```

Print:
- Current branch
- Uncommitted/untracked files
- Last 10 commits (what changed recently)

## Step 4 — SESSION BRIEFING

Print a clean briefing:

```
══════════════════════════════════════
  PMIGOV — SESSION START
══════════════════════════════════════
Branch:      <branch>
DB:          ✅ Running / ⚠️ Down
Env:         ✅ OK / ⚠️ Missing vars
Uncommitted: <count> files
Last commit: <hash> <message>
══════════════════════════════════════
```

## Step 5 — Task Discovery

Ask: **"What are we working on today?"**

Once the user describes the task:
1. Read the relevant files (route, procedure, schema — whatever is affected)
2. Build a concrete implementation plan with file paths and steps
3. Confirm: **"Does this plan look right?"**
4. Execute using the appropriate skill:
   - New API endpoint → `/new-procedure`
   - New page/route → `/new-page`
   - Bug fix → `/debug`
   - DB schema change → `/migrate`

## Step 6 — Wrap Up

After execution:
1. Ask the user to test the feature
2. Remind: `bun run check` before committing
3. Remind: `bun run check-types` if types changed

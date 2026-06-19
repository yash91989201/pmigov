---
description: Structured debugging for pmigov — traces errors through the stack layers, identifies root cause, applies fix, and verifies.
---

Debug a reported error or unexpected behavior in pmigov.

**Usage**: `/debug <error message or file path>` — or run without args to be prompted.

## Step 1 — Capture the Error

If args provided: use them as the error context.
If no args: ask the user to paste the error message, stack trace, or describe the behavior.

## Step 2 — Identify the Layer

Determine which layer the error originates from:

| Symptom | Layer |
|---------|-------|
| `ORPCError`, `UNAUTHORIZED`, `NOT_FOUND` | oRPC procedure in `packages/api/src/routers/` |
| Auth error, session undefined | `authMiddleware`, `/_auth/route.tsx`, `packages/auth` |
| Drizzle error, SQL error, constraint violation | `packages/db/src/`, specific procedure |
| Hydration mismatch, `window is not defined` | SSR/client divergence in `apps/web` |
| `ZodError`, validation failed | `.input()` schema in the procedure |
| Env error, `DATABASE_URL is not defined` | `packages/env/src/server.ts`, `apps/web/.env` |
| Type error (TS compile) | Type mismatch — run `bun run check-types` |

## Step 3 — Trace the Call Stack

For the identified layer, read the relevant files and trace:

```
Route/Component → Server Fn / Loader → oRPC Procedure → Drizzle Query → DB
```

Read each file in the path. Find the exact line where the error occurs or the assumption breaks.

## Step 4 — Check Git History

```bash
git log --oneline --all -20
```

Look for recent changes to the affected files:
```bash
git log --oneline -5 -- <affected-file>
```

## Step 5 — State Root Cause

Write: **"Root cause: `<file>:<line>` — `<what the code does vs what it should do>`"**

## Step 6 — Apply Fix

Apply the minimal fix. Prefer:
- Fixing the actual broken code over adding workarounds
- Fixing the root cause over patching the symptom

## Step 7 — Verify

```bash
bun run check-types
bun run check
```

If the error was runtime: describe how to reproduce the fix confirmation.

## Step 8 — Suggest Regression Test

If applicable, suggest what test would prevent this regression.

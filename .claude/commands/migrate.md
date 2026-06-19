---
description: Guided Drizzle migration for pmigov — reviews schema changes, checks for breaking changes, generates SQL, gets confirmation, then runs the migration.
---

Safely run a Drizzle schema migration for pmigov.

## Step 1 — Read Current Schema

Read all files in `packages/db/src/schema/` to understand the current state.

## Step 2 — Schema Review

Run the **schema-reviewer** agent on the proposed changes before proceeding.

If schema-reviewer finds CRITICAL issues, stop and report them. Do not proceed until resolved.

## Step 3 — Breaking Change Analysis

Check for:

| Change | Risk | Action |
|--------|------|--------|
| Adding new table | ✅ Safe | Proceed |
| Adding nullable column | ✅ Safe | Proceed |
| Adding column with default | ✅ Safe | Proceed |
| Adding index | ✅ Safe | Proceed |
| Removing a column | ⚠️ BREAKING | Confirm no code reads it; deprecate first |
| Changing column type | ⚠️ BREAKING | Requires data migration plan |
| Adding NOT NULL without default | ⚠️ BREAKING | Needs default OR two-step migration |
| Renaming a column | ⚠️ BREAKING | Requires code update + migration |

If breaking changes detected: explain the risk and ask for explicit confirmation before continuing.

## Step 4 — Generate Migration

```bash
bun run db:generate
```

Show the generated SQL from `packages/db/src/migrations/`. Ask the user to review it.

**"Does this SQL look correct? Proceed with applying?"**

## Step 5 — Apply Migration

```bash
bun run db:migrate
```

## Step 6 — Verify

```bash
bun run check-types
```

Confirm TypeScript still compiles with the new schema types.

## Step 7 — Commit Reminder

Remind to commit migration files:
```
packages/db/src/migrations/<timestamp>_<name>.sql
packages/db/src/migrations/meta/
```

## Safety Rules

- **Never** use `bun run db:push` in production — use `db:migrate` only
- **Never** edit migration files after they've been committed to git
- **Never** delete migration files — they are the history of your schema
- Docker deployments: run `bun run db:migrate` inside the container after deploy

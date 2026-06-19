---
description: Drizzle query safety scanner — detects unbounded queries, missing ownership filters, bare deletes/updates, N+1 patterns, and injection risks across the codebase.
---

Scan the entire codebase for Drizzle query safety issues.

## Scan 1 — packages/api/src/ and apps/web/src/functions/

Search for and report:

### 🔴 CRITICAL
- `sql.raw()` with any variable interpolation: `sql.raw(\`...\${var}\`)` — injection risk
- `.delete()` without a `.where()` clause — bare delete
- `.update()` without a `.where()` clause — bare update

### 🟠 HIGH
- `findMany()` / `.select()` without `.limit()` — unbounded query
- Queries on user-owned tables without `userId` / ownership filter — data leakage
- Multi-step mutations (2+ `insert`/`update`/`delete` calls) not wrapped in `db.transaction()` — inconsistency risk
- N+1 pattern: `findMany()` result iterated with per-item DB call in loop/map

### 🟡 MEDIUM
- `db.query.*` without `with:` for related data (potential for multiple queries when one would do)
- Full row fetch (`select()` with no column spec) on tables with 10+ columns

## Scan 2 — packages/db/src/schema/

### 🟠 HIGH
- FK columns without a corresponding `index()` definition

### 🟡 MEDIUM
- Tables without `relations()` definition for their FK columns
- Tables missing `createdAt` or `updatedAt`

## Output

For each finding:
```
[SEVERITY] filename:line
  Issue: <description>
  Fix:   <one-line fix>
```

Then offer:
**"Auto-fix safe patterns? (add default .limit(100), flag transactions for review)"**

Note: bare deletes/updates and ownership filters require manual review — do not auto-fix.

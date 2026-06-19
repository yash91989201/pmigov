---
description: Tech debt scanner for pmigov — scans the full monorepo for console.log, any types, raw fetch, useEffect data fetching, hardcoded values, and other anti-patterns.
---

Scan the full pmigov monorepo for tech debt. Report each finding with `file:line` and severity.

## 🔴 Critical Debt

- `console.log` / `console.error` (non-debug) in `packages/api/`, `packages/auth/`, `packages/db/`
- `any` types without a justification comment (`// reason: ...`)
- `@ts-ignore` or `@ts-expect-error` without an explanation comment
- `FIXME` / `HACK` comments in committed code
- Hardcoded secrets or tokens (API keys, passwords, connection strings)

## 🟠 High Debt

- Raw `fetch()` in `apps/web/src/components/` or route files — should use oRPC client
- `useEffect` for data fetching — should use TanStack Query
- `auth.api.getSession()` called outside `packages/auth/` or `apps/web/src/middleware/`
- `drizzle()` called directly outside `packages/db/src/`
- `userId` read from request body/params instead of `context.session.user.id`
- Missing `.input()` on oRPC procedures that mutate data

## 🟡 Medium Debt

- React components over 200 lines (split candidates)
- Duplicate logic between two+ components (extract to shared hook/util)
- Missing error handling in async server functions (no try/catch around external calls)
- Missing `type="button"` on non-submit buttons
- Missing `alt` on images
- Hardcoded `localhost` URLs that should come from env
- `TODO` comments that have a clear resolution

## 🟢 Low Debt

- Magic numbers without a named constant
- Inconsistent naming in same file (camelCase vs snake_case)
- Dead code (unused exports, commented-out blocks)
- Missing JSDoc on exported functions in `packages/*` public APIs
- `console.log` left in `apps/web/src/` client code

---

## Report Format

```
[SEVERITY] file:line
  Issue: <what the debt is>
  Fix:   <how to resolve it>
```

After full scan, print:

```
══ TECH DEBT SUMMARY ══════════════════
Critical:  N
High:      N  
Medium:    N
Low:       N
Total:     N
═══════════════════════════════════════

Top 5 priority fixes (by severity + effort):
1. ...
```

Offer: **"Auto-fix safe patterns? (console.log removal, add missing type attributes)"**

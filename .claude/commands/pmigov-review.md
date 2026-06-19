---
description: Full production code review for pmigov — runs all 8 reviewers in parallel, synthesizes findings, generates an execution plan, and applies fixes in severity order.
---

Run a comprehensive multi-layer production review of the current changes.

## Layer 1 — Parallel Review (all 8 agents simultaneously)

Launch these agents in parallel, each reviewing the current `git diff HEAD` or specified files:

1. **pmigov-reviewer** — architecture guardian (overall conventions)
2. **api-procedure-reviewer** — oRPC procedure patterns
3. **auth-reviewer** — Better Auth + session handling
4. **db-reviewer** — Drizzle ORM query safety
5. **frontend-reviewer** — TanStack Router/Query/Form patterns
6. **performance-reviewer** — SSR performance + caching
7. **security-reviewer** — auth guards + injection prevention
8. **schema-reviewer** — Drizzle schema conventions

## Layer 2 — Synthesize

Collect all findings. Deduplicate (same file:line reported by multiple agents = one finding, union severity). Group by severity:

- 🔴 **CRITICAL** — blocks production: security holes, auth bypass, data loss risk, injection
- 🟠 **HIGH** — significant bugs: missing auth guard, N+1, unvalidated input
- 🟡 **MEDIUM** — convention violations: pattern drift, missing error states
- 🟢 **LOW** — suggestions: style, naming, minor improvements

Print the Master Issue List.

## Layer 3 — Execution Plan

Generate an ordered fix list: CRITICAL → HIGH → MEDIUM → LOW.
Group fixes by file. Show estimated effort: S (<5 min) / M (5-20 min) / L (>20 min).

## Layer 4 — Review Loop

Present the plan. Ask: **"Proceed with all fixes? Fix CRITICAL + HIGH only? Or adjust the plan?"**
Accept up to 3 revision cycles before proceeding.

## Layer 5 — Execute

Apply fixes chunk by chunk:
1. All CRITICAL fixes → `bun run check` → `bun run check-types`
2. All HIGH fixes → `bun run check`
3. MEDIUM + LOW (if approved) → `bun run check`

## Layer 6 — Report

Create `docs/reviews/` if it doesn't exist. Save a markdown report:

```
docs/reviews/YYYY-MM-DD-review.md
```

Report sections:
- Summary table: agent → CRITICAL / HIGH / MEDIUM / LOW counts
- Full finding list with file:line and fix applied
- Remaining open items (if any were skipped)
- `bun run check` and `bun run check-types` exit codes

# Skill: Code Review

Invoke when the user says: "review this", "check my changes", "review the diff", "is this code ok?".

---

## Step 1 — Get the Diff

```bash
git diff HEAD
```

Or for staged only:
```bash
git diff --staged
```

If the user points to specific files, read those files directly.

---

## Step 2 — Identify Affected Layers

From the diff, determine which reviewers to run:

| Files changed | Reviewers to run |
|---------------|-----------------|
| `packages/api/src/` | api-procedure-reviewer, security-reviewer |
| `packages/db/src/schema/` | schema-reviewer, db-reviewer |
| `packages/db/src/` (non-schema) | db-reviewer |
| `packages/auth/` | auth-reviewer, security-reviewer |
| `apps/web/src/routes/_auth/` | frontend-reviewer, auth-reviewer |
| `apps/web/src/routes/` (non-auth) | frontend-reviewer |
| `apps/web/src/functions/` | auth-reviewer, db-reviewer |
| Any new feature | + security-reviewer always |
| `packages/env/` | security-reviewer |

Run only the relevant subset — not all 8 agents for a 2-line change.

---

## Step 3 — Run Reviewers

Run the identified reviewers in parallel. Each outputs PASS/FAIL per check.

---

## Step 4 — Synthesize

Deduplicate findings. Group by severity:
- 🔴 CRITICAL — blocks merge
- 🟠 HIGH — must fix before merge
- 🟡 MEDIUM — should fix soon
- 🟢 LOW — optional improvements

Print the consolidated list.

---

## Step 5 — Apply Fixes

Ask: **"Fix all? Fix CRITICAL + HIGH only? Skip?"**

Apply requested fixes. Then:

```bash
bun run check
bun run check-types
```

Both must exit 0.

---

## Step 6 — Confirm Clean

Report: **"✅ All fixes applied. check + check-types pass."**

Or: **"⚠️ N items remaining: [list]"**

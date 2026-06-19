---
description: Post-fix verification for pmigov — re-runs all 8 reviewers and cross-references against the previous review report to confirm FIXED, STILL PRESENT, REGRESSED, or NEW issues.
---

Verify that fixes from a previous `/pmigov-review` session have been applied correctly.

## Step 1 — Load Previous Report

Find the most recent review report:
```bash
ls docs/reviews/*-review.md 2>/dev/null | sort | tail -1
```

If no report found, ask the user for the path or run `/pmigov-review` first.

Read the previous report's finding list.

## Step 2 — Re-Run All 8 Reviewers (parallel)

Run the same 8 agents from `/pmigov-review` Layer 1 against the current code:
- pmigov-reviewer
- api-procedure-reviewer
- auth-reviewer
- db-reviewer
- frontend-reviewer
- performance-reviewer
- security-reviewer
- schema-reviewer

## Step 3 — Cross-Reference

Compare new findings against the previous report. Classify each:

- ✅ **FIXED** — was in previous report, no longer found
- ⚠️ **STILL PRESENT** — same `file:line` still failing (fix not applied or incomplete)
- 🔴 **REGRESSED** — was passing in previous report, now failing (introduced by a fix)
- 🆕 **NEW** — not in previous report (new code introduced a new issue)

## Step 4 — Verdict

```
══════════════════════════════════════
  VERIFICATION VERDICT
══════════════════════════════════════
FIXED:         N issues
STILL PRESENT: N issues  
REGRESSED:     N issues
NEW:           N issues
══════════════════════════════════════
```

**🟢 PRODUCTION READY** — All CRITICAL and HIGH issues fixed, zero regressions.

**🔴 NOT READY** — List remaining blockers with `file:line` and what needs to change.

## Step 5 — Save Report & Offer Fix

Save verification report to:
```
docs/reviews/YYYY-MM-DD-verify.md
```

If NOT READY: **"Fix remaining blockers now?"**

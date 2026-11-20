# Gentlewick v17 finish report

## Changes
- Shared memorial links now open a proper remembrance card with the memorial details.
- Added My Memories backup download and restore. A backup includes memorial data, photos, candle notes/history, and held candle notes.
- Added a Privacy page and navigation links.
- Added Vercel security headers.
- Added cross-tab local-storage refresh.
- Photo conversion now handles conversion failures safely.
- Added `npm run test:smoke`.

## Verification
- Smoke tests: PASS.
- Standalone strict TypeScript check of the storage module: PASS.
- TS/TSX syntax parsing (25 files): PASS.
- JSON configuration checks: PASS.
- Route registration check: PASS.
- Static asset references: PASS (8 checked, none missing).

## Not verified
- Dependency install timed out.
- Full project typecheck, production build, lint, and browser/E2E testing could not be run.
- Live site/deployment/custom domain were not changed or verified.

## What is still needed for a real launch
1. Install dependencies and run the full checks.
2. Deploy a Vercel preview and test on mobile and desktop.
3. Confirm the custom domain is correctly connected.
4. Decide whether Gentlewick should remain local-first or add cloud accounts/sync. v17 does **not** sync between devices automatically; users need backup/restore to move memories.
5. Payments, physical candle ordering, and email are not active.

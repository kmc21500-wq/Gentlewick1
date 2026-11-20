# Gentlewick v18 working finish

This release builds on v17 and adds a real opt-in cloud-backup flow in source:
- Account creation/sign-in via Supabase Auth (email/password).
- Manual upload of the complete local memorial ledger to a user's private backup row.
- Manual restore with payload validation and a confirmation prompt before replacing local data.
- Delete cloud backup and sign out actions.
- Session refresh support and an 8 MB upload limit.
- Supabase SQL migration with RLS; each user can access only their own row.
- Updated privacy page, `.env.example`, README and deployment checklist.

Checks completed in this environment:
- PASS — dependency-free smoke tests.
- PASS — TypeScript/TSX parser syntax check for source.
- PASS — package/Vercel/manifest JSON validation.

Not completed/verified:
- Full npm dependency installation timed out earlier; no full typecheck, build, lint, or browser tests.
- Cloud sync is not live until Supabase configuration, SQL migration, Auth email/redirect setup and deployment are done.
- No Vercel deployment or custom-domain DNS changes were made.
- Real Stripe checkout, payment processing, order fulfilment and email confirmation remain intentionally unimplemented. The current hold flow is not an order.

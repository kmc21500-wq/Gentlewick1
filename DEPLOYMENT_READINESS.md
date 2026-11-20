# Gentlewick — deployment readiness

## Completed in this working pass
- Existing local-first memorial, photo, candle-light, share-link, backup and restore experience retained.
- Added optional manual cloud backup account flow (Supabase email/password sign-in/sign-up, upload and restore).
- Added Supabase backup table migration with Row Level Security policies: users may only read/write/delete their own backup.
- Cloud restore validates the payload with the existing backup validator and requires confirmation before replacing local data.
- Cloud sync is opt-in and manual; local data remains the primary copy. No service-role secret is used in client code.
- Consolidated `.env.example` cloud configuration and added cloud setup instructions.

## Verified / checks
- Run `npm run test:smoke` (dependency-free smoke test).
- JSON and route/config checks were previously performed.

## Still blocked / must not be represented as finished
- npm install timed out in this environment, so full typecheck/build/lint/browser tests remain unverified.
- Supabase project must be created/configured; SQL migration must be applied; Auth email and redirect settings need configuration and testing.
- Vercel deployment, DNS/domain ownership, and deployed response headers were not changed or verified.
- Real candle checkout/payment is not implemented. Existing candle holds are local notes and do not place an order or charge money. A Stripe account, server-side checkout, verified webhooks, order handling, fulfilment, customer emails, refund policy and business details are needed.
- Cloud backup should be reviewed for privacy/GDPR, retention, account deletion, and operational recovery before public launch.

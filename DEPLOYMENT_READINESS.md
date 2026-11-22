# Gentlewick — deployment readiness

## Confirmed
- The GitHub repository and Vercel project exist and are connected.
- The custom domains `gentlewick.com` and `www.gentlewick.com` are verified in Vercel.
- A production-target deployment from `feature/supabase-memorials` reached READY.
- The Vercel build completed successfully for that commit.
- The Supabase Gentlewick project is active and contains the shared-lantern schema, sanctuary environments, and candle-count functionality.
- Local memorial creation and candle notes are available in browser storage.
- Cloud memorial creation is disabled by default in the launch-completion branch.
- Private content-report intake form and database storage are implemented; Supabase confirmed RLS enabled and anon SELECT/INSERT denied.
- Real candle checkout/payment is not implemented.

## Photo privacy/GDPR outstanding
- A Supabase Edge Function `gentlewick-photo-sanitise` is deployed and active. It removes metadata segments/chunks server-side before upload to the public photo bucket.
- The frontend shared-photo upload now calls that function rather than uploading the original directly.
- It does not re-encode image pixels or correct EXIF orientation; end-to-end test and stored-file inspection remain outstanding.
- Database/storage region, DPAs, subprocessors, retention, and deletion/export need verification.
- See `PHOTO_PRIVACY_GDPR_CHECKLIST.md`.

## Reporting and moderation outstanding
- Report submission has a private database record and a receipt code.
- No email receipts or decision notices are configured.
- No automated screening, rate limiting, or moderator console is implemented.
- Manual handling procedure is documented in `REPORT_HANDLING_PROCEDURE.md`; moderator access/response process still needs to be formally assigned.

## Not yet verified
- Full local smoke, typecheck, lint, and build checks against the launch-completion branch.
- Browser/device QA, accessibility, and mobile visual verification.
- Current production-domain response and alias assignment.
- Supabase security review, abuse controls, and public upload/write policies.
- Cloud creation, owner actions, and photo uploads with a server-side service-role key.
- Automatic backup/restore for local memorials (not implemented in this branch).

## Launch gates
1. Keep cloud creation disabled until the backend secret and security controls are configured.
2. Run smoke, typecheck, lint, and build.
3. Deploy and test a Preview on desktop and mobile.
4. Verify domain assignment and HTTPS.
5. Promote only the exact tested commit.
6. Keep payments disabled until seller, fulfilment, policies, Stripe, webhook verification, and email are implemented.

# Gentlewick — deployment readiness

## Confirmed
- The GitHub repository and Vercel project exist and are connected.
- The custom domains `gentlewick.com` and `www.gentlewick.com` are verified in Vercel.
- A production-target deployment from `feature/supabase-memorials` reached READY.
- The Vercel build completed successfully for that commit.
- The Supabase Gentlewick project is active and contains the shared-lantern schema, sanctuary environments, and candle-count functionality.
- Local memorial creation and candle notes are available in browser storage.
- Cloud memorial creation is disabled by default in the launch-completion branch.
- Real candle checkout/payment is not implemented.

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

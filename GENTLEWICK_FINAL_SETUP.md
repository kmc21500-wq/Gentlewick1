# Gentlewick — launch and deployment guide

Gentlewick is an independently hosted project and does not depend on Grok.

## 1. Local verification

Run:

```bash
npm ci
npm run launch:audit
npm run test:smoke
npm run typecheck
npm run lint
npm run build
```

Do not deploy if any required check fails. The existing Vercel build has succeeded, but that alone does not replace typecheck, lint, smoke, or browser QA.

## 2. Local-first experience

The core experience works without cloud memorial creation:
- Memorials, photos, candle history, and candle-hold notes are stored in the visitor's browser.
- Local memorial sharing encodes written details in the link. Photos and candle history are not uploaded.
- There is currently no automatic backup or cloud recovery for local pages.

## 3. Shared sanctuary / Supabase

Supabase is configured for reading the shared sanctuary, but **cloud memorial creation is disabled by default**. The current backend uses server-side privileged operations, so the public anon key is not enough to create shared memorials or perform owner actions.

Before enabling cloud memorial creation:
1. Review the live Supabase schema, migrations, RPC privileges, RLS policies, and public storage policies.
2. Confirm moderation and abuse-prevention controls for public blessings, candles, and uploads.
3. In Vercel Project → Settings → Environment Variables, add `SUPABASE_SERVICE_ROLE_KEY` for Production (and Preview if deliberately testing cloud creation). This must be server-only and must never have a `VITE_` prefix.
4. Set `VITE_CLOUD_MEMORIAL_CREATE_ENABLED=true` only after those checks and after testing the backend with test data.
5. Keep `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as the public client configuration.
6. Test creating, updating, sharing, lighting a candle, leaving a blessing, and removing a test lantern. Confirm the owner token is not exposed in public responses or browser-visible code.

Cloud memorials are public. Details, uploaded photos, and blessings may be viewed by anyone. Use test data for QA.

## Photo privacy / GDPR launch gate
Review `PHOTO_PRIVACY_GDPR_CHECKLIST.md`. Shared uploads currently go to Supabase Storage after browser conversion; server-side EXIF/GPS stripping is not implemented or verified. Confirm region, DPAs, retention, deletion, and subprocessors before enabling public cloud creation.

## 5. Vercel and domain

The Gentlewick Vercel project and domains are already present. Do not recreate the project or guess DNS values. Use the existing project and inspect its current domain/deployment assignment. Deploy a preview, complete QA, and only then promote the verified commit to production.

## 6. Candle sales — not enabled

The candle hold is a local note only. It does not reserve stock, create an order, send email, or charge money. Real checkout requires seller/business details, candle and stock information, shipping/tax/returns policies, Stripe test-mode setup, secure server-side checkout and webhook verification, order persistence, and fulfilment/customer email. Do not imply a sale or payment has happened.

## 7. Launch privacy

Keep the Privacy page aligned with the actual configured providers and data flows (Vercel, Google Fonts, Supabase when shared sanctuary features are enabled). Local memorials and shared cloud memorials must be described separately.

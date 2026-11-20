# Gentlewick — final launch guide

This repository is the independent Gentlewick website. It does not depend on Grok.

## 1. Local verification

```bash
npm ci
npm run launch:audit
npm run test:smoke
npm run typecheck
npm run lint
npm run build
```

If `npm ci` fails or hangs, retry on a network with access to npm's registry. Do not deploy until typecheck and build pass.

## 2. Optional cloud backup (Supabase)

Cloud backup is deliberately opt-in and manual. Local-only use works without any Supabase configuration.

1. Create a Supabase project.
2. In Project Settings → API, copy the Project URL and the anon/publishable key (never the service-role key).
3. Open SQL Editor and run `supabase/gentlewick-cloud-backup.sql`.
4. In Authentication settings, choose whether email confirmation is required. Configure the email provider and Site URL / redirect allow-list for the deployed Gentlewick domain and preview domain(s).
5. In Vercel → Project → Settings → Environment Variables, add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` for Production (and Preview if desired).
6. Redeploy. Open My Memories → create account/sign in → manually Upload; test Restore and Delete using a test account and test data.
7. Confirm that RLS is enabled and that two different accounts cannot read or delete each other's backup rows.

## 3. Vercel deployment

1. Create a Git repository and upload this project (do not include `.env`, keys, or local data files).
2. Import the repository into Vercel. Framework preset should be Vite/TanStack Start as detected; build command is `npm run build` and install command is `npm ci`.
3. Set environment variables from `.env.example` only if you have configured Supabase. No secret service-role key belongs in a `VITE_` variable.
4. Deploy a Preview first. Test every route and the flows listed in `LAUNCH_QA.md`.
5. Promote to Production only after the tests pass.

## 4. Gentlewick.com domain

In Vercel → Project → Settings → Domains, add `gentlewick.com` and `www.gentlewick.com`. Follow the exact DNS records Vercel displays at the domain registrar. Set the preferred canonical domain and redirect the other to it. Wait for Vercel to verify DNS and HTTPS. Do not guess DNS records.

## 5. Real candle sales — not enabled yet

The current candle hold is a local note only; it does not create an order, send email, reserve inventory, or charge money. Before activating payments, the owner must decide and provide:
- Legal seller/business details and contact address.
- Candle specifications, stock, fulfilment, delivery zones, shipping charges, VAT/tax treatment, returns/cancellation and safety information.
- Stripe account, product/price configuration and test-mode credentials.
- Customer order email and a secure server-side webhook endpoint.

Use Stripe test mode first. Never put a Stripe secret or webhook secret in client-side code or any `VITE_` variable. Do not claim an order was placed until the server verifies payment and persists the order.

## 6. Privacy and launch checks

- The memorial experience is local-first; shared-link details are visible to anyone with that link.
- Cloud upload is optional and user-triggered; it includes photos and memorial data.
- Keep the privacy page aligned with the providers actually configured (hosting, fonts, auth, storage, analytics, payments, email).
- Use test data during QA. Do not use real bereavement data in public previews.

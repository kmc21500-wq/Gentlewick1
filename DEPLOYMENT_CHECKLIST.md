# Gentlewick deployment checklist

Gentlewick is currently a local-first site.

## Deployment configuration
- Framework: Vite + TanStack Start + Nitro (Vercel preset)
- Install command: `npm install --no-audit --no-fund`
- Build command: `npm run build`
- No environment variables required for the local-first site.

## Before connecting gentlewick.com
Deploy to a Vercel preview URL first. Validate in a fresh browser and on a phone:
1. Home page and navigation.
2. Create a memorial (required name, species, dates/line, dedication).
3. Upload/change/remove a photograph.
4. Light a candle and add a note.
5. Shared link: open it in a fresh browser and confirm the shared remembrance renders; it contains name/species/dates/dedication only, not photos or candle history.
6. Remove a memorial and confirm it is removed from browser storage.
7. Candle product selection and hold-note prototype (confirm no payment/order/email is actually sent).
8. Reload: local data persists in the same browser.
9. Download a backup and restore it in a fresh browser. Confirm photos, memorials, and candle history are present.
10. Check Privacy page, mobile navigation, accessibility focus, and reduced motion.

## Honest status
Source-level checks and smoke tests passed, but dependencies could not be installed in this session. Full typecheck/build/lint and browser tests remain unverified. No deployment or custom-domain change has been made.

## Cloud backup (optional; before enabling)
- [ ] Create Supabase project
- [ ] Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Vercel
- [ ] Run `supabase/gentlewick-cloud-backup.sql`
- [ ] Configure Supabase email confirmation and redirect URLs for preview + production
- [ ] Test account creation, sign-in, upload, restore, sign-out, and cross-device restore
- [ ] Confirm each account cannot access another account's backup (RLS test)
- [ ] Review privacy notice and retention/deletion process

## Payments
- [ ] Stripe account/business details and product fulfilment approved
- [ ] Secure server-side Checkout endpoint and webhook signature verification
- [ ] Order database + confirmation email + fulfillment process
- [ ] Test failed/cancelled/refunded payments
- [ ] Do not enable real payment until all items are complete

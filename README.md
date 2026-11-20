# Gentlewick

Gentlewick is a quiet, local-first pet memorial website. Visitors can create memorial pages, add photographs, leave words, and light virtual candles without creating an account.

## What works
- Create pet memorials and view them on this device.
- Add/change/remove a memorial photograph (images are resized before local storage).
- Light a candle and leave a note.
- Browse memorials saved in this browser.
- Share memorial words through a generated link; the recipient sees a dedicated shared remembrance page. Photographs remain local.
- Explore the candle product mock-up and save a non-binding candle note locally.

## Important limitations
- Memorials, photos, candle history, and held candle notes are stored in the visitor's browser only.
- Clearing browser/site data, using a different browser, or changing devices can make local memories unavailable.
- Sharing a memorial creates a dedicated link that carries its name, species, dates, and dedication. The photograph and candle history are not uploaded or publicly hosted.
- The candle "hold" flow is a prototype only: no order is sent, no payment is taken, and email is not sent.
- No account or cloud sync is part of the current experience. Backup download and restore are available from My Memories.

## Keep your memories safe

Use **My Memories** to download a JSON backup that includes memorial details, photographs, candle history, and saved candle notes. Restore it on another device by selecting the backup file. Shared memorial links contain the name, species, dates, and dedication only; they do not include photographs or candle history.

## Run locally
Requires Node.js and npm:
1. `npm install`
2. `npm run dev`
3. Open the Vite address shown in the terminal.

## Checks
- `npm run typecheck`
- `npm run build`
- `npm run lint`

## Deploy to Vercel
1. Push this project to a Git repository.
2. Import the repository into Vercel.
3. Use the project defaults/configuration in `vercel.json` (install: `npm install --no-audit --no-fund`, build: `npm run build`).
4. Deploy a preview first and test the main flows on mobile and desktop.
5. Only connect the custom domain after the preview is verified.

The Vite/TanStack Start/Nitro configuration uses Nitro's Vercel preset. No environment variables are required for the local-first site.

## Launch checklist
- [ ] Install dependencies successfully.
- [ ] Typecheck and production build pass.
- [ ] Test home, create memorial, photo upload, memorial details, candle lighting, note entry, sharing, and delete flow.
- [ ] Confirm local storage behavior and browser-clear warning.
- [ ] Test mobile navigation and layout.
- [ ] Test Vercel preview.
- [ ] Review privacy notice and product/order wording before public launch.

## Optional cloud backup setup

Cloud backup is opt-in and manual (Upload / Restore). It is not enabled until a Supabase project is configured:

1. Create a Supabase project and set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Vercel and local `.env`.
2. Run `supabase/gentlewick-cloud-backup.sql` in the Supabase SQL editor.
3. Configure Auth email confirmation and redirect URLs for the production and preview domains.
4. Deploy and test account creation, sign-in, upload, restore, and sign-out.

The cloud backup contains the entire local ledger, including memorial photos and notes. Users explicitly choose when to upload or restore. The table uses Row Level Security so an authenticated user can access only their own row. Do not expose a Supabase service-role key in client variables.

**Payments remain disabled.** The current candle flow stores a local hold-note only. Real checkout requires a Stripe account, approved product/fulfilment details, a secure server endpoint, webhook verification, and a tested order/email workflow.

## Final launch preparation

See [`GENTLEWICK_FINAL_SETUP.md`](./GENTLEWICK_FINAL_SETUP.md) for Supabase, Vercel, domain and payment launch steps, and [`LAUNCH_QA.md`](./LAUNCH_QA.md) for the complete QA checklist. Run `npm run launch:audit` to check the project files before deployment.

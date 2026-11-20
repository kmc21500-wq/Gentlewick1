# Gentlewick launch QA checklist

## Home and navigation
- [ ] Home loads on desktop and mobile, with no console errors.
- [ ] Main navigation/footer links resolve and browser back works.
- [ ] About, Privacy, Create, Memorials, My Memories, Candle, Orders pages load.

## Memorial journey
- [ ] Create a memorial with all fields; validation works.
- [ ] Edit details and save; refresh and confirm persistence.
- [ ] Add a photo, rotate/crop as available, and verify it displays.
- [ ] Light a candle with and without a note; verify history and date.
- [ ] Share link opens correctly in a private/incognito window.
- [ ] Shared memorial data is correct; shared links do not expose photos or candle history.
- [ ] Remove a memorial; confirm it is removed from the local list.

## Backup / restore
- [ ] Download JSON backup; inspect only test data.
- [ ] Restore into a clean browser/device; confirm photos and history are present.
- [ ] Invalid backup is rejected without damaging current data.
- [ ] Large backup/photo error is clear and recoverable.

## Optional cloud backup (only after Supabase setup)
- [ ] Signup/sign-in and email confirmation (if enabled).
- [ ] Upload to a test account; restore to another browser.
- [ ] Delete backup; confirm local data remains.
- [ ] Account A cannot access Account B's backup (RLS test).
- [ ] Sign out and expired-session refresh work.

## Candle holds (not payment)
- [ ] Options, price and hold details are correct.
- [ ] Hold appears in local held-candles list.
- [ ] Release removes the hold.
- [ ] Text consistently says hold only; no charge or order is implied.

## Production
- [ ] Typecheck, lint, smoke tests and build pass.
- [ ] Vercel Preview tests pass.
- [ ] Production HTTPS, domain redirects and 404 route work.
- [ ] Privacy policy accurately names configured third-party providers.
- [ ] Real payments remain disabled until seller, fulfilment, tax, policy, email and Stripe webhook requirements are completed.

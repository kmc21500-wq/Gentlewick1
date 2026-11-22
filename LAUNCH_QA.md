# Gentlewick launch QA checklist

## Home and navigation
- [ ] Home loads on desktop and mobile; no console errors.
- [ ] Main navigation/footer links work; browser back works.
- [ ] About, Privacy, Create, Memorials, My Memories, Candle, Orders, and memorial detail routes load.
- [ ] Hero and sanctuary artwork match the approved cinematic, lifelike direction.

## Local memorial journey
- [ ] Create a memorial with all fields; validation works.
- [ ] Create with only a name; optional fields remain optional.
- [ ] Edit details and save; refresh and confirm persistence.
- [ ] Add/change/remove a photo; verify it displays and is resized.
- [ ] Light a candle with and without a note; verify history and date.
- [ ] Local share link opens in a private/incognito window and contains written details only.
- [ ] Local share link does not upload or reveal the photo or candle history.
- [ ] Remove a memorial; confirm it is removed from the local list.
- [ ] Remembrance card can be saved and has the correct name/details.
- [ ] Browser storage loss/device-change warning is clear; do not claim backup is available.

## Photo privacy and GDPR
- [ ] Metadata-bearing test photo is uploaded; server-side sanitizer removes EXIF/GPS/camera metadata before storage.
- [ ] Stored image inspected to confirm metadata is absent.
- [ ] Storage/database region and DPAs verified and documented.
- [ ] Subprocessor list and privacy notice match actual services.
- [ ] Owner export/deletion path verified, including photo, related records, tokens, and retention.

## Moderation and reporting
- [ ] `/report` form validation and report submission work against Supabase.
- [ ] Report rows are private: RLS enabled and anon cannot SELECT or INSERT.
- [ ] Shared memorial dialog contains a Report content link.
- [ ] Confirm report reference and success state are shown only after insert.
- [ ] Email receipts/outcome notifications are clearly disabled/not claimed.
- [ ] Manual report review procedure is followed and access is restricted.
- [ ] Rate limiting/abuse prevention is tested; honeypot behavior is reviewed.
- [ ] Sanctuary guidelines are accessible from the site.
- [ ] Report controls are present on every public memorial, photo, and message and work.
- [ ] Reports reach a moderator securely and include enough context to investigate.
- [ ] Automated screening behavior is tested; false positives and false negatives are considered.
- [ ] Human review and removal/restriction workflow is tested.
- [ ] User notices/statement of reasons are delivered where contact details exist.
- [ ] Abuse/spam rate limits and repeat-offender controls are tested.

## Shared sanctuary — only when enabled
- [ ] Cloud creation remains disabled unless the feature flag is explicitly enabled.
- [ ] If enabled, creation/photo upload and owner actions use server-only secrets.
- [ ] Shared memorial details/photo are publicly visible only with clear user disclosure.
- [ ] Public candle count and blessings work; rate-limiting/moderation/abuse controls reviewed.
- [ ] Test owner token cannot be read from public database/API responses.
- [ ] Delete test lantern and verify associated secrets/records are removed.

## Candle holds (not payment)
- [ ] Options, prices, and hold details are correct.
- [ ] Hold appears in local held-candles list.
- [ ] Release removes the hold.
- [ ] Text consistently says hold only; no order/payment/email is implied.

## Production
- [ ] Smoke tests, typecheck, lint, and build pass.
- [ ] Preview deployment is accessible and tested on mobile/desktop.
- [ ] HTTPS, canonical domain/redirect, and 404 route verified.
- [ ] Privacy policy accurately describes actual providers and data flows.
- [ ] Real payments remain disabled until business, fulfilment, tax, policy, email, Stripe, and webhook requirements are complete.

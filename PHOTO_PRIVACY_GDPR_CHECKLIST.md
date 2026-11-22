# Photo Privacy & GDPR Checklist

**Status: audit document — not all controls are implemented or verified.** This checklist is a launch gate for public/shared memorial photos and any future personal-data processing.

## Scope and data classification
- [ ] Confirm and document which memorial fields can identify a living person. Animal-only details are not ordinarily personal data, but a memorial can become personal data when linked to an identifiable owner, visitor, contributor, email/login, payment information, personal message, or location metadata.
- [ ] Inventory photo uploads, public URLs, memorial fields, owner/edit tokens, blessings, logs, analytics, and any future email/payment flows.
- [ ] Document purposes, lawful basis, retention periods, and who can access each category.
- [ ] Avoid collecting personal data that is not needed for remembrance.

## Photo metadata and privacy
- [ ] Strip EXIF, GPS/location, camera, timestamp, and other metadata **server-side before saving uploaded images**. Do not rely solely on browser resizing, image conversion, or CDN compression.
- [ ] Verify the server-side output with test photos containing GPS/EXIF metadata and confirm the stored image has no metadata.
- [ ] Do not expose original uploaded files if a sanitized version is produced.
- [ ] Check file type and actual file content, size limits, safe image decoding, and upload abuse controls.
- [x] Current local memorial photo path converts selected images through browser canvas to JPEG at reduced dimensions before local storage. This likely removes metadata in the converted output, but is not a substitute for server-side sanitization of shared uploads.
- [ ] Current shared-photo upload path sends the browser-converted file directly to Supabase Storage. Server-side metadata stripping has not been implemented or verified.

## Hosting, storage, and processors
- [ ] Confirm database and photo-storage region. Prefer EU/EEA regions where available and appropriate; record any transfers outside the EEA and applicable safeguards.
- [ ] Confirm encryption in transit (HTTPS/TLS) and at rest for database, object storage, backups, and logs.
- [ ] Review and sign/record DPAs with hosting, database/storage, email, analytics, moderation, payment, and other subprocessors before enabling those services.
- [ ] Maintain a current subprocessor list in the privacy notice.
- [ ] Review retention, backup deletion, access controls, and provider security documentation.

## Privacy notice and user controls
- [ ] Clearly distinguish local memorials (browser/device storage) from shared public sanctuary memorials (cloud database and photo storage).
- [ ] Explain which fields and photos become publicly viewable, and that anyone with the public page/link may view or share them.
- [ ] State what is processed to host memorials versus what requires opt-in (e.g., optional reminders, updates, marketing).
- [ ] Provide a clear contact and deletion path for memorial owners and contributors.
- [ ] Provide practical export and deletion controls or a documented request process; verify that deleting a memorial also handles related photos, blessings, tokens, and backups according to retention policy.
- [ ] Explain local-data limitations and the consequences of clearing browser storage or changing devices.
- [ ] Avoid claiming automatic backups, export, deletion, server-side sanitization, or opt-in features until they exist and are tested.

## Current Gentlewick implementation findings (launch-completion branch)
- Local memorial photos are processed in the browser using canvas and stored locally; metadata stripping is not independently tested.
- Shared photo upload is client-side to Supabase Storage, after browser conversion; server-side EXIF/GPS stripping is not implemented.
- Shared memorials and photos are public when that cloud feature is enabled.
- Cloud memorial creation is disabled by default in the launch-completion branch.
- Database/storage region, DPAs, retention/deletion behavior, and the complete subprocessor list still need verification.
- The Privacy page has a deletion contact path, but complete automated export/deletion controls have not been verified.
- Reminders, marketing email, and real payment/order processing are not implemented.

## Release gates
1. Keep shared memorial creation disabled until cloud security, upload sanitation, abuse controls, and privacy disclosures are reviewed.
2. Implement server-side image sanitization and test it using metadata-bearing fixtures.
3. Confirm EU/EEA region and provider contracts/DPAs; document transfers if applicable.
4. Update the Privacy notice and subprocessor list from verified configuration.
5. Verify deletion/export path end-to-end and document retention.
6. QA on desktop and mobile, then re-check the exact release commit.

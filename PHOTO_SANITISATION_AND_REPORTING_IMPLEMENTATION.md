# Photo Sanitisation & Content Reporting Implementation Notes

Gentlewick uses React, Vite, TanStack Start server functions, and Supabase. Do not use Next.js `app/api` routes or Cloudflare R2 code from external examples without adapting it to this architecture.

## Photo sanitisation requirements
- Process uploaded image bytes server-side before storing any shared/public photo.
- Apply EXIF orientation, resize to maximum 1600x1600 without enlargement, encode WebP quality 82, and omit all metadata.
- Validate MIME and file size before processing; inspect actual file format, not just client MIME.
- Store the sanitised output only. Never publish the original upload.
- Verify by downloading a staged upload and checking that EXIF/GPS metadata is absent.
- Existing uploads must be reviewed/backfilled before enabling public cloud memorials.
- The current project uploads directly to Supabase Storage from the browser; replace that path with a secure server-side processing flow before claiming EXIF removal.

## Report form requirements
Use the approved Report Content form copy. The current stack should implement it as a TanStack Start route/component and server function, not a Next.js route.

Required fields: target URL, affected item type, reason, explanation, reporter name/email (optional only for CSAM reports), good-faith declaration. For CSAM reports, accept URL and explanation only; do not allow uploads/attachments or encourage downloading/redistribution.

## Backend requirements
Create a `content_reports` table with status, created_at, decided_at, decision_reason, automated_used, target_url, item_type, reason, explanation, reporter_name, reporter_email, good_faith, and safe audit fields. Do not expose reports publicly. Use RLS denying anon/authenticated reads; only secure server-side moderator access. Validate URL host against Gentlewick, rate-limit submissions, protect from spam, restrict report descriptions and input lengths, and store/report CSAM references under a restricted-access urgent handling process.

Submission should save first, then send confirmation email if email supplied. Do not claim email works until provider configured and delivery tested. Moderator decision workflow must record reason and whether automation was used; notify reporter when email exists. Retention/deletion and access controls must be documented.

## Status
Specification only. This file does not claim photo sanitisation, reporting, notifications, moderation, or admin workflow are implemented.

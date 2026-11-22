# Gentlewick photo metadata removal — status

## Implemented
- Supabase Edge Function `gentlewick-photo-sanitise` deployed and active with JWT verification enabled.
- Shared upload frontend sends the file to the function; it validates MIME and size (5 MB max), validates image signatures, removes metadata, and uploads the cleaned bytes to the public `lantern-photos` bucket using the service-role key server-side.
- JPEG: removes APP1 (EXIF/XMP), APP13 (IPTC/Photoshop), and comment segments.
- PNG: removes eXIf, tEXt, zTXt, and iTXt chunks.
- WebP: removes EXIF and XMP chunks and clears the corresponding VP8X metadata feature bits.
- Client does not receive or upload the service-role key.

## Limitations / not yet verified
- This is metadata stripping, not full image re-encoding. It does not normalize EXIF orientation; some images may display rotated after metadata removal.
- No end-to-end test with representative metadata-bearing photos has yet been performed; stored files must be inspected.
- Function-level abuse rate limiting and stricter image dimension/pixel-count checks are not implemented.
- Old photos already stored are not retroactively cleaned.
- The function is live in Supabase, but the frontend code change is on the launch branch and not yet deployed to the public website.

## Launch QA
1. Test JPEG with GPS EXIF, camera metadata, orientation; PNG with text/EXIF chunks; WebP with EXIF/XMP.
2. Confirm removed chunks/segments in stored files.
3. Test unsupported types, spoofed MIME/signature, empty files, and >5 MB files.
4. Review display orientation after stripping.
5. Decide whether to add re-encoding/orientation normalization before enabling public shared photo uploads.

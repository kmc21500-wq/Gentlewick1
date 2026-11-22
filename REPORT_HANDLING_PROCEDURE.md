# Gentlewick — Report handling procedure (pre-launch)

## Current report intake
- Public form: `/report`, linked from the shared memorial dialog.
- Storage: `public.content_reports` in Supabase.
- RLS is enabled. No public `anon` or `authenticated` read/insert permissions are granted; the server function writes using the service-role key.
- Receipt reference is returned after the database insert.
- Email receipts/outcome notifications are not configured.
- Automated content screening and in-site moderation queue are not implemented.
- Shared memorial creation remains disabled by default.

## Manual review (until a moderator console exists)
1. A designated administrator opens Supabase Dashboard → Table Editor → `content_reports` using an authorized account.
2. Review the report details and open the target URL in a safe manner. For suspected CSAM, do not download, copy, attach, or redistribute; restrict access and follow the appropriate legal escalation procedure immediately.
3. Set `status` to `reviewing` while investigating.
4. If action is taken, set `status` to `action_taken`; otherwise set `status` to `no_action`. Use `decision_reason` for a concise reason and `decided_at` for the decision time. Set `automated_used` to true/false only if automated tools actually contributed.
5. Preserve only information necessary for the decision and legal obligations. A formal retention schedule, notice workflow, escalation contact, and moderator access process must be approved before public sharing is enabled.
6. Do not tell reporters that a decision was made until a notification mechanism is configured and the notice is actually sent.

## Launch blockers
- Configure and verify email provider/notifications.
- Atomic report rate limit is deployed: 3 reports per hour per normalized reporter email; anonymous CSAM reports are limited per target URL path. This is a basic control, not IP/device-level protection.
- Retain the honeypot and monitor abuse; consider additional platform-level protection before public launch.
- Define report retention/deletion.
- Assign authorized moderator(s), escalation process, and response targets.
- Implement review console or document the secure manual process and test it.
- Review privacy/legal-controller details before enabling shared memorial creation.

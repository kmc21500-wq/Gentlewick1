-- Gentlewick private content reports
create table if not exists public.content_reports (
  id uuid primary key default gen_random_uuid(),
  target_url text not null check (char_length(target_url) <= 2048),
  item_type text not null check (item_type in ('memorial_text','photo','condolence','other')),
  reason text not null check (reason in ('animal_cruelty','harassment_hate_threats','private_data_doxxing','copyright_privacy','spam_scam','suspected_csam','other_illegal')),
  explanation text not null check (char_length(explanation) between 10 and 4000),
  reporter_name text check (char_length(reporter_name) <= 200),
  reporter_email text check (char_length(reporter_email) <= 320),
  good_faith boolean not null default false check (good_faith = true),
  status text not null default 'new' check (status in ('new','reviewing','action_taken','no_action','closed')),
  automated_used boolean,
  decision_reason text check (char_length(decision_reason) <= 4000),
  created_at timestamptz not null default now(),
  decided_at timestamptz,
  check (reason = 'suspected_csam' or (reporter_name is not null and reporter_email is not null))
);
create index if not exists content_reports_status_created_idx on public.content_reports(status, created_at desc);
create index if not exists content_reports_created_idx on public.content_reports(created_at desc);
alter table public.content_reports enable row level security;
revoke all on public.content_reports from anon, authenticated;
grant all on public.content_reports to service_role;

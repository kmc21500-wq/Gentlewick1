-- Gentlewick opt-in cloud backup. Run in the Supabase SQL editor.
-- One private backup per authenticated user; row-level security is mandatory.
create table if not exists public.gentlewick_backups (
  user_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null,
  updated_at timestamptz not null default now(),
  constraint gentlewick_backup_data_object check (jsonb_typeof(data) = 'object')
);

alter table public.gentlewick_backups enable row level security;
revoke all on public.gentlewick_backups from anon;
grant select, insert, update, delete on public.gentlewick_backups to authenticated;

drop policy if exists "Users read own Gentlewick backup" on public.gentlewick_backups;
create policy "Users read own Gentlewick backup" on public.gentlewick_backups
  for select to authenticated using (auth.uid() = user_id);
drop policy if exists "Users insert own Gentlewick backup" on public.gentlewick_backups;
create policy "Users insert own Gentlewick backup" on public.gentlewick_backups
  for insert to authenticated with check (auth.uid() = user_id);
drop policy if exists "Users update own Gentlewick backup" on public.gentlewick_backups;
create policy "Users update own Gentlewick backup" on public.gentlewick_backups
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "Users delete own Gentlewick backup" on public.gentlewick_backups;
create policy "Users delete own Gentlewick backup" on public.gentlewick_backups
  for delete to authenticated using (auth.uid() = user_id);

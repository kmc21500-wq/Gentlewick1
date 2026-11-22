-- Gentlewick shared memorial backend
create extension if not exists pgcrypto;

create table if not exists public.lanterns (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  name text not null check (char_length(name) <= 60),
  dates text not null default '' check (char_length(dates) <= 120),
  scent text default 'Morning Meadow & Warm Linen',
  photo_url text,
  story text not null default '' check (char_length(story) <= 2000),
  quote text not null default '' check (char_length(quote) <= 280),
  sky_x integer default 50 check (sky_x between 0 and 100),
  sky_y integer default 45 check (sky_y between 0 and 100),
  created_at timestamptz default timezone('utc', now()) not null
);
create table if not exists public.lantern_secrets (
  lantern_id uuid primary key references public.lanterns(id) on delete cascade,
  edit_token uuid default gen_random_uuid() not null,
  created_at timestamptz default timezone('utc', now()) not null
);
create table if not exists public.whispers (
  id uuid default gen_random_uuid() primary key,
  lantern_id uuid references public.lanterns(id) on delete cascade not null,
  message text not null check (char_length(message) <= 180),
  author text default 'Kindled in the Garden' check (char_length(author) <= 60),
  created_at timestamptz default timezone('utc', now()) not null
);
create index if not exists whispers_lantern_id_created_idx on public.whispers(lantern_id, created_at desc);

alter table public.lanterns enable row level security;
alter table public.lantern_secrets enable row level security;
alter table public.whispers enable row level security;
drop policy if exists "Public read lanterns" on public.lanterns;
create policy "Public read lanterns" on public.lanterns for select using (true);
drop policy if exists "Public insert lanterns" on public.lanterns;
create policy "Public insert lanterns" on public.lanterns for insert with check (true);
drop policy if exists "Public read whispers" on public.whispers;
create policy "Public read whispers" on public.whispers for select using (true);
drop policy if exists "Public insert whispers" on public.whispers;
create policy "Public insert whispers" on public.whispers for insert with check (true);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('lantern-photos','lantern-photos',true,5242880,array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set public=true, file_size_limit=5242880, allowed_mime_types=array['image/jpeg','image/png','image/webp'];

drop policy if exists "Public read lantern photos" on storage.objects;
create policy "Public read lantern photos" on storage.objects for select using (bucket_id='lantern-photos');
drop policy if exists "Public upload lantern photos" on storage.objects;
create policy "Public upload lantern photos" on storage.objects for insert with check (bucket_id='lantern-photos');

-- Atomic create: memorial and private token are created together.
create or replace function public.create_lantern_with_secret(
  p_slug text, p_name text, p_dates text, p_scent text, p_photo_url text,
  p_story text, p_quote text, p_sky_x integer, p_sky_y integer
) returns json
language plpgsql security definer set search_path=public
as $$
declare new_lantern public.lanterns; new_token uuid;
begin
  insert into public.lanterns(slug,name,dates,scent,photo_url,story,quote,sky_x,sky_y)
  values(p_slug,p_name,p_dates,p_scent,p_photo_url,p_story,p_quote,p_sky_x,p_sky_y)
  returning * into new_lantern;
  insert into public.lantern_secrets(lantern_id) values(new_lantern.id) returning edit_token into new_token;
  return json_build_object('lantern',row_to_json(new_lantern),'editToken',new_token);
end;
$$;
revoke all on function public.create_lantern_with_secret(text,text,text,text,text,text,text,integer,integer) from public, anon, authenticated;
grant execute on function public.create_lantern_with_secret(text,text,text,text,text,text,text,integer,integer) to service_role;

-- Public whisper insert/select policies above are intentionally the only public permissions.

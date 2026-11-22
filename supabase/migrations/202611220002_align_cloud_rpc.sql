-- Correct the cloud memorial schema and RPC to match the application.
-- Safe as a follow-up migration to 202611220001_gentlewick_backend.sql.

alter table public.lanterns
  add column if not exists environment text not null default 'golden-meadows';

alter table public.lanterns
  drop constraint if exists lanterns_environment_check;

alter table public.lanterns
  add constraint lanterns_environment_check
  check (environment in ('golden-meadows','moonlit-garden','crystal-falls','eternal-woods','rainbow-bridge'));

-- Memorials are created through the server-only RPC, not direct anonymous inserts.
drop policy if exists "Public insert lanterns" on public.lanterns;

create or replace function public.create_lantern_with_environment(
  p_slug text,
  p_name text,
  p_dates text,
  p_scent text,
  p_photo_url text,
  p_story text,
  p_quote text,
  p_sky_x integer,
  p_sky_y integer,
  p_environment text
) returns json
language plpgsql
security definer
set search_path=public, pg_temp
as $$
declare
  new_lantern public.lanterns;
  new_token uuid;
begin
  if p_environment not in ('golden-meadows','moonlit-garden','crystal-falls','eternal-woods','rainbow-bridge') then
    raise exception 'Invalid sanctuary environment';
  end if;

  insert into public.lanterns(slug,name,dates,scent,photo_url,story,quote,sky_x,sky_y,environment)
  values(p_slug,p_name,p_dates,p_scent,p_photo_url,p_story,p_quote,p_sky_x,p_sky_y,p_environment)
  returning * into new_lantern;

  insert into public.lantern_secrets(lantern_id)
  values(new_lantern.id)
  returning edit_token into new_token;

  return json_build_object('lantern',row_to_json(new_lantern),'editToken',new_token);
end;
$$;

revoke all on function public.create_lantern_with_environment(text,text,text,text,text,text,text,integer,integer,text) from public, anon, authenticated;
grant execute on function public.create_lantern_with_environment(text,text,text,text,text,text,text,integer,integer,text) to service_role;

-- The old RPC is no longer used by the application. Keep it service-role-only.
revoke all on function public.create_lantern_with_secret(text,text,text,text,text,text,text,integer,integer) from public, anon, authenticated;
grant execute on function public.create_lantern_with_secret(text,text,text,text,text,text,text,integer,integer) to service_role;

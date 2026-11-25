-- Align the cloud memorial RPC with the application server contract.
-- This migration is additive and does not enable cloud creation by itself.
alter table public.lanterns
  add column if not exists environment text not null default 'golden-meadows'
  check (environment in ('golden-meadows','moonlit-garden','crystal-falls','eternal-woods','rainbow-bridge'));

create or replace function public.create_lantern_with_environment(
  p_slug text, p_name text, p_dates text, p_scent text, p_photo_url text,
  p_story text, p_quote text, p_sky_x integer, p_sky_y integer, p_environment text
) returns json
language plpgsql security definer set search_path=public
as $$
declare new_lantern public.lanterns; new_token uuid;
begin
  if p_environment not in ('golden-meadows','moonlit-garden','crystal-falls','eternal-woods','rainbow-bridge') then
    raise exception 'Invalid sanctuary environment';
  end if;
  insert into public.lanterns(slug,name,dates,scent,photo_url,story,quote,sky_x,sky_y,environment)
  values(p_slug,p_name,p_dates,p_scent,p_photo_url,p_story,p_quote,p_sky_x,p_sky_y,p_environment)
  returning * into new_lantern;
  insert into public.lantern_secrets(lantern_id) values(new_lantern.id) returning edit_token into new_token;
  return json_build_object('lantern',row_to_json(new_lantern),'editToken',new_token);
end;
$$;

revoke all on function public.create_lantern_with_environment(text,text,text,text,text,text,text,integer,integer,text) from public, anon, authenticated;
grant execute on function public.create_lantern_with_environment(text,text,text,text,text,text,text,integer,integer,text) to service_role;

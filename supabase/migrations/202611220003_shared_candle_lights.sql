alter table public.lanterns add column if not exists candle_count integer not null default 0 check (candle_count >= 0);
create or replace function public.light_shared_lantern(p_lantern_id uuid)
returns integer language plpgsql security definer set search_path=public
as $$
declare total integer;
begin
  update public.lanterns set candle_count=candle_count+1 where id=p_lantern_id returning candle_count into total;
  if total is null then raise exception 'Memorial not found'; end if;
  return total;
end;
$$;
revoke all on function public.light_shared_lantern(uuid) from public, anon, authenticated;
grant execute on function public.light_shared_lantern(uuid) to service_role;
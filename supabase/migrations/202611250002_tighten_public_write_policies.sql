-- Public visitors read shared memorials, but all writes must pass through
-- the validated Edge Functions which apply rate limits and keep owner tokens private.
drop policy if exists "Public insert lanterns" on public.lanterns;
drop policy if exists "Public insert whispers" on public.whispers;
drop policy if exists "Public upload lantern photos" on storage.objects;

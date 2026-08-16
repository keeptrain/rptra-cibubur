-- 1. Set app_metadata role: admin for cgilang02@gmail.com in auth.users
update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role": "admin"}'::jsonb
where lower(email) = 'cgilang02@gmail.com';

-- 2. Grant INSERT & UPDATE privileges on park_operation_logs to authenticated role
grant insert, update on public.park_operation_logs to authenticated;

-- 3. Create RLS policy for admin insert based on auth.jwt() app_metadata role
drop policy if exists "Allow admin insert on park_operation_logs" on public.park_operation_logs;
create policy "Allow admin insert on park_operation_logs"
  on public.park_operation_logs for insert
  to authenticated
  with check (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

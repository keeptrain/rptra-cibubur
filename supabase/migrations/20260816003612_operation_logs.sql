-- Create table for operation logs & sudden closure / custom schedule overrides
create table if not exists public.park_operation_logs (
  id bigint primary key generated always as identity,
  override_date date default current_date not null,
  status text not null check (status in ('OPEN', 'CLOSED', 'MODIFIED')),
  custom_open_time time without time zone,
  custom_close_time time without time zone,
  reason_notice text not null default 'Ditutup sementara.',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
/* By defaut, RLS is enabled on newly created tables in Supabase */

-- Grant table-level SELECT privileges to anon and authenticated roles
grant select on public.park_operation_logs to anon, authenticated;

-- Policies for public reading
drop policy if exists "Allow public read on park_operation_logs" on public.park_operation_logs;
create policy "Allow public read on park_operation_logs"
  on public.park_operation_logs for select
  to anon, authenticated using (true);

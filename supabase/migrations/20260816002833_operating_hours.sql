-- 1. Create table for 7-day regular operating hours schedule
create table if not exists public.park_operating_hours (
  day_of_week integer primary key check (day_of_week between 0 and 6), -- 0 = Minggu, 1 = Senin, ... 6 = Sabtu
  day_name text not null,
  open_time time without time zone default '06:00:00' not null,
  close_time time without time zone default '18:00:00' not null,
  is_open boolean default true not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
/* By defaut, RLS is enabled on newly created tables in Supabase */

-- Grant table-level SELECT privileges to anon and authenticated roles
grant select on public.park_operating_hours to anon, authenticated;

-- Policies for public reading
drop policy if exists "Allow public read on park_operating_hours" on public.park_operating_hours;
create policy "Allow public read on park_operating_hours"
  on public.park_operating_hours for select
  to anon, authenticated using (true);

-- Seed default 7-day schedule (RPTRA Cibubur default: 06:00 - 18:00 WIB every day)
insert into public.park_operating_hours (day_of_week, day_name, open_time, close_time, is_open)
values
  (0, 'Minggu', '06:00:00', '18:00:00', true),
  (1, 'Senin', '06:00:00', '18:00:00', true),
  (2, 'Selasa', '06:00:00', '18:00:00', true),
  (3, 'Rabu', '06:00:00', '18:00:00', true),
  (4, 'Kamis', '06:00:00', '18:00:00', true),
  (5, 'Jumat', '06:00:00', '18:00:00', true),
  (6, 'Sabtu', '06:00:00', '18:00:00', true)
on conflict (day_of_week) do nothing;
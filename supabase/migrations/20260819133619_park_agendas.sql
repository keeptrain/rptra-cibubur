-- 1. Create table for park agenda activities with soft delete support (deleted_at)
create table if not exists public.park_agendas (
  id uuid primary key,
  title text not null,
  event_date date not null,
  start_time time without time zone not null,
  end_time time without time zone not null,
  location text not null,
  organizer text not null,
  target_audience text,
  contact_person text,
  banner_url text,
  description text,
  status text default 'UPCOMING' not null check (status in ('UPCOMING', 'COMPLETED')),
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  deleted_at timestamp with time zone default null
);

-- 2. Create indexes for high-speed date range, status, and soft delete lookups
create index if not exists idx_park_agendas_event_date on public.park_agendas (event_date desc);
create index if not exists idx_park_agendas_status on public.park_agendas (status);
create index if not exists idx_park_agendas_created_by on public.park_agendas (created_by);
create index if not exists idx_park_agendas_deleted_at on public.park_agendas (deleted_at) where deleted_at is null;

-- 3. Enable Row Level Security (RLS)
alter table public.park_agendas enable row level security;

-- 4. Grant table-level permissions to anon and authenticated roles
grant select on public.park_agendas to anon, authenticated;
grant insert, update, delete on public.park_agendas to authenticated;

-- 5. Policies for public reading (only non-deleted agendas)
drop policy if exists "Allow public read on park_agendas" on public.park_agendas;
create policy "Allow public read on park_agendas"
  on public.park_agendas for select
  to anon, authenticated using (deleted_at is null);

-- 6. Policies for admin writing (Insert, Update, Delete) based on app_metadata
drop policy if exists "Allow admin insert on park_agendas" on public.park_agendas;
create policy "Allow admin insert on park_agendas"
  on public.park_agendas for insert
  to authenticated
  with check (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

drop policy if exists "Allow admin update on park_agendas" on public.park_agendas;
create policy "Allow admin update on park_agendas"
  on public.park_agendas for update
  to authenticated
  using (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

drop policy if exists "Allow admin delete on park_agendas" on public.park_agendas;
create policy "Allow admin delete on park_agendas"
  on public.park_agendas for delete
  to authenticated
  using (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

-- 7. Seed initial dummy agendas for easy GET testing (linked to Admin User 21b50e05-7cd8-437c-8d4e-c2fe0c9d7e05)
insert into public.park_agendas (
  id,
  title,
  event_date,
  start_time,
  end_time,
  location,
  organizer,
  target_audience,
  contact_person,
  banner_url,
  description,
  status,
  created_by
)
values
  (
    '019163e0-0001-7000-8000-000000000001',
    'Senam Sehat Lansia & Pemeriksaan Kesehatan',
    '2026-08-20',
    '06:30:00',
    '08:30:00',
    'Lapangan Serbaguna RPTRA',
    'Puskesmas & Kader PKK Cibubur',
    'Warga Lansia & Pra-Lansia Cibubur',
    '0812-3456-7890 (Ibu Siti)',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80',
    'Senam kebugaran bersama dilanjutkan dengan pemeriksaan tekanan darah dan gula darah gratis untuk lansia.',
    'UPCOMING',
    '21b50e05-7cd8-437c-8d4e-c2fe0c9d7e05'
  ),
  (
    '019163e0-0002-7000-8000-000000000002',
    'Pelatihan Kerajinan Daur Ulang Sampah Plastik',
    '2026-08-22',
    '09:00:00',
    '11:30:00',
    'Aula Utama RPTRA',
    'Karang Taruna RT 05',
    'Pemuda & Ibu Rumah Tangga',
    '0813-9876-5432 (Bpk Ahmad)',
    null,
    'Workshop kreatif mengolah limbah plastik rumah tangga menjadi barang berguna dan bernilai jual.',
    'UPCOMING',
    '21b50e05-7cd8-437c-8d4e-c2fe0c9d7e05'
  ),
  (
    '019163e0-0003-7000-8000-000000000003',
    'Posyandu Balita & Pembagian PMT Tambahan',
    '2026-08-15',
    '08:00:00',
    '11:00:00',
    'Ruang Kesehatan RPTRA',
    'Kader Posyandu Cibubur',
    'Ibu & Balita Usia 0-5 Tahun',
    '0815-1122-3344 (Ibu Rahma)',
    null,
    'Penimbangan balita, imunisasi rutin, dan pembagian makanan tambahan bergizi untuk tumbuh kembang anak.',
    'COMPLETED',
    '21b50e05-7cd8-437c-8d4e-c2fe0c9d7e05'
  ),
  (
    '019163e0-0004-7000-8000-000000000004',
    'Lomba Mewarnai & Dongeng Anak Anak',
    '2026-08-10',
    '13:00:00',
    '15:30:00',
    'Ruang Perpustakaan RPTRA',
    'Pengelola RPTRA & Komunitas Dongeng',
    'Anak-Anak Usia TK & SD',
    '0812-9988-7766 (Pengelola RPTRA)',
    null,
    'Kegiatan edukasi anak-anak mendengarkan cerita cerita rakyat Indonesia dan kompetisi mewarnai.',
    'COMPLETED',
    '21b50e05-7cd8-437c-8d4e-c2fe0c9d7e05'
  )
on conflict (id) do nothing;

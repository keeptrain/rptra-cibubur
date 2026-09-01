-- Guest Book Ajukan Kegiatan — UNLOGGED, tanpa index tambahan untuk write cepat (unlogged = tidak WAL, hilang saat crash tapi oke untuk guest book)
create unlogged table public.guest_activity_ideas (
  id uuid primary key default gen_random_uuid(),
  guest_name text not null,
  guest_contact text,
  title text not null,
  description text,
  proposed_date date,
  created_at timestamptz not null default now()
);

-- RLS: allow anon insert/select, no indexes selain PK
alter table public.guest_activity_ideas enable row level security;
create policy "allow anon insert" on public.guest_activity_ideas for insert to anon with check (true);
create policy "allow read" on public.guest_activity_ideas for select using (true);

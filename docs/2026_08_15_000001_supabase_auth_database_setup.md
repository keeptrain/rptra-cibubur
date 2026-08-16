# Task 01: Setup Supabase Database, Skema Auth, dan RLS

## 1. Ringkasan

Menyiapkan fondasi database PostgreSQL di Supabase dengan autentikasi langsung menggunakan `supabase.auth` (`auth.users`) tanpa tabel profiles terpisah, serta mendesain tabel khusus `public.auth_otp_codes` (UNLOGGED) untuk penyimpanan sementara kode OTP 8 digit tanpa beban WAL logging.

---

## 2. Struktur Tabel Database

### Tabel Unlogged OTP (public.auth_otp_codes)

- Menggunakan jenis tabel `UNLOGGED` pada PostgreSQL untuk efisiensi performa I/O tinggi karena data OTP bersifat sementara dan tidak memerlukan pencatatan WAL (Write-Ahead Logging).
- Field: `id` (bigint primary key), `email` (text), `otp_code` (8 digit text), `expires_at` (timestamp, default 10 menit), `is_used` (boolean), `attempts_count` (integer), dan `created_at` (timestamp).
- Index: Dibuat index pada kolom `(email, expires_at)` untuk mempercepat pencarian dan pembersihan data lama.

---

## 3. Kebijakan Keamanan (Row Level Security / RLS)

- RLS diaktifkan pada tabel `public.auth_otp_codes`.
- RLS ditutup total dari akses publik via API client (`anon` key).
- Seluruh operasi pembuatan, validasi, dan pembersihan OTP hanya dieksekusi melalui server environment yang aman (Service Role / Server Action / Edge Function).

---

## 4. Pembersihan Otomatis Data OTP Kadaluarsa

- Menyiapkan mekanisme rutin server / pg_cron untuk menghapus baris OTP yang sudah melewati masa berlaku 10 menit agar ukuran tabel tetap ringkas dan aman.

---

## 5. Checklist Verifikasi

- [x] Tabel unlogged `public.auth_otp_codes` berhasil dibuat di Supabase Cloud dengan masa berlaku default 10 menit.
- [x] RLS aktif dan akses langsung client anon ke tabel OTP dipastikan ditolak.
- [x] Sistem autentikasi terhubung langsung dengan `supabase.auth` (`auth.users`).

# Task 01: Setup Supabase Database, Skema Auth, dan RLS

## 1. Ringkasan

Menyiapkan fondasi database PostgreSQL di Supabase, mengaktifkan Row Level Security (RLS), dan mendesain tabel khusus untuk kebutuhan otentikasi passwordless OTP tanpa beban logging berlebih.

---

## 2. Struktur Tabel Database

### A. Tabel Profil Pengguna (public.profiles)

- Menyimpan metadata akun pengguna yang terhubung langsung dengan ID autentikasi Supabase.
- Field yang dibutuhkan: ID unik (relasi auth.users), email pengguna, nama lengkap, nomor WhatsApp, peran/role akun (admin pengelola atau warga), serta timestamp waktu pembuatan akun.

### B. Tabel Unlogged OTP (public.auth_otp_codes)

- Menggunakan jenis tabel `UNLOGGED` pada PostgreSQL untuk efisiensi performa I/O tinggi karena data OTP bersifat sementara dan tidak memerlukan pencatatan WAL (Write-Ahead Logging).
- Field yang dibutuhkan: ID unik, email tujuan, kode OTP numerik sepanjang 8 digit, timestamp waktu kedaluwarsa (10 menit sejak dibuat), flag status apakah sudah digunakan, jumlah percobaan verifikasi, dan timestamp pembuatan.
- Index: Dibuat index pada kolom email dan timestamp expired untuk mempercepat proses pencarian dan pembersihan data lama.

---

## 3. Kebijakan Keamanan (Row Level Security / RLS)

### A. Proteksi Tabel Profil

- RLS wajib diaktifkan pada tabel profil.
- Pengguna hanya memiliki izin membaca dan memperbarui baris data milik mereka sendiri berdasarkan kecocokan ID otentikasi.
- Pengguna dengan role admin pengelola diberikan izin membaca seluruh profil untuk keperluan manajemen layanan.

### B. Proteksi Tabel OTP

- RLS ditutup total dari akses publik via API client (anon key).
- Seluruh operasi pembuatan, validasi, dan pembersihan OTP hanya boleh dieksekusi melalui server environment yang aman (Service Role / Server Action / Edge Function).

---

## 4. Pembersihan Otomatis Data OTP Kadaluarsa

- Menyiapkan mekanisme terjadwal (pg_cron atau rutin server) untuk menghapus baris OTP yang sudah melewati masa berlaku 10 menit agar ukuran tabel tetap ringkas dan aman.

---

## 5. Checklist Verifikasi

- [ ] Ekstensi UUID dan helper fungsi database telah aktif di Supabase.
- [ ] Tabel profiles terhubung dengan auth.users dan memiliki RLS aktif.
- [ ] Tabel unlogged auth_otp_codes berhasil dibuat dengan masa berlaku default 10 menit.
- [ ] Akses langsung client anon ke tabel OTP dipastikan ditolak oleh RLS.

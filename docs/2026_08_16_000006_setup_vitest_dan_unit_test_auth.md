# Task 06: Setup Vitest & Unit Testing Modul Autentikasi (Features/Auth)

## 1. Ringkasan

Menyiapkan lingkungan pengujian unit (_unit testing environment_) berbasis Vitest pada proyek Next.js, serta menyusun rangkaian uji logika murni untuk seluruh modul autentikasi (`src/features/auth`). Pengujian difokuskan pada logika bisnis, penanganan eror (_error handling_), validasi input, serta alur eksekusi dari skenario gagal (_bad path_) hingga skenario sukses (_good path_) dengan menggunakan simulasi tiruan (_mocking_) terisolasi tanpa melibatkan komponen visual UI.

---

## 2. Konfigurasi Lingkungan Testing Vitest

### A. Dependensi Pengujian

- Memasang paket Vitest dan modul pendukung path alias TypeScript melalui package manager pnpm.
- Menambahkan skrip perintah eksekusi testing pada konfigurasi proyek agar dapat dijalankan secara konsisten di terminal lokal maupun CI/CD.

### B. Konfigurasi Vitest & Path Alias

- Mengatur berkas konfigurasi Vitest di root proyek untuk mengenali alias modul (seperti `@/` yang merujuk ke direktori `src/`).
- Menetapkan lingkungan eksekusi node/server untuk pengujian unit logika aksi dan helper Supabase.
- Mengatur pembersihan otomatis (_auto clear/restore mocks_) di setiap akhir siklus uji agar tidak terjadi kebocoran state antar berkas uji.

---

## 3. Struktur Direktori Testing

Pengujian diorganisasikan secara co-located di dalam modul fitur bersangkutan dengan hirarki sebagai berikut:

- `src/features/auth/__tests__/unit/`
  - `sendOtpAction.test.ts` (Pengujian logika pengiriman OTP & validasi email)
  - `verifyOtpAction.test.ts` (Pengujian logika verifikasi 8-digit OTP)
  - `silentLoginUsingMagicLinkAction.test.ts` (Pengujian pembentukan sesi login di latar belakang)
  - `logoutAction.test.ts` (Pengujian fungsi logout & pengalihan rute)
  - `getUser.test.ts` (Pengujian pengambilan sesi pengguna aktif)

---

## 4. Alur & Skenario Pengujian Unit (Bad Path -> Good Path)

Setiap fungsi diuji dengan prinsip urutan dari skenario kegagalan (_bad path_) hingga skenario keberhasilan (_good path_):

### A. Pengujian `sendOtpAction`

1. **Bad Path (Format Email Tidak Valid)**:
   - Input string kosong, format email tanpa domain, atau email non-Gmail (misal `@yahoo.com` atau `@outlook.com`).
   - Ekspektasi: Mengembalikan status gagal dengan pesan penolakan domain non-Gmail.
2. **Bad Path (Kegagalan RPC Database)**:
   - Database Supabase RPC `request_otp_code` mengembalikan galat koneksi atau kegagalan pembuatan OTP.
   - Ekspektasi: Mengembalikan status gagal dengan deskripsi galat yang jelas.
3. **Good Path (Berhasil Generate & Kirim OTP)**:
   - Email berdomain `@gmail.com` valid dan RPC database sukses mengembalikan kode OTP 8-digit.
   - Ekspektasi: Mengembalikan status sukses dengan alamat email yang dinormalisasi.

### B. Pengujian `verifyOtpAction`

1. **Bad Path (Format Input Tidak Lengkap / Bukan 8 Digit)**:
   - Input OTP kurang dari 8 karakter, lebih dari 8 karakter, atau email kosong.
   - Ekspektasi: Mengembalikan status gagal dengan peringatan kewajiban 8 digit angka.
2. **Bad Path (RPC Database Mengembalikan Galat / OTP Salah / Kedaluwarsa)**:
   - Database RPC `verify_otp_code` mengembalikan pesan bahwa kode OTP salah atau masa berlakunya telah habis.
   - Ekspektasi: Mengembalikan status gagal dengan pesan penolakan verifikasi dari database.
3. **Bad Path (Gagal Membentuk Sesi Login Magiclink)**:
   - Kode OTP valid di database, tetapi proses pembentukan sesi login latar belakang mengalami kegagalan.
   - Ekspektasi: Mengembalikan status gagal dengan alasan kegagalan sesi.
4. **Good Path (Verifikasi Sukses & Pembentukan Sesi Berhasil)**:
   - Kode OTP 8-digit cocok di database dan proses pembentukan sesi login berhasil tanpa kendala.
   - Ekspektasi: Mengembalikan status sukses dan target pengalihan ke rute dashboard.

### C. Pengujian `silentLoginUsingMagicLinkAction`

1. **Bad Path (Gagal Generate Link dari Supabase Admin)**:
   - Klien admin Supabase gagal membuat magiclink (misal galat otorisasi service role).
   - Ekspektasi: Mengembalikan status gagal beserta pesan galat generator token.
2. **Bad Path (Properti Token Tidak Ditemukan)**:
   - Data balasan admin tidak memuat token `email_otp` maupun `hashed_token`.
   - Ekspektasi: Mengembalikan status gagal dengan pesan token tidak ditemukan.
3. **Bad Path (Verifikasi Token SDK Supabase Gagal)**:
   - Pemanggilan verifikasi OTP pada klien server gagal menyimpan sesi cookie.
   - Ekspektasi: Mengembalikan status gagal dengan pesan kegagalan penyimpanan sesi.
4. **Good Path (Pengguna Baru Berhasil Dibuat & Sesi Terbentuk)**:
   - Akun pengguna baru dibuat otomatis dengan status email terkonfirmasi, magiclink dibuat, dan sesi berhasil diverifikasi.
   - Ekspektasi: Mengembalikan status sukses.
5. **Good Path (Pengguna Lama Berhasil Diperbarui & Sesi Terbentuk)**:
   - Akun pengguna sudah terdaftar sebelumnya di sistem, magiclink dibuat, dan sesi berhasil diverifikasi.
   - Ekspektasi: Mengembalikan status sukses.

### D. Pengujian `logoutAction`

1. **Good Path (Proses SignOut Sukses)**:
   - Memanggil metode `signOut` pada klien server Supabase.
   - Ekspektasi: Mengembalikan status sukses dan target pengalihan ke halaman login.

### E. Pengujian `getUser`

1. **Bad Path (Sesi Tidak Ada / Galat Autentikasi)**:
   - Klien Supabase mengembalikan data pengguna null atau objek galat otentikasi.
   - Ekspektasi: Fungsi mengembalikan nilai null dengan aman tanpa memicu uncaught exception.
2. **Good Path (Sesi Pengguna Ditemukan)**:
   - Klien Supabase mengembalikan objek pengguna valid dengan metadata lengkap.
   - Ekspektasi: Fungsi mengembalikan objek data pengguna terautentikasi.

---

## 5. Rencana Refaktor Kode & Kotak Persetujuan Review Pengguna

Bagian ini mendokumentasikan potensi perapihan dan refaktor kode agar pengguna dapat melakukan tinjauan terlebih dahulu sebelum eksekusi dilakukan:

### A. Usulan Refaktor Ekstensi Berkas Action

- **Deskripsi Perubahan**: Mengubah ekstensi berkas aksi autentikasi dari format `.tsx` menjadi `.ts` murni (`sendOtpAction.ts`, `verifyOtpAction.ts`, `silentLoginUsingMagicLinkAction.ts`) karena berkas-berkas tersebut murni berisi logika Server Action tanpa elemen sintaks visual JSX/React.
- **Alasan & Manfaat**: Memperjelas pemisahan antara lapisan logika (_pure TypeScript backend action_) dan lapisan tampilan (_React JSX components_), serta mempermudah eksekusi unit test di Vitest tanpa overhead parser JSX.
- **Kotak Persetujuan Review Pengguna**:
  - [YA] Setuju untuk refaktor ekstensi berkas dari `.tsx` ke `.ts` murni: **[ YA / TIDAK ]**

---

## 6. Checklist Verifikasi & Kriteria Keberhasilan

- [x] Paket Vitest terpasang dan konfigurasi path alias `@/*` berjalan dengan baik.
- [x] Berkas-berkas unit test tersusun rapi di bawah direktori `src/features/auth/__tests__/unit/`.
- [x] Seluruh skenario Bad Path teruji dengan baik dan menangani pesan kegagalan secara akurat.
- [x] Seluruh skenario Good Path teruji dan berhasil memvalidasi alur sukses setiap fungsi.
- [x] Seluruh pengujian berjalan 100% lulus (_21 passed in 5 test files_) pada eksekusi terminal tanpa ada regresi.

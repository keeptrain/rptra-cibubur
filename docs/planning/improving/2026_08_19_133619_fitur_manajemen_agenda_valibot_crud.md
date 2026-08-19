# Task 11: Perancangan Arsitektur Fitur Manajemen Agenda (Valibot, UUIDv7, Supabase CRUD, & Caching)

## 1. Ringkasan

Dokumen ini merinci perencanaan arsitektur menyeluruh untuk implementasi fungsionalitas CRUD (_Create, Read, Update, Delete_) pada modul Manajemen Agenda Kegiatan RPTRA Cibubur. Implementasi berfokus pada skalabilitas, efisiensi ukuran berkas (_bundle size_), identitas terurut waktu berbasis UUIDv7, pelacakan admin pembuat (_created_by_), keamanan otentikasi di sisi server, serta performa tinggi melalui _caching_ berlapis dan validasi data berbasis pustaka Valibot.

---

## 2. Rincian Pilar Arsitektur & Spesifikasi Fitur

### A. Pustaka Validasi Skema & Identifier UUIDv7

- **Pustaka Validasi (Valibot)**: Menggantikan kebutuhan pustaka validasi berat dengan Valibot yang memiliki footprint sangat kecil (_tree-shakeable_, di bawah 1 KB) untuk validasi data masukan formulir agenda di sisi server maupun klien.
- **Pustaka UUIDv7 (`uuidv7`)**: Menggunakan generator UUID versi 7 berbasis waktu (_time-ordered_) agar ID agenda memiliki pengurutan indeks B-Tree database yang sangat efisien dan performan.
- **Lokasi Berkas**: Disimpan secara modular pada folder `src/features/agenda/schemas/agendaSchema.ts`.
- **Aturan Validasi**:
  1. Judul Agenda: Wajib diisi, minimal 5 karakter, maksimal 150 karakter.
  2. Tanggal Pelaksanaan: Format tanggal ISO (YYYY-MM-DD), tidak boleh string kosong.
  3. Waktu Mulai & Selesai: Format jam 24 jam (HH:mm), waktu selesai harus setelah waktu mulai.
  4. Lokasi / Area RPTRA: Wajib diisi, minimal 3 karakter.
  5. Penyelenggara: Wajib diisi, minimal 3 karakter.
  6. Deskripsi / Rincian: Teks bebas (dapat menampung string multiline atau JSON/HTML di masa depan).
  7. Status Keterlaksanaan: Bernilai 'UPCOMING' atau 'COMPLETED'.

### B. Struktur Tabel Supabase (`park_agendas`)

- **Tujuan**: Menyediakan skema penyimpanan data yang fleksibel, terindeks secara optimal, multi-admin tracking, dan aman dengan _Row Level Security_ (RLS).
- **Spesifikasi Kolom**:
  1. `id`: Tipe UUID sebagai primary key unik (dihasilkan via UUIDv7).
  2. `title`: Tipe TEXT, wajib terisi (_not null_).
  3. `event_date`: Tipe DATE, terindeks untuk query filter bulan dan tahun yang cepat.
  4. `start_time`: Tipe TIME, menyimpan jam mulai WIB.
  5. `end_time`: Tipe TIME, menyimpan jam selesai WIB.
  6. `location`: Tipe TEXT, nama area atau fasilitas RPTRA.
  7. `organizer`: Tipe TEXT, nama pihak/kader/instansi penyelenggara.
  8. `target_audience`: Tipe TEXT, deskripsi target sasaran peserta.
  9. `contact_person`: Tipe TEXT, nomor atau kontak narahubung acara.
  10. `banner_url`: Tipe TEXT, URL gambar banner/poster kegiatan.
  11. `description`: Tipe TEXT, rincian kegiatan (kompatibel untuk transisi ke Rich Text Editor/Markdown/JSON di masa mendatang).
  12. `status`: Tipe TEXT dengan default 'UPCOMING', bernilai 'UPCOMING' atau 'COMPLETED'.
  13. `created_by`: Tipe UUID merujuk (_foreign key_) ke `auth.users(id)` untuk melacak admin pembuat kegiatan.
  14. `created_at` & `updated_at`: Tipe TIMESTAMPTZ, pencatatan waktu otomatis.
- **Kebijakan Keamanan (RLS Policies)**:
  - _SELECT (Publik & Terautentikasi)_: Diizinkan membaca seluruh agenda aktif.
  - _INSERT, UPDATE, DELETE (Hanya Admin)_: Dibatasi hanya untuk pengguna terotentikasi dengan peran admin (`role === 'admin'`).

### C. Pengambilan Data (_Read_) dengan Caching Berlapis (`unstable_cache`)

- **Tujuan**: Mempercepat respon halaman dan mengeliminasi beban kueri database berulang untuk data yang sering diakses warga dan pengelola.
- **Mekanisme Caching**:
  1. Membungkus fungsi pengambilan data daftar agenda dan rincian agenda menggunakan fungsi `unstable_cache` bawaan Next.js.
  2. Menyematkan cache tags `['park-agendas']` dan `['park-agenda-detail']` dengan masa simpan revalidasi 1 jam.
  3. Invalidation instan: Setiap operasi _Create_, _Update_, atau _Delete_ sukses secara otomatis memanggil `revalidateTag('park-agendas')` dan `revalidatePath('/manajemen-agenda')`.

### D. Mutasi Data (_Create, Update, Delete_) via React Server Actions

- **Tujuan**: Menjalankan mutasi data yang aman, terisolasi di sisi server, dengan verifikasi otentikasi independen.
- **Daftar Server Action**:
  1. `createAgendaAction`: Menghasilkan UUIDv7, menyisipkan `created_by` dari sesi user admin saat ini, memvalidasi input melalui skema Valibot, dan menyimpan ke tabel Supabase.
  2. `updateAgendaAction`: Memvalidasi ID agenda dan payload masukan, memverifikasi hak akses admin, serta memperbarui kolom di database.
  3. `toggleAgendaStatusAction`: Memperbarui status agenda antara 'UPCOMING' dan 'COMPLETED'.
  4. `deleteAgendaAction`: Menghapus baris agenda berdasarkan ID setelah verifikasi akses admin.

### E. Penanganan Kesalahan Terpadu (_Consolidated Error Display_) dengan Minim State

- **Tujuan**: Mencegah kerumitan form state, tidak menggunakan form library yang berlebihan (_no React Hook Form_), dan menyajikan umpan balik kesalahan secara jelas kepada pengguna.
- **Pola UI**:
  1. Menggunakan pola native React Action State (`useActionState`).
  2. Seluruh pesan kegagalan validasi dari Valibot digabungkan (_flattened_) dan ditampilkan dalam satu kotak banner peringatan di bagian atas formulir.
  3. Menampilkan daftar poin kesalahan secara eksplisit sehingga pengguna langsung mengetahui bagian mana yang perlu diperbaiki.

---

## 3. Rangkaian Skenario Testing (Bad Path -> Good Path)

Pengujian unit logic dilakukan menggunakan Vitest pada direktori `src/features/agenda/__tests__/unit/` tanpa ketergantungan pada runtime komponen browser Next.js (Mocking terisolasi):

### A. Pengujian Skema Validasi Valibot (`agendaSchema.test.ts`)

1. **Bad Path (Data Masukan Tidak Valid)**:
   - Menguji payload dengan judul kurang dari 5 karakter, string tanggal kosong, atau format waktu tidak valid.
   - Ekspektasi: Valibot menolak data dan menghasilkan daftar pesan error yang spesifik.
2. **Bad Path (Waktu Selesai Mendahului Waktu Mulai)**:
   - Menguji payload di mana jam selesai lebih awal dari jam mulai (misal mulai 10:00 selesai 08:00).
   - Ekspektasi: Skema mendeteksi anomali rentang waktu dan memberikan pesan koreksi.
3. **Good Path (Data Masukan Lengkap & Valid)**:
   - Menguji payload agenda kegiatan yang memenuhi seluruh kriteria tipe dan format.
   - Ekspektasi: Skema mengembalikan output data yang tervalidasi bersih tanpa error.

### B. Pengujian Mutasi Server Action (`agendaActions.test.ts`)

1. **Bad Path (Pengguna Belum Login / Sesi Kosong)**:
   - Memanggil aksi mutasi tanpa menyertakan sesi otentikasi Supabase.
   - Ekspektasi: Aksi menolak eksekusi dengan pesan otentikasi gagal tanpa melakukan query database.
2. **Bad Path (Pengguna Bukan Admin)**:
   - Memanggil aksi dengan akun non-admin (`role !== 'admin'`).
   - Ekspektasi: Aksi menolak eksekusi dengan pesan otorisasi ditolak.
3. **Good Path (Admin Terverifikasi & Input Valid)**:
   - Memanggil aksi dengan akun administrator dan payload terverifikasi Valibot.
   - Ekspektasi: Aksi berhasil memanipulasi database, menyematkan ID UUIDv7 dan user ID `created_by`, memicu invalidasi cache tag, dan mengembalikan status sukses.

---

## 4. Rencana Implementasi & Kotak Persetujuan Review Pengguna

Berikut adalah daftar rencana eksekusi teknis yang telah disetujui:

### A. Instalasi Dependensi Pustaka Valibot & UUIDv7

- **Deskripsi**: Menambahkan paket `valibot` dan `uuidv7` ke dependensi proyek via `pnpm add valibot uuidv7`.
- [YA] Setuju untuk instalasi paket Valibot & UUIDv7: **[ YA / TIDAK ]**

### B. Pembuatan Migrasi Skema Supabase `park_agendas`

- **Deskripsi**: Membuat berkas migrasi SQL di `supabase/migrations/` untuk membuat tabel `park_agendas` dengan kolom `created_by`, indeks tanggal, dan kebijakan RLS (dieksekusi manual oleh pengguna di Supabase SQL Editor).
- [YA] Setuju untuk pembuatan skema tabel Supabase: **[ YA / TIDAK ]**

### C. Implementasi Skema Valibot & Server Actions

- **Deskripsi**: Menyusun berkas skema di `src/features/agenda/schemas/agendaSchema.ts` dan berkas aksi server di `src/features/agenda/actions/`.
- [YA] Setuju untuk implementasi skema dan server actions: **[ YA / TIDAK ]**

### D. Integrasi Caching `unstable_cache` pada BFF API

- **Deskripsi**: Memperbarui `getManagementAgendaPageData.ts` dan fungsi query agenda dengan pembungkus `unstable_cache` dan invalidasi tag.
- [YA] Setuju untuk integrasi caching: **[ YA / TIDAK ]**

### E. Pembuatan Unit Testing Vitest (100% Mock Terisolasi)

- **Deskripsi**: Menulis suite pengujian unit di `src/features/agenda/__tests__/unit/` untuk memverifikasi alur Bad -> Good path.
- [YA] Setuju untuk pembuatan unit test: **[ YA / TIDAK ]**

---

## 5. Checklist Verifikasi & Kriteria Keberhasilan

- [ ] Pustaka `valibot` dan `uuidv7` terpasang pada `package.json`.
- [ ] Skema database `park_agendas` (dengan `created_by`) tersedia di berkas migrasi.
- [ ] Seluruh aksi CRUD tervalidasi skema Valibot dan menyertakan UUIDv7 sebelum mutasi database.
- [ ] Error validasi formulir teragregasi di banner atas formulir secara bersih.
- [ ] Pengambilan data agenda ter-cache dengan efisien menggunakan `unstable_cache`.
- [ ] Seluruh unit test Vitest berjalan 100% lulus pada terminal.

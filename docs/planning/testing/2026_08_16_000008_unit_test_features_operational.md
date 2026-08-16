# Task 08: Unit Testing Modul Manajemen Jam Operasional (Features/Operational)

## 1. Ringkasan

Menyusun arsitektur dan rangkaian pengujian unit (_unit testing_) untuk modul manajemen operasional (`src/features/operational`). Pengujian difokuskan pada validasi otorisasi peran administrator, integritas mutasi jadwal reguler 7-hari, aturan validasi formulir override jadwal khusus (mode CLOSED, MODIFIED, OPEN), serta mekanisme pembagian halaman (_pagination_) riwayat log operasional dengan alur pengujian terisolasi dari skenario kegagalan (_bad path_) menuju skenario keberhasilan (_good path_).

---

## 2. Struktur Direktori Testing

Pengujian diorganisasikan secara co-located di dalam folder fitur operasional:

- `src/features/operational/__tests__/unit/`
  - `getOperatingHours.test.ts` (Pengujian pengambilan data jadwal 7-hari reguler)
  - `updateOperatingHoursAction.test.ts` (Pengujian pembaruan jam buka/tutup & status hari)
  - `createOverrideLogAction.test.ts` (Pengujian pembuatan catatan override jadwal operasional)
  - `getOperationLogsAction.test.ts` (Pengujian pembagian halaman & perhitungan total data log)

---

## 3. Alur & Skenario Pengujian Unit (Bad Path -> Good Path)

Setiap berkas aksi dan API diuji secara sistematis dengan pendekatan Bad Path menuju Good Path:

### A. Pengujian `getOperatingHours`

1. **Bad Path (Kegagalan Koneksi Database / Data Kosong)**:
   - Database Supabase mengembalikan galat koneksi atau data bernilai null.
   - Ekspektasi: Mengembalikan array kosong secara aman tanpa memicu uncaught exception.
2. **Good Path (Pengambilan 7 Hari Reguler Sukses)**:
   - Database mengembalikan daftar 7 baris hari (Minggu s/d Sabtu) yang terurut berdasarkan indeks hari.
   - Ekspektasi: Mengembalikan array lengkap 7 elemen jadwal operasional reguler.

### B. Pengujian `updateOperatingHoursAction`

1. **Bad Path (Sesi Kedaluwarsa / Pengguna Tidak Terautentikasi)**:
   - Pengguna belum login atau sesi otentikasi bernilai null.
   - Ekspektasi: Menolak aksi dengan pesan sesi telah berakhir.
2. **Bad Path (Akses Ditolak / Bukan Peran Administrator)**:
   - Pengguna terautentikasi memiliki peran selain admin (misal peran warga atau pengguna anonim).
   - Ekspektasi: Menolak aksi dengan pesan larangan hak akses.
3. **Bad Path (Kegagalan Database Update)**:
   - Kueri pembaruan baris jadwal pada Supabase mengalami kegagalan.
   - Ekspektasi: Mengembalikan status gagal beserta rincian pesan galat dari database.
4. **Good Path (Pembaruan Jadwal Sukses)**:
   - Administrator valid memperbarui jam buka/tutup atau status hari operasional.
   - Ekspektasi: Berhasil memperbarui data di database dan memicu invalidasi cache tag status live.

### C. Pengujian `createOverrideLogAction`

1. **Bad Path (Otentikasi & Otorisasi Gagal)**:
   - Sesi pengguna null atau bukan akun administrator.
   - Ekspektasi: Menolak pembuatan override dengan pesan peringatan otorisasi.
2. **Bad Path (Validasi Input Tanggal Kosong)**:
   - Formulir dikirimkan tanpa mengisi tanggal target override.
   - Ekspektasi: Menolak aksi dengan pesan kewajiban mengisi tanggal.
3. **Bad Path (Validasi Mode CLOSED Tanpa Alasan)**:
   - Mode penutupan penuh (CLOSED) dipilih tetapi kolom alasan penutupan kosong atau hanya berisi spasi.
   - Ekspektasi: Menolak aksi dengan pesan kewajiban menyertakan alasan penutupan untuk pengumuman marquee.
4. **Bad Path (Validasi Mode MODIFIED Tanpa Jam Khusus)**:
   - Mode jam khusus (MODIFIED) dipilih tanpa menyertakan jam buka atau jam tutup khusus.
   - Ekspektasi: Menolak aksi dengan pesan kewajiban mengisi rentang jam buka & tutup khusus.
5. **Bad Path (Kegagalan Database Insert)**:
   - Terjadi kegagalan kueri insert pada tabel log operasional.
   - Ekspektasi: Mengembalikan status gagal beserta pesan galat database.
6. **Good Path (Berhasil Membuat Override CLOSED)**:
   - Data tanggal valid, mode CLOSED dengan teks pengumuman lengkap.
   - Ekspektasi: Berhasil menyimpan log dengan status CLOSED dan memicu invalidasi cache.
7. **Good Path (Berhasil Membuat Override MODIFIED)**:
   - Data tanggal valid, mode MODIFIED dengan rentang jam khusus valid.
   - Ekspektasi: Berhasil menyimpan log dengan status MODIFIED dan kolom jam khusus terisi.
8. **Good Path (Berhasil Membuat Override OPEN)**:
   - Data tanggal valid, mode OPEN untuk memaksa buka di hari libur.
   - Ekspektasi: Berhasil menyimpan log dengan status OPEN.

### D. Pengujian `getOperationLogsAction`

1. **Bad Path (Kueri Database Gagal / Data Null)**:
   - Kueri tabel log operasional mengalami galat atau mengembalikan data null.
   - Ekspektasi: Mengembalikan objek default dengan daftar log kosong, total count 0, dan total pages 1.
2. **Good Path (Pengambilan Halaman Pertama & Perhitungan Range)**:
   - Mengambil data halaman pertama dengan ukuran default 10 baris per halaman.
   - Ekspektasi: Menghitung rentang indeks kueri dari 0 sampai 9 dan mengembalikan data terurut dari yang terbaru.
3. **Good Path (Kalkulasi Total Halaman Pagination)**:
   - Basis data mengembalikan total 25 baris data dengan batasan 10 baris per halaman.
   - Ekspektasi: Menghasilkan `totalPages = 3` dan `currentPage = 1`.

---

## 4. Rencana Refaktor Kode & Kotak Persetujuan Review Pengguna

Bagian ini mendokumentasikan evaluasi refaktor kode agar pengguna dapat melakukan tinjauan terlebih dahulu sebelum eksekusi dilakukan:

### A. Evaluasi Pemisahan Helper Validasi Input Override

- **Deskripsi Perubahan**: Mengekstraksi fungsi validator input `validateOverrideInput` menjadi helper terisolasi jika diperlukan, atau mempertahankan validasi terpadu di dalam Server Action `createOverrideLogAction`.
- **Alasan & Manfaat**: Memudahkan pengujian validasi input tanpa harus melakukan mock penuh terhadap objek klien Supabase.
- **Kotak Persetujuan Review Pengguna**:
  - [YA] Setuju untuk ekstraksi fungsi validator `validateOverrideInput`: **[ YA / TIDAK ]**

---

## 5. Checklist Verifikasi & Kriteria Keberhasilan

- [ ] Berkas-berkas unit test tersusun rapi di direktori `src/features/operational/__tests__/unit/`.
- [ ] Seluruh skenario Bad Path pada 4 berkas aksi/API teruji dengan deskripsi bahasa Inggris.
- [ ] Seluruh skenario Good Path teruji mencakup mode CLOSED, MODIFIED, OPEN, dan pagination.
- [ ] Seluruh pengujian berjalan 100% lulus (_all tests pass_) pada eksekusi terminal.

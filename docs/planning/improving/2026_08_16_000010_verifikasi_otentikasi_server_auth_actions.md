# Task 10: Penguatan Otentikasi & Otorisasi Server Actions (Server Auth Actions)

## 1. Ringkasan

Menyusun rencana penguatan keamanan dan verifikasi hak akses pada seluruh berkas _Server Action_ (`src/features/*/actions/`) berdasarkan standar keamanan Vercel (_Vercel React Best Practices - server-auth-actions_). Setiap _Server Action_ wajib memperlakukan proteksi layaknya _API Route_ dengan secara mandiri mengevaluasi validitas sesi otentikasi pengguna (`supabase.auth.getUser()`) serta verifikasi eksplisit peran administrator (`role === 'admin'`) sebelum mengeksekusi mutasi data pada basis data.

---

## 2. Rincian Peningkatan Keamanan Server Actions

### A. Evaluasi Sesi & Peran Administrasi Independen

- **Prinsip**: Jangan pernah mengasumsikan Server Action aman hanya karena dipanggil dari komponen internal dashboard. Setiap Server Action harus melakukan verifikasi otentikasi mandiri di sisi server.
- **Penerapan pada Berkas Server Action**:
  1. `updateParkStatusAction`: Menambahkan validasi parameter awal (cheap check) dan memastikan pengecekan sesi user serta peran admin dilakukan secara ketat sebelum mutasi log operasional.
  2. `createOverrideLogAction`: Mempertahankan pemeriksaan ganda yaitu keberadaan sesi aktif (`!user`) dan peranan akun (`userRole !== 'admin'`).
  3. `updateOperatingHoursAction`: Mempertahankan pemeriksaan otentikasi dan otorisasi admin sebelum pembaruan baris jam reguler.
  4. `logoutAction`: Memastikan proses penghapusan sesi (`signOut`) mengeksekusi pembersihan cookie otentikasi secara aman.

---

## 3. Rangkaian Skenario Testing Otorisasi (Bad Path -> Good Path)

Pengujian unit pada modul otorisasi _Server Action_ memverifikasi bahwa akses tanpa otorisasi ditolak secara konsisten:

### A. Pengujian `updateParkStatusAction` (Otorisasi Akses Admin)

1. **Bad Path (Permintaan Tanpa Sesi / Anonim)**:
   - Memanggil fungsi dari pengguna yang belum login.
   - Ekspektasi: Menolak mutasi dengan pesan penolakan akses.
2. **Bad Path (Permintaan dari Akun Non-Admin / Peran Warga)**:
   - Memanggil fungsi menggunakan sesi pengguna ber-role `warga`.
   - Ekspektasi: Menolak mutasi dengan pesan perlunya peran administrator.
3. **Good Path (Permintaan dari Akun Administrator Valid)**:
   - Memanggil fungsi menggunakan sesi akun administrator terverifikasi.
   - Ekspektasi: Berhasil memperbarui status operasional taman dan memicu revalidasi jalur rute.

---

## 4. Rencana Refaktor Kode & Kotak Persetujuan Review Pengguna

Bagian ini mendokumentasikan usulan penataan keamanan Server Action agar pengguna dapat melakukan tinjauan terlebih dahulu sebelum eksekusi dilakukan:

### A. Penguatan Validasi Dini & Guard Clause pada `updateParkStatusAction.ts`

- **Deskripsi Perubahan**: Membawa validasi parameter status sebelum pemanggilan otentikasi serta memastikan _guard clause_ otorisasi admin mengembalikan pesan galat standar yang konsisten.
- **Alasan & Manfaat**: Memenuhi aturan _server-auth-actions_ Vercel secara komprehensif sekaligus menjaga performa eksekusi fungsi.
- **Kotak Persetujuan Review Pengguna**:
  - [ ] Setuju untuk penguatan otorisasi server-auth-actions: **[ YA / TIDAK ]**

---

## 5. Checklist Verifikasi & Kriteria Keberhasilan

- [ ] Seluruh Server Action yang memerlukan otorisasi terlindungi oleh pengecekan sesi dan peran admin secara mandiri.
- [ ] Pengujian unit mencakup skenario penolakan anonim, penolakan non-admin, dan kelulusan admin.
- [ ] Seluruh pengujian unit berjalan 100% lulus (_all tests pass_) pada eksekusi terminal.

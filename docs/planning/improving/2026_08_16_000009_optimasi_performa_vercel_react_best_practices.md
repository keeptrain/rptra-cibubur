# Task 09: Peningkatan Performa Arsitektur & Best Practices Vercel (Improving)

## 1. Ringkasan

Menyusun rencana perbaikan arsitektur dan peningkatan performa (_improving_) menyeluruh pada modul-modul aplikasi Next.js mengacu pada standar rekayasa Vercel (_Vercel React Best Practices_). Peningkatan difokuskan pada 3 pilar utama: eliminasi _waterfall_ melalui validasi sinkron dini (_cheap condition before await_), optimasi _re-render_ komponen interaktif berbasis memoization terisolasi, serta penerapan rendering kondisional berbasis ternary eksplisit untuk mencegah anomali _falsy render_ pada pohon DOM.

---

## 2. Rincian Pilar Peningkatan Arsitektur (Improving Pillars)

### A. Pilar 1: Validasi Sinkron Dini Sebelum Operasi Asinkron (`async-cheap-condition-before-await`)

- **Tujuan**: Mencegah inisialisasi koneksi cookie (`await cookies()`) dan _network roundtrip_ ke server Supabase ketika input pengguna tidak valid.
- **Penerapan pada Modul Operasional & Autentikasi**:
  1. `createOverrideLogAction`: Memindahkan fungsi validator input sinkron ke baris paling awal fungsi sebelum pembacaan cookie atau otentikasi sesi.
  2. `updateOperatingHoursAction`: Menambahkan validasi sinkron dini untuk parameter jam buka, jam tutup, dan indeks hari sebelum pemanggilan koneksi cookie server.
  3. `sendOtpAction` & `verifyOtpAction`: Mempertahankan validasi format domain email dan 8-digit OTP sebelum inisialisasi basis data.

### B. Pilar 2: Isolasi Render Komponen & Pencegahan Inline Component (`rerender-memo` & `rerender-no-inline-components`)

- **Tujuan**: Membatasi cakupan _re-render_ akibat interaksi input pengguna pada antarmuka daftar (_list/grid interfaces_).
- **Penerapan pada Komponen Interaktif**:
  1. `RegularHoursEditor`: Mengisolasi kartu hari menjadi sub-komponen terpisah di luar fungsi utama dengan membungkusnya menggunakan memoization. Perubahan teks jam pada satu hari hanya merender kartu bersangkutan tanpa memicu _re-render_ pada 6 kartu hari lainnya (_Zero Unnecessary Re-renders_).
  2. Memastikan tidak ada deklarasi komponen bersarang (_nested inline component definitions_) di dalam badan fungsi komponen lain yang dapat memicu re-kreasi instansiasi fungsi pada setiap siklus render.

### C. Pilar 3: Rendering Kondisional Eksplisit (`rendering-conditional-render`)

- **Tujuan**: Mencegah _unintended rendering_ angka nol (`0`) atau nilai _falsy_ pada pohon DOM React ketika mengevaluasi panjang array atau nilai numerik.
- **Penerapan pada Tampilan Antarmuka**:
  1. `OperationLogsHistoryTable`: Mengganti pola operator logika ganda menjadi pola ternary eksplisit untuk penayangan pagination dan fallback tabel kosong.
  2. `CloseParkForm`: Menggunakan percabangan ternary eksplisit bertingkat untuk status buka, tutup darurat, dan tutup reguler.
  3. `ParkLiveStatus`: Menjamin penayangan marquee pengumuman hanya dieksekusi ketika data teks pengumuman valid dan tidak kosong.

---

## 3. Rangkaian Skenario Testing Perbaikan (Bad Path -> Good Path)

Setiap fungsi yang ditingkatkan diuji untuk memastikan validasi dini bekerja secara efektif sebelum operasi jaringan asinkron:

### A. Pengujian `createOverrideLogAction` (Validasi Dini)

1. **Bad Path (Input Tidak Valid Tanpa Alokasi Cookie)**:
   - Mengirimkan input tanggal kosong atau mode CLOSED tanpa catatan alasan.
   - Ekspektasi: Langsung mengembalikan status gagal seketika tanpa mengeksekusi pemanggilan sesi otentikasi.
2. **Good Path (Input Valid Lanjut ke Otentikasi & Database)**:
   - Mengirimkan data override yang lengkap dan valid.
   - Ekspektasi: Memproses otentikasi admin dan berhasil melakukan mutasi data di database.

### B. Pengujian `updateOperatingHoursAction` (Validasi Dini)

1. **Bad Path (Input Jam Kosong / Indeks Hari di Luar 0-6)**:
   - Mengirimkan indeks hari tidak valid atau string jam kosong.
   - Ekspektasi: Menolak aksi di tahap validasi awal.
2. **Good Path (Input Valid & Akun Admin)**:
   - Mengirimkan data jam buka/tutup valid dari akun administrator.
   - Ekspektasi: Berhasil memperbarui jadwal reguler di database.

---

## 4. Rencana Refaktor Kode & Kotak Persetujuan Review Pengguna

Bagian ini mendokumentasikan usulan penataan kode agar pengguna dapat melakukan tinjauan terlebih dahulu sebelum eksekusi dilakukan:

### A. Rekomposisi Urutan Validasi pada `createOverrideLogAction.ts` & `updateOperatingHoursAction.ts`

- **Deskripsi Perubahan**: Memindahkan pemanggilan `validateOverrideInput` dan validasi input jam reguler ke baris pertama fungsi, tepat sebelum `const cookieStore = await cookies();`.
- **Alasan & Manfaat**: Memenuhi aturan performa kritis Vercel (`async-cheap-condition-before-await`) sehingga eksekusi input invalid menjadi instan dan menghemat beban server (_zero wasted asynchronous overhead_).
- **Kotak Persetujuan Review Pengguna**:
  - [YA] Setuju untuk rekomposisi validasi dini pada Server Actions: **[ YA / TIDAK ]**

---

## 5. Checklist Verifikasi & Kriteria Keberhasilan

- [x] Seluruh Server Action menjalankan validasi input sinkron sebelum pemanggilan fungsi asinkron (`await`).
- [x] Seluruh komponen interaktif terbebas dari deklarasi komponen bersarang dan memanfaatkan isolasi render memoization.
- [x] Seluruh penayangan bersyarat memanfaatkan sintaks ternary eksplisit.
- [x] Seluruh pengujian unit (57 passed in 11 test files) berjalan 100% lulus (_all tests pass_) pada eksekusi terminal.

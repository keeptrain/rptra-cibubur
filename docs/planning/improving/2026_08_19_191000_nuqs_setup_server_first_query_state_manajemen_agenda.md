# Task 12: Perancangan Arsitektur Integrasi Nuqs & Server-First URL Query State (Manajemen Agenda)

## 1. Ringkasan

Dokumen ini merinci perencanaan arsitektur menyeluruh untuk integrasi pustaka `nuqs` (_Type-safe search params state manager_) pada modul Manajemen Agenda Kegiatan RPTRA Cibubur. Implementasi berfokus pada sinkronisasi _state_ filter antarmuka berbasis URL query parameter yang _type-safe_, penanganan _server-first rendering_ di tingkat React Server Components (RSC), eliminasi risiko _hydration mismatch_, efisiensi memori, serta strategi _clean default URL_ yang elegan dan ramah _bookmark/shareable link_.

---

## 2. Rincian Pilar Arsitektur & Spesifikasi Fitur

### A. Pustaka Nuqs & Konfigurasi Adapter Root Layout

- **Pustaka Inti (`nuqs`)**: Pustaka berukuran sangat kecil (di bawah 3 KB) yang menghubungkan URL query parameters dengan React Server Components dan Client Components secara _type-safe_.
- **Integrasi Adapter**: Membungkus pohon komponen aplikasi utama pada berkas root layout (`src/app/layout.tsx`) menggunakan komponen pembungkus `NuqsAdapter` dari modul `nuqs/adapters/next/app`.
- **Manfaat**: Memastikan sinkronisasi status navigasi browser, _shallow routing_, serta riwayat penjelajahan (_history stack_) berjalan optimal di seluruh rute Next.js App Router.

### B. Parser Parameter Server-First (`agendaParams.ts`)

- **Tujuan**: Mendefinisikan kontrak parameter URL yang valid, aman dari masukan tidak sah, dan terpusat (_Single Source of Truth_).
- **Lokasi Berkas**: Ditempatkan secara modular pada `src/features/agenda/params/agendaParams.ts`.
- **Spesifikasi Parameter Terkelola**:
  1. `status`: Nilai status agenda terdefinisi ('ALL', 'UPCOMING', 'COMPLETED', 'PENDING') dengan nilai bawaan 'ALL'.
  2. `month`: Format string dua digit (01 hingga 12) dengan nilai bawaan bulan berjalan saat ini WIB.
  3. `year`: Format string empat digit (misal '2026') dengan nilai bawaan tahun berjalan saat ini WIB.
  4. `q`: Kata kunci pencarian judul, lokasi, atau penyelenggara dengan nilai bawaan string kosong.
- **Cache Parsing Sisi Server**: Menggunakan fungsi pembantu `createSearchParamsCache` dari modul server `nuqs` untuk mengurai parameter URL secara instan dan aman di tingkat Server Component (`ManagementAgendaPage.tsx`).

### C. Strategi URL Bersih (_Clean Default URL_)

- **Kebijakan URL**: Ketika pengguna pertama kali mengakses halaman Manajemen Agenda (`/manajemen-agenda`), URL dipertahankan tetap bersih tanpa penambahan query string bawaan yang panjang.
- **Mekanisme Otomatis**:
  - Konfigurasi parameter menggunakan perilaku _clear on default_.
  - Parameter hanya akan ditambahkan atau diubah pada URL ketika pengguna melakukan interaksi eksplisit (misal memilih tab 'PENDING', mengganti bulan, atau mengetik pencarian).
  - Mengembalikan filter ke posisi semula secara otomatis membersihkan parameter dari URL.
- **Dampak UX**: Tampilan URL terlihat rapi dan profesional, sekaligus tetap 100% _shareable_ saat dibagikan ke sesama pengelola RPTRA.

### D. Refaktorisasi State Klien & Pengendalian Debounce Pencarian

- **Refaktorisasi Komponen Klien**: Menggantikan penggunaan `useState` terpisah pada komponen `AgendaListSection.tsx` dengan hook `useQueryState` dari `nuqs`.
- **Pengendalian Input Pencarian (_Debounce_)**:
  - Menerapkan penundaan (_debounce_) pada input pencarian teks agar tidak memicu pembaruan URL yang berlebihan pada setiap ketukan karakter papan ketik.
  - Memastikan transisi penyaringan data terasa mulus dan responsif di seluruh perangkat mobile maupun desktop.

---

## 3. Tahapan Implementasi Terstruktur

### Tahap 1: Instalasi & Konfigurasi Fondasi

1. Menambahkan paket pustaka `nuqs` ke dalam proyek menggunakan pengelola paket pnpm.
2. Memasang komponen pembungkus `NuqsAdapter` pada root layout aplikasi.

### Tahap 2: Definisi Kontrak Parameter & Integrasi Server Component

1. Membuat berkas modul `agendaParams.ts` yang mendefinisikan skema parsing parameter URL secara _type-safe_.
2. Memperbarui Server Component halaman Manajemen Agenda untuk membaca dan mengurai `searchParams` menggunakan parser cache server.
3. Meneruskan parameter yang terurai ke komponen konten manajemen agenda.

### Tahap 3: Refaktorisasi Komponen Antarmuka Klien

1. Mengintegrasikan hook `useQueryState` pada kontrol tab metrik, dropdown bulan, dropdown tahun, dan kolom pencarian.
2. Memverifikasi perilaku _clean default URL_ dan fungsionalitas tombol navigasi _Back/Forward_ pada browser.

### Tahap 4: Verifikasi & Uji Kualitas

1. Menjalankan pemeriksaan kompilasi TypeScript untuk memastikan kepatuhan tipe 100%.
2. Menjalankan rangkaian pengujian otomatis (_unit tests_) berbasis Vitest.

---

## 4. Alur Pengujian (_Testing Strategy: Bad Path -> Good Path_)

### Skenario 1: Penguraian Parameter URL Masukan Tidak Sah (_Bad Path_)

- **Kondisi Masukan**: Pengguna mengakses URL dengan nilai parameter acak atau salah format (misal status bernilai 'UNKNOWN', bulan bernilai '99', atau format tahun tidak valid).
- **Hasil yang Diharapkan**: Parser `nuqs` secara otomatis menolak nilai tidak sah tersebut dan mengembalikan nilai fallback default yang aman tanpa menimbulkan _runtime crash_ ataupun _hydration mismatch error_.

### Skenario 2: Navigasi URL Bersih Saat Pemuatan Awal (_Good Path_)

- **Kondisi Masukan**: Pengguna membuka halaman `/manajemen-agenda` secara langsung tanpa parameter query.
- **Hasil yang Diharapkan**: Halaman merender data bulan berjalan secara presisi, URL tetap bersih tanpa query string tambahan, dan seluruh indikator metrik terhitung akurat.

### Skenario 3: Interaksi Pengguna & Sinkronisasi Tautan (_Good Path_)

- **Kondisi Masukan**: Pengguna mengklik tab 'Perlu Konfirmasi' dan memilih bulan 'September'.
- **Hasil yang Diharapkan**: URL secara instan tersinkronisasi menjadi `/manajemen-agenda?status=PENDING&month=09`, daftar agenda terfilter secara tepat, dan ketika tautan tersebut disalin ke jendela penyamaran (_incognito_), halaman langsung membuka filter yang persis sama.

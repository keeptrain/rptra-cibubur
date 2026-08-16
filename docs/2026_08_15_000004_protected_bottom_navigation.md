# Task 04: Bottom Navigation Bar Terproteksi pada Layout

## 1. Ringkasan

Membangun komponen navigasi bilah bawah (Bottom Navigation Bar) yang dimuat secara terpusat pada tata letak rute terproteksi, memungkinkan navigasi instan antar menu dashboard tanpa perlu melakukan scroll ke atas layar atau memuat ulang (reload) halaman secara penuh, dengan isolasi re-render yang ketat serta animasi transisi yang halus dan nyaman bagi pengguna perangkat bergerak (mobile-first).

---

## 2. Karakteristik & Penempatan Komponen

### A. Lokasi Pemasangan Layout Terisolasi

- Navigasi bilah bawah hanya dipasang di dalam berkas layout grup rute terproteksi.
- Komponen ini otomatis tidak akan pernah muncul di halaman beranda publik, halaman agenda umum, halaman formulir login, ataupun halaman kesalahan (not-found).
- Area konten utama di dalam layout diberikan ruang bantalan bawah (bottom padding) yang cukup agar konten halaman paling bawah tidak tertutup oleh bilah navigasi.

### B. Daftar Menu Navigasi

1. **Menu Beranda Dashboard**: Menuju halaman ringkasan akun, statistik layanan, dan jam operasional.
2. **Menu Pengajuan Kunjungan**: Menuju formulir dan daftar riwayat permohonan kunjungan rombongan.
3. **Menu Agenda Kegiatan**: Menuju jadwal dan kalender kegiatan warga terdaftar.
4. **Menu Profil & Pengaturan**: Menuju ringkasan informasi akun dan opsi keluar sistem (logout).

---

## 3. Desain Antarmuka, Pengalaman Pengguna, & Isolasi Re-render

### A. Kenyamanan Sentuhan Jempol (Touch Ergonomics)

- Seluruh tombol navigasi memiliki area sentuh yang nyaman dan proporsional untuk ditekan dengan satu tangan.
- Ikon dan label teks menu disusun secara vertikal ringkas dengan keterbacaan kontras tinggi.

### B. Transisi & Indikator Status Aktif (Micro-Interactions)

- Menu yang sedang aktif ditandai dengan perubahan warna aksen yang jelas, pembesaran ikon secara halus, serta indikator visual di bawah ikon menu.
- Transisi pergantian status aktif menggunakan durasi animasi sedang yang lembut dan tidak menyilaukan mata.
- Bilah navigasi menggunakan efek latar belakang semi-transparan (glassmorphism) yang menyatu dengan palet warna hijau alami (Emerald, Soft Mint, dan Dark Forest).

### C. Isolasi Re-render & Optimalisasi Performa (Re-render Isolation)

- **Komponen Klien Terisolasi (Leaf Component)**: Komponen navigasi bawah diisolasi sebagai komponen klien khusus di tingkat paling bawah (leaf node) tanpa mengubah berkas layout utama menjadi komponen klien. Layout utama tetap beroperasi sebagai Server Component murni.
- **Isolasi Hook Rute**: Pengecekan rute aktif menggunakan hook navigasi diletakkan terisolasi rapat di dalam komponen bilah bawah, sehingga perubahan status rute hanya memicu re-render visual pada bilah navigasi dan tidak membebani komponen halaman utama.
- **Bebas State Bersama di Level Atas**: Tidak menyimpan state posisi menu aktif di level induk/layout untuk menjaga konsumsi memori dan siklus render tetap minimal.

---

## 4. Checklist Verifikasi

- [ ] Layout utama tetap beroperasi sebagai Server Component murni.
- [ ] Komponen bilah bawah terisolasi secara mandiri dan mengelola status rute aktifnya sendiri.
- [ ] Navigasi bilah bawah terpasang stabil di bagian bawah layar pada seluruh halaman terproteksi.
- [ ] Perpindahan antar halaman di dalam area terproteksi berjalan instan tanpa reload halaman penuh.
- [ ] Konten di bagian bawah halaman tidak terpotong atau tertutup oleh bilah navigasi.
- [ ] Menu yang sedang aktif menampilkan status visual yang tepat sesuai rute URL saat ini.
- [ ] Navigasi tidak muncul di halaman beranda publik maupun halaman login.
- [ ] Animasi perpindahan status menu terasa responsif, mulus, dan nyaman digunakan.

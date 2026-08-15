# Task 03: Arsitektur Dashboard dan Proteksi Rute

## 1. Ringkasan

Menyiapkan rute terproteksi untuk area dashboard setelah login berhasil, menyusun tata letak navigasi berbasis peran akun (Role-Based Access Control), dan mengoptimalkan tampilan dashboard untuk kenyamanan penggunaan di perangkat mobile.

---

## 2. Struktur Proteksi Halaman (Middleware & Server Auth)

### A. Mekanisme Verifikasi Sesi

- Middleware Next.js memeriksa keberadaan token sesi aktif pada setiap permintaan ke rute yang diawali dengan `/dashboard`.
- Jika sesi tidak ditemukan atau kedaluwarsa, pengguna secara otomatis diarahkan kembali ke halaman login dengan parameter rute asal untuk mempermudah alur kembali.
- Jika pengguna yang sudah memiliki sesi aktif mencoba mengakses halaman login, sistem langsung mengarahkan mereka ke halaman dashboard.

### B. Segmentasi Peran Pengguna (Role-Based Views)

- **Role Warga / Pengunjung**:
  - Menampilkan ringkasan riwayat pengajuan rencana kunjungan rombongan yang pernah dibuat dengan status verifikasinya (Menunggu, Disetujui, Ditolak, atau Selesai).
  - Menampilkan daftar agenda warga yang telah disimpan atau ditandai.
- **Role Pengelola / Admin RPTRA**:
  - Menampilkan metrik operasional harian (Total Pengajuan Kunjungan Baru, Status Operasional Taman, dan Agenda Terdekat).
  - Akses cepat ke panel persetujuan kunjungan rombongan dan manajemen jadwal agenda kegiatan.

---

## 3. Tata Letak Antarmuka (Mobile Design First)

### A. Navigasi Ponsel (Mobile Navigation)

- Di layar perangkat bergerak (ponsel pintar), navigasi utama ditempatkan pada bilah bawah (Bottom Navigation Bar) yang mudah dijangkau satu tangan atau menu drawer samping yang ringan.
- Elemen penting seperti tombol Keluar Akun (Logout) dan Pengaturan Profil diletakkan di tempat yang mudah ditemukan tanpa membebani layar utama.

### B. Tata Letak Kartu Ringkasan

- Menggunakan susunan vertikal bertumpuk di layar kecil yang melebar menjadi grid multi-kolom secara responsif di layar tablet dan desktop.
- Mengadopsi palet warna natural yang konsisten (Deep Emerald dan Soft Mint) agar pengalaman visual selaras dengan halaman publik beranda.

---

## 4. Checklist Verifikasi

- [ ] Middleware proteksi rute berjalan efisien tanpa menimbulkan loop pengalihan halaman.
- [ ] Pengguna role warga hanya dapat melihat data pribadi milik mereka sendiri.
- [ ] Pengguna role pengelola dapat mengakses ringkasan data operasional publik.
- [ ] Navigasi mobile responsif, mudah dioperasikan dengan jempol, dan bebas hambatan visual.
- [ ] Tombol logout membersihkan cookie sesi dengan sempurna dan mengembalikan pengguna ke halaman beranda.

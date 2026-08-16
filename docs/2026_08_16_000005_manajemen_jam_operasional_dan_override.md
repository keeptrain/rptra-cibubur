# Task 05: Manajemen Jam Operasional Reguler & Override Jadwal Khusus

## 1. Ringkasan

Membangun modul manajemen jam operasional terpusat bagi administrator RPTRA Cibubur yang memungkinkan pengaturan jadwal reguler mingguan 7-hari, penetapan jadwal pengecualian khusus (override schedule) dengan 3 mode fleksibel (Full Closed, Custom Hours / MODIFIED, dan Force Open), serta penayangan riwayat catatan operasional dengan sistem pagination 10 data terakhir secara bersih, terisolasi, dan berorientasi mobile-first.

---

## 2. Struktur Modul & Hirarki Komponen

### A. Komponen Halaman Pengaturan Operasional (`/jam-operasional`)

- **Server Guard & Validasi Hak Akses**: Halaman hanya dapat diakses oleh akun dengan peran administrator. Akses selain admin akan dialihkan kembali ke beranda dashboard.
- **Header & Navigasi Balik**: Menyediakan tombol navigasi kembali ke halaman dashboard atau menu utama beserta identitas visual RPTRA.

### B. Bagian 1: Editor Jadwal Reguler 7-Hari (Mingguan)

- Mengelola data 7 baris permanen (Minggu sampai Sabtu) dari basis data.
- Setiap hari memiliki kendali waktu buka (open time), waktu tutup (close time), serta tombol alih (toggle switch) status beroperasi/libur reguler.
- Penyesuaian jadwal hari ini secara otomatis memvalidasi apakah penutupan memerlukan catatan alasan darurat.
- Tombol simpan perubahan yang mengeksekusi pembaruan data secara aman dan memicu pembersihan cache live status beranda.

### C. Bagian 2: Modal & Formulir Override Jadwal Operasional Mendatang

- Menyediakan tombol pemicu untuk menambahkan jadwal pengecualian pada tanggal tertentu di masa depan.
- **Pilihan 3 Mode Override**:
  1. **Mode Tutup Penuh (Full Closed)**: Menutup total operasional pada tanggal target. Wajib mengisi kolom catatan/alasan penutupan yang akan disiarkan ke teks pengumuman berjalan (running text marquee) publik.
  2. **Mode Jam Khusus (Custom Hours / MODIFIED)**: Mengatur jam buka dan jam tutup khusus pada tanggal target. Catatan alasan bersifat opsional, dan sistem publik akan menyesuaikan teks informasi jam beroperasi secara dinamis.
  3. **Mode Buka Penuh (Force Open)**: Membuka taman secara penuh pada tanggal yang semestinya libur reguler.
- Validasi formulir dilakukan di sisi klien dan server sebelum disimpan ke tabel log operasional.

### D. Bagian 3: Tabel Riwayat Log Operasional (Pagination 10 Terakhir)

- Menampilkan daftar riwayat perubahan operasional dan pengecualian tanggal.
- Data disajikan dengan batasan 10 baris per halaman untuk menghemat beban render dan penggunaan memori pada perangkat mobile.
- Kolom tabel mencakup: Tanggal Pengecualian, Mode Status, Jam Khusus (jika ada), Catatan Pengumuman, dan Waktu Pencatatan.
- Navigasi pagination (Sebelumnya / Selanjutnya) yang intuitif dan responsif.

---

## 3. Desain Antarmuka, Pengalaman Pengguna, & Keterbacaan

### A. Tata Letak Mobile-First & Tipografi Standar

- Setiap baris hari pada jadwal mingguan ditampilkan dalam bentuk kartu ringkas bergaris batas halus tanpa menggunakan gaya neubrutalist tebal.
- Penggunaan ukuran font mengacu penuh pada standar tipografi yang jelas dan mudah dibaca pada layar sentuh.
- Bidang input jam (time picker) dan tanggal (date picker) dioptimalkan untuk input sentuhan jempol.

### B. Sinkronisasi Status Publik & Running Text

- Penutupan atau penyesuaian jam khusus langsung disinkronkan ke komponen status operasional di halaman beranda publik.
- Jika terdapat pengumuman catatan penutupan aktif, teks pengumuman disiarkan melalui animasi marquee teks berjalan tanpa memotong ruang tata letak utama.

---

## 4. Checklist Verifikasi

- [ ] Halaman jam operasional hanya dapat diakses oleh pengguna dengan peran admin terverifikasi.
- [ ] Editor jadwal 7-hari menampilkan seluruh hari (Minggu s/d Sabtu) dengan jam buka/tutup dan toggle aktif.
- [ ] Perubahan jam reguler berhasil diperbarui di basis data tanpa menambah atau mengurangi total 7 baris data.
- [ ] Formulir override mendukung pemilihan tanggal masa depan dan pemilihan 3 mode operasional (CLOSED, MODIFIED, OPEN).
- [ ] Validasi catatan alasan berjalan wajib pada mode CLOSED dan opsional pada mode MODIFIED.
- [ ] Riwayat log operasional menampilkan 10 data terbaru dengan tombol pagination yang berfungsi lancar.
- [ ] Status operasional dan pengumuman marquee di halaman publik langsung terbarui setelah admin menyimpan perubahan.
- [ ] Tampilan antarmuka nyaman, rapi, dan responsif pada perangkat seluler maupun desktop.

# Task 02: Sistem Login Passwordless dengan 8-Digit OTP

## 1. Ringkasan

Membangun alur otentikasi login tanpa kata sandi (passwordless) menggunakan email dan kode OTP 8 digit numerik yang dikirimkan langsung ke email pemohon, dengan jaminan konfirmasi pengiriman sukses dari penyedia email sebelum pengguna dialihkan ke langkah verifikasi kode OTP, masa berlaku 10 menit, dan pengalihan otomatis ke dashboard setelah verifikasi berhasil.

---

## 2. Alur Kerja Sistem (Step-by-Step Flow)

### Tahap 1: Penginputan Email & Validasi

1. Pengguna membuka halaman login pada rute auth.
2. Pengguna memasukkan alamat email pada input form.
3. Sistem memvalidasi format email dan memastikan domain adalah `@gmail.com`.
4. Jika domain bukan Gmail, sistem menampilkan pesan peringatan langsung di bawah input form tanpa reload halaman dan proses pengiriman dibatalkan.

### Tahap 2: Pembuatan Kode & Jaminan Pengiriman Email Sukses

1. Sistem server menghasilkan angka acak 8 digit numerik unik (rentang 10000000 - 99999999).
2. Jika terdapat kode OTP aktif sebelumnya untuk email yang sama, sistem menandai kode lama sebagai tidak berlaku (invalidated).
3. Sistem menyimpan kode baru ke dalam tabel unlogged database dengan status pending dan waktu kedaluwarsa tepat 10 menit ke depan.
4. **Verifikasi Pengiriman dari Penyedia Layanan Email**:
   - Sistem memanggil API penyedia layanan email (seperti Resend / SMTP / Supabase Mailer) untuk mengirimkan template email resmi berisi kode 8 digit.
   - **Kondisi Berhasil**: Server menunggu respon sukses (status 200 / delivered acknowledgment) dari penyedia email. Hanya setelah respon sukses diterima secara pasti, sistem memperbarui status rute URL dan memindahkan tampilan antarmuka (UI) ke langkah kedua (Input OTP).
   - **Kondisi Gagal**: Jika terjadi kegagalan pengiriman dari penyedia email (seperti network error, quota exceeded, atau invalid recipient), server membatalkan baris OTP yang baru dibuat, antarmuka tetap berada di formulir email (Step 1), tombol kembali aktif, dan sistem menampilkan pesan kesalahan jelas: _"Gagal mengirimkan kode ke email Anda, silakan periksa alamat email atau coba beberapa saat lagi."_

### Tahap 3: Verifikasi Kode OTP & Sesi Login

1. Pengguna memasukkan kode 8 digit yang diterima dari inbox email.
2. Sistem server mencocokkan kode OTP dan email pada database:
   - Memeriksa apakah waktu saat verifikasi masih dalam rentang 10 menit masa aktif.
   - Memeriksa apakah kode belum pernah digunakan sebelumnya.
   - Membatasi batas maksimal kesalahan input (maksimal 3 kali percobaan salah per sesi kode).
3. Jika kode valid:
   - Tandai kode OTP sebagai telah digunakan (used).
   - Jika email belum terdaftar di tabel profil, buatkan profil warga baru secara otomatis (Auto Sign-Up).
   - Buatkan sesi login terenkripsi menggunakan token autentikasi (cookie session).
   - Arahkan pengguna (redirect) ke rute halaman dashboard utama.
4. Jika kode salah atau kedaluwarsa:
   - Tampilkan pesan kesalahan informatif dan berikan tombol untuk meminta kirim ulang kode baru dengan jeda hitung mundur (cooldown timer 60 detik).

---

## 3. Pertimbangan Desain & Pengalaman Pengguna (Mobile-First)

- **Feedback Loading Pengiriman**: Saat proses pengiriman email berlangsung, tombol email menampilkan indikator status loading agar pengguna tahu email sedang diproses kirim ke inbox mereka.
- **Ukuran Area Sentuh (Touch Target)**: Tombol aksi utama (Kirim Kode & Verifikasi) memiliki tinggi minimal 48px agar nyaman ditekan oleh jempol di layar ponsel.
- **Keyboard Numerik Otomatis**: Input kode OTP pada perangkat mobile wajib memunculkan papan ketik angka (virtual numeric keypad) secara otomatis untuk mempermudah pengetikan.
- **Pencegahan Spam & Brute Force**: Menggunakan pembatasan laju pengiriman (rate limiting) maksimal 3 kali permintaan kirim ulang dalam periode 10 menit per alamat email.

---

## 4. Checklist Verifikasi

- [ ] Validasi domain email `@gmail.com` berjalan lancar di sisi server dan client.
- [ ] Respon sukses dari penyedia layanan email diverifikasi secara ketat sebelum antarmuka beralih ke langkah input OTP.
- [ ] Jika pengiriman email gagal, pengguna tetap berada di formulir email dan menerima pesan kesalahan informatif.
- [ ] Kode 8 digit terbuat secara aman dan tersimpan di tabel unlogged dengan masa kedaluwarsa 10 menit.
- [ ] Percobaan salah dibatasi maksimal 3 kali untuk keamanan.
- [ ] Redirect ke dashboard berhasil setelah verifikasi kode valid.
- [ ] Sesi login tersimpan dengan aman pada cookie browser.

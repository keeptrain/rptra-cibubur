# Buatkan planning / issue secara high-level

## 1. Spesifikasi Teknologi

- Framework: Next.js (App Router)
- Bahasa: TypeScript
- Styling: Vanilla CSS & Tailwind CSS (Harmoni Emerald, Mint, & Dark Forest)
- Database & Backend: Supabase PostgreSQL (Auth + Row Level Security)
- Package Manager: pnpm

---

## 2. Aturan & Standar Dokumentasi

- Tanpa menyertakan contoh baris kode dalam dokumen perancangan arsitektur.
- Penamaan file menggunakan format tanggal berurut seperti (`YYYY_MM_DD_HHMMSS_nama_tugas.md`).
- Struktur terbagi ke dalam tahapan yang tuntas dan mudah dipahami oleh programmer junior / cheap model dengan context parameter kecil.
- Desain Mobile-First Thinking.

---

## Planning

- Feature manajemen jam-operasional
  - buat agar bisa atur waktu selama 7 days sesuai dengan tabel operating_hours
    - open / close jam bisa di atur bebas
    - untuk hari ini ketika ingin di close maka harus input alasan penutupannya sama seperti yang ada di dashboard
    - tambah toggle untuk closed / open
    - tambah button untuk override schedule operasional kedepannya dengan memasukkan custom open / close dan juga lalu wajib alasan penutupannya (jika close), terdapat 3 mode dalam override yaitu :
      1. Mode Full Closed (status = 'CLOSED'):
      - Taman ditutup penuh pada tanggal tersebut.
      - Wajib menyertakan reason_notice untuk teks pengumuman running marquee warga.
      2. Mode Custom Hours (status = 'MODIFIED'):
      - Taman tetap buka pada tanggal tersebut, tetapi dengan jam operasional khusus (misal: Buka jam 08:00 - 13:00 WIB saja karena ada acara khusus) bebas mau kasih reason_notice mau diisi atau engga, tapi sekalian sesuaikan uinya karna pada ParkLiveStatus saat ini masih khusus untuk closed.
      - Menggunakan kolom custom_open_time dan custom_close_time.
      3. Mode Force Open (status = 'OPEN'):
      - Memaksa taman tetap buka normal pada tanggal tersebut (membatalkan jadwal libur reguler).

- Setelah itu bawahnya ada history terkait operation_logs pakai paging cukup 10 terkahir saja cukup

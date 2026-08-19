# Buatkan planning / issue secara high-level

## 1. Spesifikasi Teknologi

- Framework: Next.js (App Router)
- Bahasa: TypeScript
- Styling: Vanilla CSS & Tailwind CSS (Harmoni Emerald, Mint, & Dark Forest)
- Database & Backend: Supabase PostgreSQL (Auth + Row Level Security)
- Package Manager: pnpm
- Testing: Vitest

---

## 2. Aturan & Standar Dokumentasi

- Tanpa menyertakan contoh baris kode dalam dokumen perancangan arsitektur.
- Penamaan file menggunakan format tanggal berurut seperti (`YYYY_MM_DD_HHMMSS_nama_tugas.md`).
- Struktur terbagi ke dalam tahapan yang tuntas dan mudah dipahami oleh programmer junior / cheap model dengan context parameter kecil.
- Desain Mobile-First Thinking.

---

## 3. Testing

- Folder testing contoh features/auth/**tests**/
  - Folder
    - unit : terkait logic , menggunakan vitest tanpa komponen nextjs (Mock)
- Alur testing dari bad -> good path dari setiap fitur
- Saat membuat planning / issue harus menyertakan alur testing dari fitur tersebut

## Planning

- Install nuqs, setup 

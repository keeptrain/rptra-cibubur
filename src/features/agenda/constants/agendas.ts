export interface AgendaItem {
  id: string;
  title: string;
  category: "kesehatan" | "olahraga" | "edukasi" | "komunitas";
  categoryLabel: string;
  date: string; // YYYY-MM-DD
  dayName: string;
  time: string;
  location: string;
  instructor?: string;
  targetAudience: string;
  description: string;
  isToday?: boolean;
  isOngoing?: boolean;
}

export const MOCK_AGENDAS: AgendaItem[] = [
  {
    id: "1",
    title: "Posyandu Balita & Imunisasi Rutin",
    category: "kesehatan",
    categoryLabel: "Kesehatan / Posyandu",
    date: "2026-08-15",
    dayName: "Sabtu",
    time: "08:00 - 11:30 WIB",
    location: "Ruang Posyandu & Aula",
    instructor: "Kader Posyandu & Bidan Puskesmas",
    targetAudience: "Balita 0-5 Tahun & Ibu Hamil",
    description: "Penimbangan berat badan, pengukuran tinggi badan, pemberian vitamin A, dan konsultasi gizi balita gratis.",
    isToday: true,
    isOngoing: true,
  },
  {
    id: "2",
    title: "Senam Pagi Sehat Warga Cibubur",
    category: "olahraga",
    categoryLabel: "Olahraga & Senam",
    date: "2026-08-16",
    dayName: "Minggu",
    time: "06:30 - 07:30 WIB",
    location: "Lapangan Serbaguna",
    instructor: "Instruktur Zin Rina",
    targetAudience: "Umum & Lansia",
    description: "Senam aerobik energik diikuti senam jantung sehat untuk menjaga stamina tubuh seluruh keluarga.",
    isToday: false,
  },
  {
    id: "3",
    title: "Mendongeng & Melukis Bersama Anak",
    category: "edukasi",
    categoryLabel: "Anak & Edukasi",
    date: "2026-08-16",
    dayName: "Minggu",
    time: "09:00 - 11:00 WIB",
    location: "Perpustakaan Ber-AC",
    instructor: "Kak Dinda (Komunitas Dongeng)",
    targetAudience: "Anak Usia 4-10 Tahun",
    description: "Sesi mendongeng fabel karakter anak dilanjutkan dengan lomba mewarnai kertas bertema lingkungan hijau.",
    isToday: false,
  },
  {
    id: "4",
    title: "Pelatihan Keterampilan Daur Ulang PKK",
    category: "komunitas",
    categoryLabel: "PKK & Komunitas",
    date: "2026-08-18",
    dayName: "Selasa",
    time: "13:00 - 15:30 WIB",
    location: "Aula Komunitas RPTRA",
    instructor: "Tim Kreatif PKK Kel. Cibubur",
    targetAudience: "Ibu-Ibu PKK & Warga RT/RW",
    description: "Pelatihan membuat kerajinan tangan bernilai ekonomi tinggi dari bahan sampah plastik daur ulang.",
    isToday: false,
  },
  {
    id: "5",
    title: "Posyandu Lansia & Cek Gula Darah",
    category: "kesehatan",
    categoryLabel: "Kesehatan / Posyandu",
    date: "2026-08-19",
    dayName: "Rabu",
    time: "08:30 - 11:00 WIB",
    location: "Aula Komunitas",
    instructor: "Tim Medis Puskesmas Ciracas",
    targetAudience: "Lansia Usia 60+ Tahun",
    description: "Pemeriksaan tekanan darah, cek kadar gula darah, asam urat, dan senam otak ringan lansia.",
    isToday: false,
  },
  {
    id: "6",
    title: "Klub Baca & Edukasi Literasi Digital",
    category: "edukasi",
    categoryLabel: "Anak & Edukasi",
    date: "2026-08-20",
    dayName: "Kamis",
    time: "15:00 - 16:30 WIB",
    location: "Perpustakaan Mini",
    instructor: "Pengelola RPTRA",
    targetAudience: "Pelajar SD & SMP",
    description: "Belajar mencari bahan tugas sekolah sehat menggunakan komputer perpustakaan & pembacaan buku mingguan.",
    isToday: false,
  },
  {
    id: "7",
    title: "Latihan Bulu Tangkis Anak & Remaja",
    category: "olahraga",
    categoryLabel: "Olahraga & Senam",
    date: "2026-08-21",
    dayName: "Jumat",
    time: "16:00 - 17:30 WIB",
    location: "Lapangan Badminton",
    instructor: "Coach Hendra",
    targetAudience: "Remaja 10-17 Tahun",
    description: "Latihan teknik dasar bulu tangkis, kelincahan kaki, dan pertandingan persahabatan antar RW.",
    isToday: false,
  },
];

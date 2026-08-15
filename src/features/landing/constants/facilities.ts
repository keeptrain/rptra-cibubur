import {
  Smile,
  BookOpen,
  Trophy,
  Sprout,
  Users,
  LucideIcon,
} from "lucide-react";

export interface FacilityItem {
  id: string;
  category: string;
  title: string;
  tagline: string;
  desc: string;
  icon: LucideIcon;
  features: string[];
}

export const FACILITIES: FacilityItem[] = [
  {
    id: "playground",
    category: "Zona Outdoor",
    title: "Area Bermain Motorik Anak",
    tagline: "Wahana Terbuka Ber-Lantai Karet Aman",
    desc: "Area bermain anak yang dirancang khusus dengan lantai karet peredam benturan, ayunan ganda, perosotan bertingkat, dan jungkat-jungkit untuk melatih ketangkasan fisik serta interaksi sosial buah hati Anda.",
    icon: Smile,
    features: [
      "Lantai karet empuk peredam jatuh",
      "Ayunan ganda & perosotan aman",
      "Area berpagar dengan pengawasan",
      "100% Gratis tanpa biaya masuk",
    ],
  },
  {
    id: "literacy",
    category: "Literasi & Edukasi",
    title: "Perpustakaan Mini Ber-AC",
    tagline: "Ruang Baca Lesehan yang Sejuk & Nyaman",
    desc: "Menyediakan ratusan koleksi buku cerita bergambar, ensiklopedia anak, majalah edukasi, serta fasilitas karpet empuk ber-AC dan WiFi gratis untuk kenyamanan membaca seluruh keluarga.",
    icon: BookOpen,
    features: [
      "Ratusan koleksi buku edukatif",
      "Area lesehan karpet empuk ber-AC",
      "Komputer & akses internet sehat",
      "Buka setiap hari jam operasional",
    ],
  },
  {
    id: "sports",
    category: "Kebugaran Warga",
    title: "Lapangan Olahraga Serbaguna",
    tagline: "Futsal, Bulu Tangkis & Outdoor Gym",
    desc: "Fasilitas olahraga terbuka untuk menjaga kesehatan seluruh anggota keluarga. Dilengkapi lapangan futsal mini, arena bulu tangkis, lintasan jogging rindang, dan peralatan fitness luar ruangan.",
    icon: Trophy,
    features: [
      "Lapangan futsal & badminton",
      "Lintasan jogging track rindang",
      "Peralatan outdoor fitness gym",
      "Pencahayaan terang saat sore",
    ],
  },
  {
    id: "nature",
    category: "Edukasi Lingkungan",
    title: "Kebun TOGA & Hidroponik",
    tagline: "Belajar Tanaman Obat & Budidaya Alam",
    desc: "Kebun edukasi alam tempat anak-anak dan warga belajar budidaya Tanaman Obat Keluarga (TOGA), instalasi sayuran hijau hidroponik, serta kolam gizi pembibitan ikan ramah lingkungan.",
    icon: Sprout,
    features: [
      "Puluhan jenis Tanaman Obat (TOGA)",
      "Instalasi hidroponik tanaman hijau",
      "Kolam pembibitan ikan warga",
      "Kegiatan daur ulang sampah organik",
    ],
  },
  {
    id: "community",
    category: "Pusat Kegiatan Warga",
    title: "Aula Komunitas & Ruang Posyandu",
    tagline: "Ruang Serbaguna Kegiatan Sosial & Kesehatan",
    desc: "Aula indoor ber-AC yang fleksibel untuk pelayanan Posyandu balita & lansia rutin, tempat pelatihan keterampilan PKK, rapat RT/RW, dan acara pentas seni budaya anak-anak warga.",
    icon: Users,
    features: [
      "Pelayanan Posyandu Balita & Lansia",
      "Ruang Laktasi Menyusui Ibu",
      "Ruang serbaguna ber-AC lega",
      "Pengajuan peminjaman tempat gratis",
    ],
  },
];

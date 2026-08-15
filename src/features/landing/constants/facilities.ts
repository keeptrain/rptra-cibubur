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
  badge: string;
  badgeColor: string;
  features: string[];
  ctaText: string;
  ctaHref: string;
}

export const FACILITIES: FacilityItem[] = [
  {
    id: "playground",
    category: "Zona Outdoor 01",
    title: "Area Bermain Motorik Anak",
    tagline: "Wahana Terbuka Ber-Lantai Karet Aman",
    desc: "Area bermain anak yang dirancang khusus dengan lantai karet peredam benturan, ayunan ganda, perosotan bertingkat, dan jungkat-jungkit untuk melatih ketangkasan fisik serta interaksi sosial buah hati Anda.",
    icon: Smile,
    badge: "Usia 2 - 12 Tahun",
    badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
    features: [
      "Lantai karet empuk peredam jatuh",
      "Ayunan ganda & perosotan aman",
      "Area berpagar dengan pengawasan",
      "100% Gratis tanpa biaya masuk",
    ],
    ctaText: "Panduan Bermain Aman",
    ctaHref: "#tata-tertib",
  },
  {
    id: "literacy",
    category: "Literasi & Edukasi",
    title: "Perpustakaan Mini Ber-AC",
    tagline: "Ruang Baca Lesehan yang Sejuk & Nyaman",
    desc: "Menyediakan ratusan koleksi buku cerita bergambar, ensiklopedia anak, majalah edukasi, serta fasilitas karpet empuk ber-AC dan WiFi gratis untuk kenyamanan membaca seluruh keluarga.",
    icon: BookOpen,
    badge: "Ruang Ber-AC & WiFi",
    badgeColor: "bg-sky-100 text-sky-900 border-sky-300",
    features: [
      "Ratusan koleksi buku edukatif",
      "Area lesehan karpet empuk ber-AC",
      "Komputer & akses internet sehat",
      "Buka setiap hari jam operasional",
    ],
    ctaText: "Lihat Jam Operasional",
    ctaHref: "#hero",
  },
  {
    id: "sports",
    category: "Kebugaran Warga",
    title: "Lapangan Olahraga Serbaguna",
    tagline: "Futsal, Bulu Tangkis & Outdoor Gym",
    desc: "Fasilitas olahraga terbuka untuk menjaga kesehatan seluruh anggota keluarga. Dilengkapi lapangan futsal mini, arena bulu tangkis, lintasan jogging rindang, dan peralatan fitness luar ruangan.",
    icon: Trophy,
    badge: "Olahraga Bebas Biaya",
    badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
    features: [
      "Lapangan futsal & badminton",
      "Lintasan jogging track rindang",
      "Peralatan outdoor fitness gym",
      "Pencahayaan terang saat sore",
    ],
    ctaText: "Info Penggunaan Lapangan",
    ctaHref: "#hero",
  },
  {
    id: "nature",
    category: "Edukasi Lingkungan",
    title: "Kebun TOGA & Hidroponik",
    tagline: "Belajar Tanaman Obat & Budidaya Alam",
    desc: "Kebun edukasi alam tempat anak-anak dan warga belajar budidaya Tanaman Obat Keluarga (TOGA), instalasi sayuran hijau hidroponik, serta kolam gizi pembibitan ikan ramah lingkungan.",
    icon: Sprout,
    badge: "Edukasi Kebun Alam",
    badgeColor: "bg-lime-100 text-lime-900 border-lime-300",
    features: [
      "Puluhan jenis Tanaman Obat (TOGA)",
      "Instalasi hidroponik tanaman hijau",
      "Kolam pembibitan ikan warga",
      "Kegiatan daur ulang sampah organik",
    ],
    ctaText: "Eksplorasi Kebun Taman",
    ctaHref: "#hero",
  },
  {
    id: "community",
    category: "Pusat Kegiatan Warga",
    title: "Aula Komunitas & Ruang Posyandu",
    tagline: "Ruang Serbaguna Kegiatan Sosial & Kesehatan",
    desc: "Aula indoor ber-AC yang fleksibel untuk pelayanan Posyandu balita & lansia rutin, tempat pelatihan keterampilan PKK, rapat RT/RW, dan acara pentas seni budaya anak-anak warga.",
    icon: Users,
    badge: "Kapasitas 100+ Orang",
    badgeColor: "bg-purple-100 text-purple-900 border-purple-300",
    features: [
      "Pelayanan Posyandu Balita & Lansia",
      "Ruang Laktasi Menyusui Ibu",
      "Ruang serbaguna ber-AC lega",
      "Pengajuan peminjaman tempat gratis",
    ],
    ctaText: "Hubungi Pengelola (WhatsApp)",
    ctaHref: "https://wa.me/6281234567890?text=Halo%20Pengelola%20RPTRA%20Cibubur,%20saya%20ingin%20mengajukan%20peminjaman%20tempat",
  },
];

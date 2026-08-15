import { Smile, BookOpen, Trophy, Sprout, Users, CheckCircle2, Sparkles } from "lucide-react";

export default function LandingZones() {
  const zones = [
    {
      id: "playground",
      title: "Zona Bermain Motorik Anak",
      subtitle: "Area Luar Ruangan Berlatar Karet Aman",
      desc: "Dilengkapi ayunan ganda, perosotan bertingkat, jungkat-jungkit, dan lantai karet peredam benturan untuk melatih koordinasi fisik anak.",
      icon: Smile,
      badge: "Untuk Usia 2-12 Tahun",
      badgeColor: "bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700",
      accentGradient: "from-amber-500 to-orange-400",
      features: ["Lantai karet aman benturan", "Ayunan & perosotan ganda", "Tumpuan merayap & tangga ceria"],
    },
    {
      id: "literacy",
      title: "Zona Literasi & Ruang Baca",
      subtitle: "Perpustakaan Mini Ber-AC & Sejuk",
      desc: "Menyediakan ratusan koleksi buku cerita bergambar, ensiklopedia anak, ruang baca lesehan karpet empuk, dan akses WiFi internet sehat.",
      icon: BookOpen,
      badge: "Area Nyaman Ber-AC",
      badgeColor: "bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 border-sky-300 dark:border-sky-700",
      accentGradient: "from-sky-500 to-cyan-400",
      features: ["Ratusan koleksi buku edukasi", "Meja baca lesehan & AC dingin", "Komputer internet sehat gratis"],
    },
    {
      id: "sports",
      title: "Zona Olahraga & Kebugaran",
      subtitle: "Lapangan Serbaguna & Jogging Track",
      desc: "Fasilitas olahraga terbuka berupa lapangan futsal mini, bulu tangkis, lintasan lari melingkar rindang, serta alat fitness outdoor gratis.",
      icon: Trophy,
      badge: "Gratis untuk Seluruh Warga",
      badgeColor: "bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700",
      accentGradient: "from-emerald-500 to-teal-400",
      features: ["Lapangan futsal & badminton", "Lintasan jogging di bawah pohon", "Alat fitness outdoor modern"],
    },
    {
      id: "nature",
      title: "Zona Kebun Gizi & Edutainment",
      subtitle: "Tanaman Obat Keluarga & Hidroponik",
      desc: "Kebun edukasi berisi kebun TOGA (Tanaman Obat Keluarga), instalasi sayuran hidroponik, dan kolam pembibitan ikan untuk sarana belajar alam.",
      icon: Sprout,
      badge: "Edukasi Alam & Tanaman",
      badgeColor: "bg-lime-100 dark:bg-lime-950 text-lime-800 dark:text-lime-300 border-lime-300 dark:border-lime-700",
      accentGradient: "from-lime-500 to-emerald-500",
      features: ["Kebun Tanaman Obat (TOGA)", "Instalasi sayuran hidroponik", "Kolam gizi & kompos organik"],
    },
    {
      id: "community",
      title: "Zona Komunitas & Aula Warga",
      subtitle: "Pusat Interaksi & Kegiatan Posyandu",
      desc: "Aula serbaguna indoor yang nyaman untuk pelayanan Posyandu balita & lansia, rapat RT/RW, pelatihan seni, dan kegiatan PKK warga.",
      icon: Users,
      badge: "Pusat Kegiatan Komunitas",
      badgeColor: "bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-700",
      accentGradient: "from-purple-500 to-indigo-400",
      features: ["Aula serbaguna kapasitas 100+", "Ruang posyandu & laktasi ibu", "Peralatan sound system & proyektor"],
    },
  ];

  return (
    <section id="zona-taman" className="py-20 md:py-28 bg-zinc-50/80 dark:bg-zinc-900/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-emerald-800 dark:text-emerald-300">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            Fasilitas Lengkap &amp; Gratis
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
            Eksplorasi <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">5 Zona Utama</span> Taman
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-medium">
            Setiap sudut RPTRA Cibubur dirancang khusus untuk kenyamanan dan kebahagiaan seluruh anggota keluarga.
          </p>
        </div>

        {/* Zones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {zones.map((zone, index) => {
            const Icon = zone.icon;
            const isLarge = index === 0 || index === 4;

            return (
              <div
                key={zone.id}
                className={`group relative rounded-3xl p-8 bg-white dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700/60 shadow-lg shadow-zinc-200/30 dark:shadow-none hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between ${
                  isLarge ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${zone.accentGradient} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${zone.badgeColor}`}>
                      {zone.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white mb-1">
                    {zone.title}
                  </h3>
                  <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-4">
                    {zone.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6">
                    {zone.desc}
                  </p>
                </div>

                {/* Feature Checklist */}
                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-700/60 space-y-2">
                  {zone.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

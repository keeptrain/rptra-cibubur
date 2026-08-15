"use client";

import { useState } from "react";
import { Calendar, Clock, MapPin, Sparkles, UserCheck, HeartHandshake } from "lucide-react";

export default function LandingEvents() {
  const [activeFilter, setActiveFilter] = useState("Semua");

  const categories = ["Semua", "Anak-anak", "Keluarga", "Lansia"];

  const events = [
    {
      id: 1,
      title: "Senam Kebugaran Warga & Lansia Ceria",
      category: "Lansia",
      day: "Setiap Minggu Pagi",
      time: "06:30 - 08:00 WIB",
      location: "Lapangan Serbaguna RPTRA",
      desc: "Latihan senam jantung sehat dipandu instruktur berpengalaman, dilanjutkan minum teh hangat dan cek tensi gratis.",
      color: "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border-purple-200 dark:border-purple-800",
    },
    {
      id: 2,
      title: "Pojok Mendongeng & Lomba Mewarnai",
      category: "Anak-anak",
      day: "Setiap Sabtu Sore",
      time: "15:30 - 17:00 WIB",
      location: "Perpustakaan & Gazebo Taman",
      desc: "Sesi mendongeng interaktif cerita nusantara dan lomba kreasi mewarnai gambar dengan hadiah buku menarik.",
      color: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    },
    {
      id: 3,
      title: "Layanan Posyandu Balita & Ibu Hamil",
      category: "Keluarga",
      day: "Rabu Minggu Ke-2",
      time: "08:00 - 11:30 WIB",
      location: "Aula Ruang Utama RPTRA",
      desc: "Penimbangan berat badan, pengukuran tinggi anak, pemberian vitamin A, imunisasi dasar, serta konseling gizi gratis.",
      color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
    },
    {
      id: 4,
      title: "Workshop Daur Ulang Sampah & Eco-Brick",
      category: "Keluarga",
      day: "Jumat Minggu Ke-3",
      time: "15:30 - 17:30 WIB",
      location: "Kebun Edukasi TOGA",
      desc: "Pelatihan mengolah botol plastik bekas menjadi kerajinan pot dan kursi ecobrick yang ramah lingkungan bersama kader PKK.",
      color: "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 border-sky-200 dark:border-sky-800",
    },
  ];

  const filteredEvents =
    activeFilter === "Semua"
      ? events
      : events.filter((ev) => ev.category === activeFilter);

  return (
    <section id="agenda" className="py-20 md:py-28 bg-white dark:bg-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/80 border border-amber-200 dark:border-amber-800 text-xs font-bold text-amber-800 dark:text-amber-300">
              <Calendar className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              Agenda Rutin Warga
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white tracking-tight">
              Kegiatan Seru di <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-600 bg-clip-text text-transparent">RPTRA Cibubur</span>
            </h2>
            <p className="text-base text-zinc-600 dark:text-zinc-400 font-medium max-w-xl">
              Ikuti ragam aktivitas edukatif, kesehatan, dan olahraga yang dirancang gratis untuk seluruh warga.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-zinc-100 dark:bg-zinc-800 p-1.5 rounded-2xl border border-zinc-200/80 dark:border-zinc-700/60 self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
                  activeFilter === cat
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/25"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEvents.map((ev) => (
            <div
              key={ev.id}
              className="p-7 rounded-3xl bg-zinc-50/90 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${ev.color}`}>
                    {ev.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100/60 dark:bg-emerald-950/60 px-3 py-1 rounded-full">
                    <UserCheck className="w-3.5 h-3.5" /> Gratis Terbuka
                  </div>
                </div>

                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">
                  {ev.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6">
                  {ev.desc}
                </p>
              </div>

              {/* Event Metadata (Day, Time, Location) */}
              <div className="pt-4 border-t border-zinc-200/60 dark:border-zinc-700/60 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>{ev.day} ({ev.time})</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                  <span className="truncate">{ev.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-amber-500/10 border border-emerald-200 dark:border-emerald-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-zinc-900 dark:text-white text-sm sm:text-base">
                Ingin Mengadakan Kegiatan Komunitas di RPTRA?
              </h4>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                Warga RT/RW &amp; organisasi dapat mengajukan peminjaman aula secara gratis.
              </p>
            </div>
          </div>
          <a
            href="#lokasi"
            className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shrink-0 transition-colors"
          >
            Ajukan Izin Tempat
          </a>
        </div>

      </div>
    </section>
  );
}

import { MapPin, Navigation, Bus, Train, Phone, Mail, Compass } from "lucide-react";

export default function LandingLocation() {
  const routes = [
    {
      title: "Mikrotrans JakLingko",
      desc: "Rute JAK-28 (Cibubur - Rebo) & JAK-73 (Cibubur - Harjamukti). Turun tepat di depan gang rute RPTRA.",
      icon: Bus,
    },
    {
      title: "LRT Jabodebek",
      desc: "Stasiun Harjamukti / Ciracas. Dilanjutkan angkutan Mikrotrans atau ojek online sekitar 7-10 menit.",
      icon: Train,
    },
    {
      title: "Kendaraan Pribadi & Sepeda",
      desc: "Tersedia area parkir tertutup untuk motor dan rak parkir sepeda ramah lingkungan.",
      icon: Navigation,
    },
  ];

  return (
    <section id="lokasi" className="py-20 md:py-28 bg-white dark:bg-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Information */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Lokasi &amp; Aksesibilitas
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white tracking-tight">
                Mudah Ditemukan di <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Jantung Cibubur</span>
              </h2>
              <p className="text-base text-zinc-600 dark:text-zinc-400 font-medium">
                Terletak strategis di pemukiman warga Kelurahan Cibubur, Jakarta Timur. Mudah dijangkau dengan transportasi umum maupun jalan kaki.
              </p>
            </div>

            {/* Address Box */}
            <div className="p-6 rounded-3xl bg-emerald-50/80 dark:bg-zinc-800/80 border border-emerald-200/80 dark:border-zinc-700/60 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 dark:text-white text-base">
                    Alamat Lengkap RPTRA Cibubur
                  </h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mt-1">
                    Jl. Cibubur I No. 42, RT.04/RW.01, Kelurahan Cibubur, Kecamatan Ciracas, Kota Jakarta Timur, DKI Jakarta 13720.
                  </p>
                </div>
              </div>
            </div>

            {/* Routes List */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Panduan Transportasi Publik
              </h4>
              <div className="space-y-3">
                {routes.map((rt) => {
                  const Icon = rt.icon;
                  return (
                    <div key={rt.title} className="flex items-start gap-3 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-700/50">
                      <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h5 className="font-bold text-zinc-900 dark:text-white text-sm">
                          {rt.title}
                        </h5>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
                          {rt.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Direct Contact */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="https://maps.google.com/?q=RPTRA+Cibubur"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/25 transition-all"
              >
                <Navigation className="w-4 h-4" />
                Buka di Google Maps
              </a>
            </div>

          </div>

          {/* Right Column: Visual Map Card */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl p-3 bg-gradient-to-tr from-emerald-500 via-teal-500 to-amber-400 shadow-2xl">
              <div className="rounded-[20px] bg-white dark:bg-zinc-900 p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                    <span className="font-bold text-sm text-zinc-900 dark:text-white">
                      Lokasi Aktif &amp; Terverifikasi
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    DKI Jakarta
                  </span>
                </div>

                {/* Simulated Map Graphic Container */}
                <div className="w-full h-64 sm:h-72 rounded-2xl bg-emerald-950 relative overflow-hidden flex flex-col items-center justify-center text-center p-6 border border-emerald-800">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />
                  <div className="relative z-10 space-y-3">
                    <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/50 animate-bounce">
                      <MapPin className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-black text-white">
                      RPTRA Cibubur
                    </h4>
                    <p className="text-xs text-emerald-300 max-w-xs mx-auto">
                      Kelurahan Cibubur, Kecamatan Ciracas, Jakarta Timur
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                  <div className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-center">
                    <span className="block font-bold text-zinc-900 dark:text-white text-sm">06:00 - 18:00</span>
                    Jam Buka Parkir
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-center">
                    <span className="block font-bold text-zinc-900 dark:text-white text-sm">Ramah Kursi Roda</span>
                    Akses Disabilitas
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

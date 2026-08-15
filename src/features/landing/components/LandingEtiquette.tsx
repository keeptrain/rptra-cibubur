import { ShieldCheck, Trash2, Ban, Heart, Eye, ParkingCircle, Sparkles } from "lucide-react";

export default function LandingEtiquette() {
  const rules = [
    {
      title: "Jaga Kebersihan & Pilah Sampah",
      desc: "Gunakan tempat sampah terpisah (organik, anorganik, dan botol daur ulang) yang tersedia di sudut taman.",
      icon: Trash2,
      color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
    },
    {
      title: "Kawasan 100% Bebas Asap Rokok",
      desc: "Menjaga kualitas udara segar dan bersih demi kesehatan pernapasan anak-anak, ibu hamil, serta lansia.",
      icon: Ban,
      color: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800",
    },
    {
      title: "Sayangi Tanaman & Wahana",
      desc: "Tidak merusak atau memetik bunga dan menggunakan alat permainan sesuai kapasitas keselamatan anak.",
      icon: Heart,
      color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800",
    },
    {
      title: "Dampingi Buah Hati",
      desc: "Orang tua atau wali dimohon tetap mengawasi anak-anak saat bermain di area luar ruangan.",
      icon: Eye,
      color: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-800",
    },
    {
      title: "Parkir Rapih di Area Terpilih",
      desc: "Tempatkan sepeda dan sepeda motor di area parkir resmi RPTRA agar tidak mengganggu pejalan kaki.",
      icon: ParkingCircle,
      color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800",
    },
  ];

  return (
    <section id="tata-tertib" className="py-20 md:py-28 bg-zinc-50/80 dark:bg-zinc-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-emerald-800 dark:text-emerald-300">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            Kenyamanan &amp; Keselamatan Bersama
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
            Panduan &amp; <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Tata Tertib Taman</span>
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-medium">
            Mari kita pelihara kebersihan, kenyamanan, dan keselamatan RPTRA Cibubur bersama-sama.
          </p>
        </div>

        {/* Rules Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rules.map((rule, idx) => {
            const Icon = rule.icon;
            return (
              <div
                key={rule.title}
                className="p-7 rounded-3xl bg-white dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700/60 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${rule.color}`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-black text-zinc-400 dark:text-zinc-500">
                      0{idx + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
                    {rule.title}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {rule.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

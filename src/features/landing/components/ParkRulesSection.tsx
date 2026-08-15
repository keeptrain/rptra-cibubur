import {
  CigaretteOff,
  Trash2,
  Baby,
  Clock,
  ShieldAlert,
  CheckCircle2,
} from "lucide-react";

export default function ParkRulesSection() {
  const rules = [
    {
      id: "no-smoking",
      title: "100% Bebas Asap Rokok",
      desc: "Dilarang merokok atau menggunakan vape di seluruh area taman demi kesehatan pernapasan anak-anak.",
      icon: CigaretteOff,
      badge: "Kawasan Sehat",
      color: "border-emerald-200/90 bg-emerald-50/50 text-emerald-950",
      iconBg: "bg-emerald-600 text-white",
    },
    {
      id: "cleanliness",
      title: "Menjaga Kebersihan",
      desc: "Buanglah sampah pada tempat sampah pilah yang telah disediakan. Dilarang mengotori atau merusak fasilitas.",
      icon: Trash2,
      badge: "Kebersihan Bersama",
      color: "border-emerald-200/90 bg-white text-emerald-950",
      iconBg: "bg-emerald-700 text-white",
    },
    {
      id: "supervision",
      title: "Pengawasan Anak",
      desc: "Orang tua atau pendamping wajib mengawasi putra-putri saat bermain di area wahana motorik.",
      icon: Baby,
      badge: "Keselamatan Buah Hati",
      color: "border-emerald-200/90 bg-white text-emerald-950",
      iconBg: "bg-teal-600 text-white",
    },
    {
      id: "hours",
      title: "Patuhi Jam Operasional",
      desc: "Taman terbuka setiap hari pukul 06:00 - 18:00 WIB. Mohon saling menjaga ketenangan lingkungan sekitar.",
      icon: Clock,
      badge: "06:00 - 18:00 WIB",
      color: "border-emerald-200/90 bg-emerald-50/50 text-emerald-950",
      iconBg: "bg-emerald-800 text-white",
    },
  ];

  return (
    <section
      id="tata-tertib"
      className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
    >
      {/* Section Header */}
      <div className="flex flex-col space-y-3 text-left">
        <span className="inline-flex items-center gap-1.5 text-xs font-black tracking-widest text-emerald-700 uppercase sm:text-sm">
          <ShieldAlert className="size-4 text-emerald-600" />
          ATURAN &amp; TATA TERTIB
        </span>
        <h2 className="text-3xl font-black tracking-tight text-emerald-950 uppercase sm:text-5xl">
          Etika Berkunjung <br className="hidden sm:inline" />
          <span className="text-emerald-600"> RPTRA Cibubur</span>
        </h2>
        <p className="max-w-2xl text-xs leading-relaxed font-medium text-emerald-800/80 sm:text-sm">
          Demi kenyamanan, keamanan, dan keselamatan seluruh warga serta buah hati
          tercinta, mohon mematuhi panduan umum berkunjung berikut.
        </p>
      </div>

      {/* Grid 4 Rules */}
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {rules.map((rule) => {
          const Icon = rule.icon;
          return (
            <div
              key={rule.id}
              className={`flex flex-col justify-between rounded-3xl border ${rule.color} p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div
                    className={`flex size-11 items-center justify-center rounded-2xl ${rule.iconBg} shadow-sm`}
                  >
                    <Icon className="size-5" />
                  </div>
                  <span className="rounded-full bg-emerald-100/90 px-3 py-1 text-[10px] font-black uppercase text-emerald-800">
                    {rule.badge}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-black tracking-tight text-emerald-950 uppercase">
                    {rule.title}
                  </h3>
                  <p className="text-xs leading-relaxed font-medium text-emerald-800/80">
                    {rule.desc}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-1.5 pt-2 text-[11px] font-bold text-emerald-700">
                <CheckCircle2 className="size-3.5" />
                <span>Wajib Dipatuhi</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

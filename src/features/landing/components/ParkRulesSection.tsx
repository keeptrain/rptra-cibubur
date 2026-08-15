export default function ParkRulesSection() {
  const rules = [
    {
      num: "01",
      title: "BEBAS ASAP ROKOK",
      desc: "Kawasan 100% bebas dari asap rokok dan vape demi menjaga kesehatan udara pernapasan buah hati.",
    },
    {
      num: "02",
      title: "KEBERSIHAN & KETERTIBAN",
      desc: "Buanglah sampah pada tempat sampah pilah yang disediakan. Rawat dan jaga keasrian fasilitas bersama.",
    },
    {
      num: "03",
      title: "PENGAWASAN ANANDA",
      desc: "Orang tua atau pendamping wajib mengawasi aktivitas putra-putri saat beraktivitas di area wahana.",
    },
    {
      num: "04",
      title: "JAM OPERASIONAL",
      desc: "Taman terbuka pukul 06:00 - 18:00 WIB. Mohon saling menjaga ketenangan dengan lingkungan permukiman.",
    },
  ];

  return (
    <section
      id="tata-tertib"
      className="mx-auto w-full max-w-7xl px-4 pt-6 pb-12 sm:px-6 sm:py-12 lg:px-8 lg:py-16"
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16">
        {/* Left Column: Big Editorial Headline (No Card, No Badge) */}
        <div className="flex flex-col justify-between space-y-4 lg:col-span-5 lg:space-y-6">
          <div className="space-y-3 sm:space-y-4">
            <span className="text-xs font-black tracking-widest text-emerald-700 uppercase">
              Panduan Berkunjung
            </span>
            <h2 className="text-3xl leading-[0.95] font-black tracking-tight text-emerald-950 uppercase sm:text-5xl lg:text-6xl">
              DIJAGA <br className="hidden sm:inline" /> BERSAMA <br className="hidden sm:inline" /> UNTUK WARGA
            </h2>
          </div>

          <p className="max-w-md text-xs leading-relaxed font-medium text-emerald-800/80 sm:text-sm">
            RPTRA Cibubur hadir sebagai ruang aman bagi anak-anak dan sarana
            silaturahmi seluruh warga. Empat prinsip sederhana ini menjaga taman
            tetap nyaman untuk kita semua.
          </p>
        </div>

        {/* Right Column: Clean Editorial Numbered List (Hairline Dividers) */}
        <div className="flex flex-col divide-y divide-emerald-200/80 lg:col-span-7">
          {rules.map((rule) => (
            <div
              key={rule.num}
              className="group flex flex-col space-y-2 py-4.5 transition-colors first:pt-0 last:pb-0 hover:bg-emerald-100/30 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 sm:space-y-0 sm:py-6 sm:px-4"
            >
              <div className="flex items-baseline gap-4 sm:w-1/2">
                <span className="text-sm font-black tracking-wider text-emerald-600">
                  {rule.num}
                </span>
                <h3 className="text-base font-black tracking-tight text-emerald-950 uppercase sm:text-lg">
                  {rule.title}
                </h3>
              </div>

              <p className="text-xs leading-relaxed font-medium text-emerald-800/80 sm:w-1/2">
                {rule.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

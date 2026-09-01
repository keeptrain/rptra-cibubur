function HeroStats() {
  const stats = [
    { value: "10+", label: "TOTAL KEGIATAN" },
    { value: "200+", label: "PENGUNJUNG / BULAN" },
  ];
  return (
    <>
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="flex flex-1 items-center justify-between px-6 py-4 md:px-8"
        >
          <span className="text-primary text-3xl font-semibold tracking-tight sm:text-4xl">
            {stat.value}
          </span>
          <span className="max-w-30 text-right text-sm leading-snug font-semibold tracking-widest text-emerald-900/80 uppercase">
            {stat.label}
          </span>
        </div>
      ))}
    </>
  );
}

export default function HeroTop() {
  return (
    <div className="relative flex flex-1 flex-col justify-center overflow-hidden bg-linear-to-br from-emerald-100/90 via-emerald-50/80 to-emerald-100/40">
      <div className="grid h-full w-full grid-cols-1 items-stretch lg:grid-cols-12">
        <div className="relative z-10 flex flex-col justify-center space-y-2 p-6 sm:space-y-3 sm:p-8 lg:col-span-7 lg:p-10 xl:col-span-8">
          <span className="text-primary inline-block text-xs font-semibold tracking-widest uppercase sm:text-base">
            Ruang Publik Terpadu Ramah Anak
          </span>
          <h1 className="text-primary text-3xl leading-tight font-semibold tracking-tight uppercase sm:text-5xl lg:text-6xl xl:text-7xl">
            TAMAN RPTRA CIBUBUR
          </h1>
        </div>
        <div className="relative flex flex-col justify-center divide-y divide-emerald-200/80 text-emerald-950 lg:col-span-5 lg:border-l lg:border-emerald-200/80 xl:col-span-4">
          <HeroStats />
        </div>
      </div>
    </div>
  );
}

export default function ParkRulesSection() {
  const rules = [
    {
      num: "01",
      title: "Bebas Asap Rokok",
      desc: "Kawasan 100% bebas asap rokok dan vape demi menjaga udara pernapasan buah hati.",
      active: true,
    },
    {
      num: "02",
      title: "Kebersihan & Ketertiban",
      desc: "Buang sampah pada tempat pilah, rawat keasrian fasilitas bersama.",
      active: false,
    },
    {
      num: "03",
      title: "Pengawasan Ananda",
      desc: "Orang tua wajib mengawasi putra-putri saat di wahana.",
      active: false,
    },
    {
      num: "04",
      title: "Jam Operasional",
      desc: "Taman buka 06:00 - 18:00 WIB, jaga ketenangan lingkungan.",
      active: false,
    },
  ];

  return (
    <section
      id="rules"
      className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
    >
      <div className="mb-8 grid gap-6 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-7">
          <span className="text-primary inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest">
            <span className="bg-primary size-2" /> PANDUAN BERKUNJUNG
          </span>
          <h2 className="mt-2 text-3xl leading-tight font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Dijaga{" "}
            <span className="text-primary font-semibold italic">bersama</span>{" "}
            <br /> untuk warga
          </h2>
        </div>
        <p className="max-w-md self-end text-xs leading-relaxed text-zinc-600 lg:col-span-5">
          RPTRA Cibubur hadir sebagai ruang aman bagi anak dan sarana
          silaturahmi warga. Empat prinsip sederhana ini menjaga taman tetap
          nyaman untuk semua.
        </p>
      </div>

      <div className="grid gap-6 border-t px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        {rules.map((rule) => (
          <div key={rule.num} className="flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-semibold text-zinc-900">
                {rule.title}
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-zinc-600">
                {rule.desc}
              </p>
            </div>
            <div className="mt-8">
              <span
                className={`text-lg font-semibold ${rule.active ? "text-primary" : "text-zinc-500"}`}
              >
                {rule.num}
              </span>
              <div
                className={`mt-1 h-0.5 ${rule.active ? "bg-primary" : "bg-zinc-200"}`}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

import {
  Trees,
  ArrowUpRight,
  Phone,
  Mail,
  ComputerIcon,
  AdIcon,
  TvIcon,
} from "lucide-react";

export default function LandingFooter() {
  return (
    <footer className="bg-[#0B0E17] p-6 text-zinc-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* MAIN FOOTER GRID (2 COLUMNS) */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* LEFT SIDE: Brand Info + 2 Columns Links */}
          <div className="flex flex-col space-y-6 lg:col-span-6">
            {/* Logo Brand & Short Description */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-md">
                  <Trees className="size-5" />
                </div>
                <span className="text-xl font-extrabold tracking-tight text-white uppercase">
                  RPTRA CIBUBUR
                </span>
              </div>
              <p className="max-w-md text-xs leading-relaxed font-medium text-zinc-400">
                Ruang Publik Terpadu Ramah Anak Kelurahan Cibubur, Jakarta
                Timur. Sarana interaksi warga, arena bermain ramah anak, dan
                tempat kegiatan sosial 100% bebas biaya.
              </p>
            </div>

            {/* Links Divided into 2 Columns */}
            <div className="grid grid-cols-1 gap-8 pt-2 sm:grid-cols-2">
              {/* Column 1: Informasi Warga */}
              <div className="space-y-3">
                <h4 className="gap-1 text-xs font-extrabold tracking-wider text-white uppercase">
                  Informasi Warga
                </h4>
                <ul className="space-y-2 text-xs font-medium text-zinc-400">
                  <li>
                    <span>Jam Operasional (06:00 - 18:00 WIB)</span>
                  </li>
                  <li>
                    <span>Kawasan 100% Bebas Asap Rokok</span>
                  </li>
                </ul>
              </div>

              {/* Column 2: Instansi Terkait & Kontak Pengaduan */}
              <div className="space-y-5">
                <div className="space-y-3">
                  <h4 className="flex items-center gap-1 text-xs font-extrabold tracking-wider text-white uppercase">
                    INSTANSI TERKAIT{" "}
                    <ArrowUpRight className="size-3.5 text-emerald-400" />
                  </h4>
                  <ul className="space-y-2 text-xs font-medium text-zinc-400">
                    <li>
                      <a
                        href="https://ppapp.jakarta.go.id"
                        target="_blank"
                        rel="noreferrer"
                        className="transition-colors hover:text-white"
                      >
                        Dinas PPAPP DKI Jakarta
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://jakarta.go.id"
                        target="_blank"
                        rel="noreferrer"
                        className="transition-colors hover:text-white"
                      >
                        Pemprov DKI Jakarta
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="transition-colors hover:text-white"
                      >
                        Kelurahan Cibubur
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2 pt-1">
                  <h4 className="flex items-center gap-1 text-xs font-extrabold tracking-wider text-white uppercase">
                    KONTAK &amp; PENGADUAN{" "}
                    <ArrowUpRight className="size-3.5 text-emerald-400" />
                  </h4>
                  <ul className="space-y-1.5 text-xs font-medium text-zinc-400">
                    <li className="flex items-center gap-2">
                      <Phone className="size-3.5 text-emerald-400" /> +62
                      812-3456-7890
                    </li>
                    <li className="flex items-center gap-2">
                      <Mail className="size-3.5 text-emerald-400" />{" "}
                      rptra.cibubur@jakarta.go.id
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Vertical Stack (Full Map Card + Connect Card) */}
          <div className="flex flex-col space-y-4 lg:col-span-6">
            {/* 1. Full Google Maps Card with Absolute Floating Overlay Box */}
            <div className="relative h-60 w-full overflow-hidden rounded-2xl border border-slate-800 bg-[#141A29] shadow-md">
              {/* Full background Google Maps iframe */}
              <div className="absolute inset-0 size-full overflow-hidden">
                <iframe
                  title="Peta Lokasi RPTRA Cibubur"
                  src="https://maps.google.com/maps?q=-6.3605,106.8837&hl=id&z=16&output=embed"
                  width="100%"
                  height="130%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="pointer-events-none absolute -top-12 left-0 h-[130%] w-full opacity-75 transition-opacity duration-300 hover:opacity-100"
                />
              </div>

              {/* Absolute Floating Info Box at Bottom of Map */}
              <div className="absolute inset-x-3 bottom-3 z-10 flex items-center justify-between gap-3 rounded-xl border border-white/40 bg-white/85 p-3.5 text-[#0B0E17] shadow-lg backdrop-blur-md">
                <div>
                  <h4 className="text-base font-black tracking-tight text-[#0B0E17] uppercase sm:text-lg">
                    CIBUBUR PARK
                  </h4>
                  <p className="text-[11px] font-semibold text-zinc-600 sm:text-xs">
                    Jl. Cibubur I No. 42, RT.04/RW.01, Kel. Cibubur
                  </p>
                </div>

                <a
                  href="https://maps.google.com/?q=RPTRA+Cibubur"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-lime-400 px-3.5 py-2 text-xs font-black text-[#0B0E17] uppercase shadow-xs transition-transform hover:scale-105 hover:bg-lime-300"
                >
                  PETUNJUK RUTE
                  <ArrowUpRight className="size-3.5" />
                </a>
              </div>
            </div>

            {/* 2. Compact Connect Card (Balanced Layout) */}
            <div className="flex items-center justify-between rounded-2xl bg-[#D6D4F7] px-6 py-4 text-[#0B0E17] shadow-md">
              <h4 className="text-base font-black tracking-tight text-[#0B0E17] uppercase sm:text-lg">
                CONNECT WITH US
              </h4>

              {/* Social Media SVG Icons */}
              <div className="flex items-center gap-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex size-9 items-center justify-center rounded-xl bg-white text-[#0B0E17] shadow-2xs transition-transform hover:scale-110 hover:text-emerald-700"
                  aria-label="Instagram"
                >
                  <ComputerIcon className="size-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex size-9 items-center justify-center rounded-xl bg-white text-[#0B0E17] shadow-2xs transition-transform hover:scale-110 hover:text-blue-700"
                  aria-label="Facebook"
                >
                  <AdIcon className="size-4" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex size-9 items-center justify-center rounded-xl bg-white text-[#0B0E17] shadow-2xs transition-transform hover:scale-110 hover:text-red-600"
                  aria-label="YouTube"
                >
                  <TvIcon className="size-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT BAR */}
        <div className="flex flex-col items-end pt-6 text-xs text-zinc-500">
          <p>
            © {new Date().getFullYear()} RPTRA Cibubur. Hak Cipta Dilindungi
            Undang-Undang.
          </p>
        </div>
      </div>
    </footer>
  );
}

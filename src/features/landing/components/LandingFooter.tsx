import {
  ArrowUpRight,
  Phone,
  Mail,
  ComputerIcon,
  AdIcon,
  TvIcon,
} from "lucide-react";

export default function LandingFooter() {
  return (
    <footer className="bg-[#041D17] p-6 text-emerald-100/90">
      <div className="mx-auto max-w-7xl sm:px-4 lg:px-8">
        {/* MAIN FOOTER GRID (2 COLUMNS) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-12">
          {/* LEFT SIDE: Brand Info + 2 Columns Links */}
          <div className="flex flex-col space-y-6 lg:col-span-6">
            {/* Logo Brand & Short Description */}
            <div>
              <span className="text-xl font-extrabold tracking-tight text-white uppercase">
                RPTRA CIBUBUR
              </span>
              <p className="mt-3 max-w-md text-xs leading-relaxed font-medium text-emerald-200/70">
                Ruang Publik Terpadu Ramah Anak Kelurahan Cibubur, Jakarta
                Timur. Sarana interaksi warga, arena bermain ramah anak, dan
                tempat kegiatan sosial 100% bebas biaya.
              </p>
            </div>

            {/* Links Divided into 2 Columns (Side-by-Side: Instansi Terkait vs Kontak & Pengaduan) */}
            <div className="grid grid-cols-1 gap-8 pt-2 sm:grid-cols-2">
              {/* Column 1: Instansi Terkait */}
              <div className="space-y-3">
                <h4 className="flex items-center gap-1 text-xs font-extrabold tracking-wider text-white uppercase">
                  INSTANSI TERKAIT{" "}
                  <ArrowUpRight className="size-3.5 text-emerald-300" />
                </h4>
                <ul className="space-y-2 text-xs font-medium text-emerald-200/70">
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
                    <a href="#" className="transition-colors hover:text-white">
                      Kelurahan Cibubur
                    </a>
                  </li>
                </ul>
              </div>

              {/* Column 2: Kontak & Pengaduan */}
              <div className="space-y-3">
                <h4 className="text-xs font-extrabold tracking-wider text-white uppercase">
                  KONTAK &amp; PENGADUAN
                </h4>
                <ul className="space-y-2 text-xs font-medium text-emerald-200/70">
                  <li className="flex items-center gap-2">
                    <Phone className="size-3.5 text-emerald-300" /> +62
                    812-3456-7890
                  </li>
                  <li className="flex items-center gap-2">
                    <Mail className="size-3.5 text-emerald-300" />{" "}
                    rptra.cibubur@jakarta.go.id
                  </li>
                </ul>
              </div>
            </div>
            {/* BOTTOM COPYRIGHT BAR */}
            <p className="pb-6 text-xs text-emerald-300/50 md:pb-0">
              © {new Date().getFullYear()} RPTRA Cibubur. Hak Cipta Dilindungi
              Undang-Undang.
            </p>
          </div>

          {/* RIGHT SIDE: Vertical Stack (Full Map Card + Connect Card) */}
          <div className="flex flex-col space-y-4 lg:col-span-6">
            {/* 1. Full Google Maps Card with Absolute Floating Overlay Box */}
            <div className="relative h-50 w-full overflow-hidden rounded-2xl border border-emerald-900/80 bg-[#072B22] shadow-md">
              {/* Full background Google Maps iframe */}
              <div className="absolute inset-0 size-full overflow-hidden">
                <iframe
                  title="Peta Lokasi RPTRA Cibubur"
                  src="https://maps.google.com/maps?q=-6.3605,106.8837&hl=id&z=16&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="pointer-events-none absolute -top-12 left-0 h-[130%] w-full opacity-75 transition-opacity duration-300 hover:opacity-100"
                />
              </div>

              {/* Absolute Floating Info Box at Bottom of Map */}
              <div className="absolute inset-x-3 bottom-3 z-10 flex items-center justify-between gap-3 rounded-xl border border-white/40 bg-white/90 p-3.5 text-[#0B0E17] shadow-lg backdrop-blur-md">
                <div>
                  <h4 className="text-base font-semibold tracking-tight text-[#0B0E17] uppercase sm:text-lg">
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
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-[#A7F3D0] px-3.5 py-2 text-xs font-semibold text-emerald-950 uppercase shadow-xs transition-transform hover:scale-105 hover:bg-emerald-200"
                >
                  PETUNJUK RUTE
                  <ArrowUpRight className="size-3.5" />
                </a>
              </div>
            </div>

            {/* 2. Compact Connect Card (Fresh Mint Theme) */}
            <div className="flex items-center justify-between rounded-2xl bg-[#A7F3D0] px-6 py-4 text-emerald-950 shadow-md">
              <h4 className="text-base font-semibold tracking-tight text-emerald-950 uppercase sm:text-lg">
                CONNECT WITH US
              </h4>

              {/* Social Media SVG Icons */}
              <div className="flex items-center gap-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex size-9 items-center justify-center rounded-xl bg-emerald-950 text-[#A7F3D0] shadow-2xs transition-transform hover:scale-110 hover:bg-emerald-900"
                  aria-label="Instagram"
                >
                  <ComputerIcon className="size-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex size-9 items-center justify-center rounded-xl bg-emerald-950 text-[#A7F3D0] shadow-2xs transition-transform hover:scale-110 hover:bg-emerald-900"
                  aria-label="Facebook"
                >
                  <AdIcon className="size-4" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex size-9 items-center justify-center rounded-xl bg-emerald-950 text-[#A7F3D0] shadow-2xs transition-transform hover:scale-110 hover:bg-emerald-900"
                  aria-label="YouTube"
                >
                  <TvIcon className="size-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

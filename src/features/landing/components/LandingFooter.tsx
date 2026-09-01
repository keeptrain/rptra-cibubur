import { ArrowUpRight, Phone, Mail } from "lucide-react";

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
        </div>
      </div>
    </footer>
  );
}

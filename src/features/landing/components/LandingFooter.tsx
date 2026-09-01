import { ArrowUpRight, Phone, Mail } from "lucide-react";
import Image from "next/image";

export default function LandingFooter() {
  return (
    <footer className="bg-black p-6 text-emerald-100/90">
      <div className="mx-auto max-w-7xl sm:px-4 lg:px-8">
        {/* MAIN FOOTER GRID (2 COLUMNS) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-12">
          {/* Left Side: Casual Chat Asset + motivasi di samping */}
          <div className="flex items-center gap-4 lg:col-span-6">
            <Image
              src="/assets/casual-chat_4byz.svg"
              alt="Obrolan Warga"
              width={220}
              height={220}
              className="h-auto w-1/2 object-contain opacity-80"
            />
            <div className="flex-1 rounded-xl border border-white/10 bg-white/4 p-3">
              <p className="text-xs leading-relaxed font-medium text-neutral-100 italic">
                “Taman bukan sekadar ruang hijau, tapi ruang tumbuh — tempat
                anak tertawa, warga saling sapa, dan harapan disemai bersama.”
              </p>
            </div>
          </div>
          {/* Right Side: Brand Info + 2 Columns Links */}
          <div className="flex flex-col space-y-6 lg:col-span-6">
            {/* Logo Brand & Short Description */}
            <div>
              <span className="text-xl font-extrabold tracking-tight text-white uppercase">
                RPTRA CIBUBUR
              </span>
              <p className="mt-3 max-w-md text-xs leading-relaxed font-medium text-white/70">
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
                  <ArrowUpRight className="size-3.5 text-neutral-100" />
                </h4>
                <ul className="space-y-2 text-xs font-medium text-white/70">
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
                <ul className="space-y-2 text-xs font-medium text-white">
                  <li className="flex items-center gap-2">
                    <Phone className="size-3.5 text-neutral-100" /> +62
                    812-3456-7890
                  </li>
                  <li className="flex items-center gap-2">
                    <Mail className="size-3.5 text-neutral-100" />{" "}
                    rptra.cibubur@jakarta.go.id
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

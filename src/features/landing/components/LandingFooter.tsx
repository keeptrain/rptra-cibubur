import { Trees, Phone, Mail, Clock, Heart, ExternalLink, MessageSquare } from "lucide-react";

export default function LandingFooter() {
  return (
    <footer className="bg-zinc-950 text-zinc-300 pt-16 pb-12 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-zinc-800/80">
          
          {/* Brand & Description */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-md">
                <Trees className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                RPTRA Cibubur
              </span>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
              Ruang Publik Terpadu Ramah Anak (RPTRA) Cibubur, Jakarta Timur. Sarana interaksi warga, wahana bermain anak, pusat olahraga, dan kegiatan sosial gratis bagi masyarakat.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold pt-1">
              <Clock className="w-4 h-4" /> Buka Setiap Hari: 06:00 - 18:00 WIB
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <a href="#zona-taman" className="hover:text-emerald-400 transition-colors">
                  Fasilitas &amp; Zona Taman
                </a>
              </li>
              <li>
                <a href="#agenda" className="hover:text-emerald-400 transition-colors">
                  Agenda &amp; Kegiatan Warga
                </a>
              </li>
              <li>
                <a href="#tata-tertib" className="hover:text-emerald-400 transition-colors">
                  Tata Tertib Berkunjung
                </a>
              </li>
              <li>
                <a href="#lokasi" className="hover:text-emerald-400 transition-colors">
                  Lokasi &amp; Akses Rute
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">
              Kontak Pengelola
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+62 812-3456-7890 (Pengelola)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>rptra.cibubur@jakarta.go.id</span>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="#" className="underline text-emerald-400 hover:text-emerald-300">
                  Kotak Suara &amp; Saran Warga
                </a>
              </li>
            </ul>
          </div>

          {/* Partner & Gov Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">
              Tautan Resmi
            </h4>
            <ul className="space-y-2 text-xs font-medium text-zinc-400">
              <li>
                <a href="https://ppapp.jakarta.go.id" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1 transition-colors">
                  Dinas PPAPP DKI <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://jakarta.go.id" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1 transition-colors">
                  Pemprov DKI Jakarta <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white flex items-center gap-1 transition-colors">
                  Kelurahan Cibubur <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-zinc-500">
          <p>
            © {new Date().getFullYear()} RPTRA Cibubur. Ruang Publik Terpadu Ramah Anak Kelurahan Cibubur, Jakarta Timur.
          </p>
          <div className="flex items-center gap-1 text-zinc-400">
            Dikelola dengan <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> untuk Kebahagiaan Warga
          </div>
        </div>

      </div>
    </footer>
  );
}

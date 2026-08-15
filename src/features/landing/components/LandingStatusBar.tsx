import { Clock, Sun, BellRing, Sparkles } from "lucide-react";

export default function LandingStatusBar() {
  return (
    <div className="relative -mt-6 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 p-1 shadow-xl shadow-emerald-700/20">
        <div className="rounded-[22px] bg-emerald-950/90 backdrop-blur-md px-6 py-4 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 divide-y md:divide-y-0 md:divide-x divide-emerald-800/80">
            
            {/* Live Operational Status */}
            <div className="flex items-center gap-3.5 pt-2 md:pt-0 pb-2 md:pb-0 md:pr-4">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Status Taman
                </div>
                <div className="text-sm font-bold text-white mt-0.5">
                  Buka Hari Ini <span className="text-emerald-300 font-medium">(06:00 - 18:00 WIB)</span>
                </div>
              </div>
            </div>

            {/* Weather Info */}
            <div className="flex items-center gap-3.5 pt-3 md:pt-0 pb-2 md:pb-0 md:px-4">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
                <Sun className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Cuaca Cibubur
                </div>
                <div className="text-sm font-bold text-white mt-0.5">
                  28°C Cerah Sejuk <span className="text-amber-200 font-medium">(Bagus untuk bermain)</span>
                </div>
              </div>
            </div>

            {/* Announcement Ticker */}
            <div className="flex items-center gap-3.5 pt-3 md:pt-0 md:pl-4">
              <div className="w-10 h-10 rounded-2xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300 shrink-0">
                <BellRing className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-teal-300 uppercase tracking-wider">
                  Pengumuman Kegiatan
                </div>
                <div className="text-sm font-bold text-white mt-0.5 line-clamp-1">
                  Posyandu Balita &amp; Lansia Rutin Rabu Minggu Ke-2
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

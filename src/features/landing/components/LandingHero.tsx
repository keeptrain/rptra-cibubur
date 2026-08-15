import {
  Trees,
  ShieldCheck,
  Play,
  ArrowUpRight,
  CalendarIcon,
} from "lucide-react";
import Link from "next/link";

function HeroTop() {
  return (
    <div className="relative grid min-h-0 flex-1 grid-cols-1 overflow-hidden bg-linear-to-br from-emerald-100/90 via-emerald-50/80 to-emerald-100/40 lg:grid-cols-12">
      {/* Left Side: Big Typography */}
      <div className="relative z-10 flex flex-col justify-center gap-2 px-8 sm:gap-4 lg:col-span-7">
        <span className="inline-block text-xs font-extrabold tracking-widest text-emerald-700 uppercase sm:text-sm">
          Ruang Publik Terpadu Ramah Anak
        </span>
        <h1 className="text-3xl leading-[0.95] font-black tracking-tight text-emerald-950 uppercase drop-shadow-xs sm:text-5xl lg:text-6xl xl:text-7xl">
          RPTRA <br /> CIBUBUR <br /> PARK
        </h1>
      </div>

      {/* Right Side: Visual Showcase Area */}
      <div className="relative hidden items-end justify-center overflow-hidden sm:flex lg:col-span-5">
        {/* Background Light Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.15),transparent_70%)]" />

        {/* People / Card Graphic */}
        <div className="relative z-10 flex w-full max-w-md items-end justify-center gap-4 px-6 pt-8"></div>
      </div>
    </div>
  );
}

function HeroBottom() {
  return (
    <div className="grid shrink-0 grid-cols-1 divide-y divide-emerald-100 border-t border-emerald-200/70 bg-white md:grid-cols-3 md:divide-x md:divide-y-0">
      {/* Column 1 */}
      <div className="flex flex-col justify-between space-y-3 p-5 sm:space-y-4 sm:p-6 lg:p-8">
        <div className="space-y-2 sm:space-y-3">
          <Trees className="h-5 w-5 sm:h-6 sm:w-6" />
          <h3 className="text-lg font-black tracking-wide text-emerald-950 uppercase sm:text-xl">
            Fasilitas Lengkap
          </h3>
          <p className="line-clamp-2 text-xs leading-relaxed font-medium text-emerald-800/80 sm:text-sm">
            Taman terbuka hijau, perpustakaan mini ber-AC, lapangan olahraga,
            dan wahana bermain anak.
          </p>
        </div>

        <div className="pt-1">
          <a
            href="#zona-taman"
            className="group inline-flex items-center gap-2.5 text-xs font-bold tracking-wider text-emerald-900 uppercase transition-colors hover:text-emerald-600 sm:text-sm"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white shadow-md shadow-orange-500/30 transition-transform group-hover:scale-105 sm:h-9 sm:w-9">
              <Play className="ml-0.5 h-3.5 w-3.5 fill-white" />
            </span>
            LIHAT ZONA TAMAN
          </a>
        </div>
      </div>

      {/* Column 2 */}
      <div className="flex flex-col justify-between space-y-3 p-5 sm:space-y-4 sm:p-6 lg:p-8">
        <div className="space-y-2 sm:space-y-3">
          <ShieldCheck className="size-5 sm:size-6" />
          <h3 className="text-lg font-black tracking-wide text-emerald-950 uppercase sm:text-xl">
            Keamanan Terjaga
          </h3>
          <p className="line-clamp-2 text-xs leading-relaxed font-medium text-emerald-800/80 sm:text-sm">
            Lingkungan ramah keluarga dengan lantai karet aman peredam benturan
            dan area bebas rokok.
          </p>
        </div>

        <div className="pt-1">
          <a
            href="#tata-tertib"
            className="inline-flex items-center justify-center rounded-full bg-[#A3E635] px-5 py-2.5 text-[11px] font-black tracking-wider text-emerald-950 uppercase shadow-md shadow-lime-500/20 transition-all hover:scale-105 hover:bg-[#86EFAC] sm:px-6 sm:py-3 sm:text-xs"
          >
            SELENGKAPNYA +
          </a>
        </div>
      </div>

      {/* Column 3 (Highlighted Card) */}
      <div className="relative flex flex-col justify-between space-y-3 overflow-hidden bg-linear-to-b from-emerald-600 via-teal-700 to-emerald-800 p-5 text-white sm:space-y-4 sm:p-6 lg:p-8">
        <div className="relative z-10 space-y-2 sm:space-y-3">
          <CalendarIcon className="size-5 sm:size-6" />

          <h3 className="text-lg font-black tracking-wide text-white uppercase sm:text-xl">
            AGENDA WARGA
          </h3>
          <p className="line-clamp-2 text-xs leading-relaxed font-medium text-emerald-100 sm:text-sm">
            Ikuti senam rutin, posyandu balita &amp; lansia gratis setiap
            minggu.
          </p>
        </div>

        <div className="relative z-10 pt-1">
          <Link
            href="/agenda"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-[11px] font-black tracking-wider text-emerald-950 uppercase shadow-xl transition-all hover:scale-105 hover:bg-emerald-50 sm:px-6 sm:py-3 sm:text-xs"
          >
            EXPLORE AGENDA
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LandingHero() {
  return (
    <section
      id="hero"
      className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-7xl flex-col p-4 lg:h-[calc(100vh-5rem)] lg:p-8"
    >
      <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-emerald-200/80 bg-[#F4FBF7] text-emerald-950 shadow-2xl shadow-emerald-950/5">
        <HeroTop />
        <HeroBottom />
      </div>
    </section>
  );
}

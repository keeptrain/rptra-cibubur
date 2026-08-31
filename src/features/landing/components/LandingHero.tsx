import {
  Trees,
  Play,
  ArrowUpRight,
  CalendarIcon,
  HistoryIcon,
  ArrowUpRightIcon,
} from "lucide-react";
import Link from "next/link";
import ParkLiveStatus from "./ParkLiveStatus";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";

function HeroTop() {
  return (
    <div className="relative flex flex-1 flex-col justify-center overflow-hidden bg-linear-to-br from-emerald-100/90 via-emerald-50/80 to-emerald-100/40">
      <div className="grid h-full w-full grid-cols-1 items-stretch lg:grid-cols-12">
        {/* Left Side: Main Title - Wide Horizontally with Padding */}
        <div className="relative z-10 flex flex-col justify-center space-y-2 p-6 sm:space-y-3 sm:p-8 lg:col-span-7 lg:p-10 xl:col-span-8">
          <span className="inline-block text-xs font-semibold tracking-widest text-emerald-700 uppercase sm:text-sm">
            Ruang Publik Terpadu Ramah Anak
          </span>
          <h1 className="text-3xl leading-tight font-bold tracking-tight text-emerald-950 uppercase sm:text-5xl lg:text-6xl xl:text-7xl">
            TAMAN RPTRA CIBUBUR
          </h1>
        </div>

        {/* Right Side: Full Fill Stat Stack Box (Edge-to-Edge Full Height Fill) */}
        <div className="relative flex flex-col justify-center divide-y divide-emerald-200/80 text-emerald-950 lg:col-span-5 lg:border-l lg:border-emerald-200/80 xl:col-span-4">
          <HeroStats />
        </div>
      </div>
    </div>
  );
}

function HeroStats() {
  const stats = [
    { value: "120+", label: "TOTAL KEGIATAN" },
    { value: "1.000+", label: "PENGUNJUNG / BULAN" },
    { value: "4.6 / 5", label: "Google Maps Rating" },
  ];
  return (
    <>
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="flex flex-1 items-center justify-between px-6 py-4 md:px-8"
        >
          <span className="text-3xl font-bold tracking-tight text-emerald-950 sm:text-4xl">
            {stat.value}
          </span>
          <span className="max-w-30 text-right text-[11px] leading-snug font-bold tracking-widest text-emerald-900/80 uppercase">
            {stat.label}
          </span>
        </div>
      ))}
    </>
  );
}

function HeroBottom() {
  return (
    <div className="grid shrink-0 grid-cols-1 divide-y divide-emerald-100 border-t border-emerald-200/70 bg-white md:grid-cols-3 md:divide-x md:divide-y-0">
      {/* Column 3 (Highlighted Card) */}
      <div className="relative flex flex-col justify-between space-y-3 overflow-hidden bg-linear-to-b from-emerald-600 via-teal-700 to-emerald-800 p-5 sm:space-y-4 sm:p-6 lg:p-8">
        <div className="relative z-10 space-y-2 sm:space-y-3">
          <CalendarIcon className="size-5 text-white sm:size-6" />

          <h3 className="text-lg font-bold tracking-wide text-white uppercase sm:text-xl">
            AGENDA WARGA
          </h3>
        </div>

        <div className="relative z-10 pt-1">
          <Button asChild variant="outline">
            <Link href="/agenda">
              Explore Agenda
              <ArrowUpRightIcon className="size-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Column 2 */}
      <div className="flex flex-col justify-between space-y-3 p-5 sm:space-y-4 sm:p-6 lg:p-8">
        <div className="space-y-2 sm:space-y-3">
          <HistoryIcon className="size-5 sm:size-6" />
          <h3 className="text-lg font-bold tracking-wide text-emerald-950 uppercase sm:text-xl">
            Kegiatan Terakhir
          </h3>
        </div>

        <div className="pt-1">
          <span>-</span>
        </div>
      </div>

      {/* Column 1 */}
      <div className="flex flex-col justify-between space-y-3 p-5 sm:space-y-4 sm:p-6 lg:p-8">
        <div className="space-y-2 sm:space-y-3">
          <Trees className="h-5 w-5 sm:h-6 sm:w-6" />
          <h3 className="text-lg font-bold tracking-wide text-emerald-950 uppercase sm:text-xl">
            Fasilitas Lengkap
          </h3>
        </div>

        <div className="pt-1">
          <a
            href="https://www.youtube.com/watch?v=6-bRjN5lxsw"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 text-xs font-bold tracking-wider text-emerald-900 uppercase transition-colors hover:text-emerald-600 sm:text-sm"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white shadow-md shadow-emerald-600/20 transition-transform group-hover:scale-105 sm:h-9 sm:w-9">
              <Play className="ml-0.5 h-3.5 w-3.5 fill-white" />
            </span>
            LIHAT ZONA TAMAN
          </a>
        </div>
      </div>
    </div>
  );
}

function ParkLiveStatusSkeleton() {
  return (
    <div className="flex animate-pulse flex-col">
      <div className="w-full border-t border-zinc-200/70 bg-white/90 px-6 py-2 sm:px-8">
        <div className="flex items-center gap-3">
          <div className="size-2.5 rounded-full bg-zinc-200" />
          <div className="h-3.5 w-64 rounded-md bg-zinc-100" />
        </div>
      </div>
      <div className="w-full border-zinc-200/70 bg-white/90 px-6 py-1 sm:px-8">
        <div className="flex h-3.5 w-full rounded-md bg-zinc-100" />
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
        <Suspense fallback={<ParkLiveStatusSkeleton />}>
          <ParkLiveStatus />
        </Suspense>
        <HeroBottom />
      </div>
    </section>
  );
}

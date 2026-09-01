import Link from "next/link";
import { CalendarIcon, HistoryIcon, ArrowUpRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { HeroAgenda } from "@/features/landing/actions/service";

function AgendaTerdekat({ agenda }: { agenda: HeroAgenda | null }) {
  if (!agenda) {
    return (
      <>
        <h3 className="text-lg font-semibold tracking-wide text-white sm:text-xl">
          Belum ada agenda terdekat
        </h3>
        <div className="pt-1">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="bg-white text-emerald-800 hover:bg-emerald-50"
          >
            <Link href="/agenda">
              Explore Agenda <ArrowUpRightIcon className="size-4" />
            </Link>
          </Button>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="space-y-1 pt-1">
        <h3 className="line-clamp-2 text-base leading-tight font-semibold text-white sm:text-lg">
          {agenda.title}
        </h3>
        <p className="text-sm text-white/90">
          {agenda.formattedDate} • {agenda.startTime} - {agenda.endTime} WIB{" "}
          <br /> {agenda.location}
        </p>
      </div>
      <div className="pt-3">
        <Button asChild variant="outline">
          <Link href={`/agenda/${agenda.id}`}>
            Lihat Detail <ArrowUpRightIcon className="size-4" />
          </Link>
        </Button>
      </div>
    </>
  );
}

function KegiatanTerakhir({ agenda }: { agenda: HeroAgenda | null }) {
  if (!agenda) {
    return (
      <>
        <h3 className="text-lg font-semibold tracking-wide text-emerald-950 uppercase sm:text-xl">
          Kegiatan Terakhir
        </h3>
        <span className="pt-1 text-xs text-zinc-400">
          Belum ada kegiatan selesai
        </span>
      </>
    );
  }
  return (
    <>
      <div className="space-y-1">
        <h3 className="line-clamp-2 text-sm leading-tight font-semibold text-emerald-950 sm:text-base">
          {agenda.title}
        </h3>
        <p className="text-sm">
          {agenda.formattedDate} <br /> {agenda.location}
        </p>
      </div>
      <Button asChild variant="link" className="w-fit p-0">
        <Link href={`/agenda/${agenda.id}`}>
          Lihat dokumentasi <ArrowUpRightIcon className="size-4" />
        </Link>
      </Button>
    </>
  );
}

interface HeroBottomProps {
  nearest: HeroAgenda | null;
  latest: HeroAgenda | null;
}

export default function HeroBottom({ nearest, latest }: HeroBottomProps) {
  return (
    <div className="grid shrink-0 grid-cols-1 divide-y divide-emerald-100 border-t border-emerald-200/70 bg-white md:grid-cols-3 md:divide-x md:divide-y-0">
      {/* Agenda Terdekat */}
      <div className="relative flex flex-col justify-between space-y-3 overflow-hidden bg-linear-to-b from-emerald-600 via-teal-700 to-emerald-800 p-5 sm:space-y-4 sm:p-6 lg:p-8">
        <div className="relative z-10 flex items-center gap-2">
          <CalendarIcon className="size-5 text-white sm:size-6" />
          <span className="rounded-full bg-white/20 px-2.5 py-1 text-xs font-semibold tracking-widest text-white uppercase">
            Agenda Terdekat
          </span>
        </div>
        <AgendaTerdekat agenda={nearest} />
      </div>

      {/* Kegiatan Terakhir */}
      <div className="flex flex-col justify-between space-y-3 p-5 sm:space-y-4 sm:p-6 lg:p-8">
        <div className="flex items-center gap-2">
          <HistoryIcon className="size-5 text-emerald-700 sm:size-6" />
          <span className="text-xs font-semibold tracking-widest text-emerald-700 uppercase">
            Kegiatan Terakhir
          </span>
        </div>
        <KegiatanTerakhir agenda={latest} />
      </div>

      {/* Fasilitas Lengkap — peta alamat dari footer */}
      <div className="relative flex min-h-48 flex-col overflow-hidden bg-[#072B22] p-0">
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
        <div className="relative z-10 flex h-full flex-1 flex-col justify-end p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3 rounded-xl border border-white/40 bg-white/90 p-2 shadow-lg backdrop-blur-md">
            <div>
              <h4 className="text-sm font-semibold tracking-tight text-[#0B0E17] uppercase">
                CIBUBUR PARK
              </h4>
              <p className="text-xs font-semibold text-neutral-500">
                ★ 4.6 / 5 Google Maps Rating
              </p>
            </div>

            <Button asChild variant="ghost">
              <a
                href="https://maps.google.com/?q=RPTRA+Cibubur"
                target="_blank"
                rel="noreferrer"
              >
                Rute <ArrowUpRightIcon className="size-3.5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  CheckCircle2,
  FileText,
  Building2,
  Info,
  Clock3,
} from "lucide-react";
import { DetailAgendaItem } from "../api/getAgendaById";

interface DetailAgendaCardProps {
  agenda: DetailAgendaItem;
  children?: React.ReactNode;
}

/**
 * Server-Only Reusable Agenda Detail Card Component.
 * Content-first, clean monochrome styling, elegant metadata presentation.
 */
export default function DetailAgendaCard({
  agenda,
  children,
}: DetailAgendaCardProps) {
  const isCompleted = agenda.status === "COMPLETED";

  return (
    <>
      <div className="space-y-6">
        {/* HEADER: BADGE & TITLE */}
        <div className="space-y-3 border-b border-zinc-100 pb-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-zinc-600">
              <span className="flex items-center gap-1.5 rounded-md bg-zinc-100 px-2.5 py-1 text-zinc-800">
                <Calendar className="size-3.5 text-zinc-500" />
                {new Date(agenda.eventDate).toLocaleDateString("id-ID", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>

              <span className="flex items-center gap-1.5 rounded-md bg-zinc-100 px-2.5 py-1 text-zinc-800">
                <Clock className="size-3.5 text-zinc-500" />
                {agenda.startTime} - {agenda.endTime} WIB
              </span>
            </div>

            {/* STATUS BADGE (CLEAN MINIMALIST) */}
            <span
              className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${
                isCompleted
                  ? "bg-zinc-100 text-zinc-700"
                  : "border border-lime-500 bg-lime-100 text-lime-900"
              }`}
            >
              {isCompleted ? (
                <>
                  <CheckCircle2 className="size-3.5" />
                  Terlaksana
                </>
              ) : (
                <>
                  <Clock3 className="size-3.5 text-lime-700" />
                  Akan Datang
                </>
              )}
            </span>
          </div>

          {/* MAIN TITLE (HERO FOCUS) */}
          <h1 className="text-xl font-black tracking-tight text-zinc-900 sm:text-2xl">
            {agenda.title}
          </h1>
        </div>

        {/* META INFO GRID (MONOCHROME & CLEAN) */}
        <div className="grid grid-cols-1 gap-4 rounded-xl border border-zinc-200/80 bg-zinc-50/70 p-4 sm:grid-cols-2">
          {/* LOCATION */}
          <div className="flex items-start gap-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-500">
              <MapPin className="size-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase">
                Lokasi / Area
              </span>
              <p className="text-xs font-bold text-zinc-800">
                {agenda.location}
              </p>
            </div>
          </div>

          {/* ORGANIZER */}
          <div className="flex items-start gap-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-500">
              <User className="size-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase">
                Penyelenggara
              </span>
              <p className="text-xs font-bold text-zinc-800">
                {agenda.organizer}
              </p>
            </div>
          </div>

          {/* TARGET AUDIENCE */}
          <div className="flex items-start gap-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-500">
              <Building2 className="size-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase">
                Target Peserta
              </span>
              <p className="text-xs font-bold text-zinc-800">
                {agenda.targetAudience}
              </p>
            </div>
          </div>

          {/* CONTACT PERSON */}
          <div className="flex items-start gap-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-500">
              <Info className="size-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase">
                Kontak Informasi
              </span>
              <p className="text-xs font-bold text-zinc-800">
                {agenda.contactPerson}
              </p>
            </div>
          </div>
        </div>

        {/* FULL DESCRIPTION SECTION */}
        <div className="space-y-2">
          <h3 className="flex items-center gap-2 text-xs font-bold tracking-wider text-zinc-900 uppercase">
            <FileText className="size-4 text-zinc-500" />
            Deskripsi & Rincian Kegiatan
          </h3>
          <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-4 text-xs leading-relaxed font-medium whitespace-pre-line text-zinc-700">
            {agenda.description}
          </div>
        </div>

        {/* SECONDARY IMAGE (DOCUMENTATION AT THE BOTTOM, NOT HERO BANNER) */}
        {agenda.bannerUrl ? (
          <div className="pt-2">
            <span className="mb-2 block text-[10px] font-bold tracking-wider text-zinc-400 uppercase">
              Foto / Lampiran Kegiatan
            </span>
            <div className="relative aspect-video w-full max-w-md overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100">
              <Image
                src={agenda.bannerUrl}
                width={640}
                height={360}
                alt={agenda.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        ) : null}
      </div>

      {/* OPTIONAL BOTTOM SLOT FOR ACTIONS */}
      {children ? (
        <div className="mt-6 border-t border-zinc-100 pt-4">{children}</div>
      ) : null}
    </>
  );
}

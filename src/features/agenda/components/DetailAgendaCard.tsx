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
  AlertTriangle,
} from "lucide-react";
import { DetailAgendaItem } from "../api/getAgendaById";

interface DetailAgendaCardProps {
  agenda: DetailAgendaItem;
  children?: React.ReactNode;
}

/**
 * Server-Only Reusable Agenda Detail Card Component.
 * Can be shared between Admin Management (/manajemen-agenda/[id])
 * and Public Warga View (/agenda/[id]).
 */
export default function DetailAgendaCard({
  agenda,
  children,
}: DetailAgendaCardProps) {
  const isCompleted = agenda.status === "COMPLETED";

  return (
    <div className="border border-slate-200 bg-white text-left shadow-2xs">
      {/* HERO BANNER IMAGE */}
      <div className="relative aspect-21/9 w-full overflow-hidden border-b border-slate-200 bg-slate-100">
        <Image
          src={agenda.bannerUrl}
          width={1280}
          height={720}
          alt={agenda.title}
          loading="eager"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 via-transparent to-transparent" />

        {/* BADGE ON BANNER */}
        <div className="absolute bottom-3 left-4 flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-bold shadow-2xs ${
              isCompleted
                ? "bg-sky-500 text-white"
                : "bg-amber-500 text-slate-950"
            }`}
          >
            {isCompleted ? (
              <>
                <CheckCircle2 className="size-3.5" />
                Terlaksana
              </>
            ) : (
              <>
                <AlertTriangle className="size-3.5" />
                Akan Datang
              </>
            )}
          </span>
        </div>
      </div>

      {/* CARD CONTENT BODY */}
      <div className="space-y-6 p-5">
        {/* TITLE & DATE TIME HEADER */}
        <div className="space-y-3 border-b border-slate-100 pb-4">
          <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-700">
            <span className="flex items-center gap-1.5 border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-emerald-700">
              <Calendar className="size-4 text-emerald-600" />
              {new Date(agenda.eventDate).toLocaleDateString("id-ID", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>

            <span className="flex items-center gap-1.5 border border-slate-200 bg-slate-100 px-2.5 py-1 text-slate-700">
              <Clock className="size-4 text-slate-500" />
              {agenda.startTime} - {agenda.endTime} WIB
            </span>
          </div>

          <h1 className="text-lg font-black text-slate-900 sm:text-xl">
            {agenda.title}
          </h1>
        </div>

        {/* META INFO GRID */}
        <div className="grid grid-cols-1 gap-4 border border-slate-200/80 bg-slate-50/60 p-4 sm:grid-cols-2">
          {/* LOCATION */}
          <div className="flex items-start gap-2.5">
            <div className="flex size-8 shrink-0 items-center justify-center border border-slate-200 bg-white text-slate-600">
              <MapPin className="size-4 text-emerald-600" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase">
                Lokasi / Area
              </span>
              <p className="text-xs font-bold text-slate-800">
                {agenda.location}
              </p>
            </div>
          </div>

          {/* ORGANIZER */}
          <div className="flex items-start gap-2.5">
            <div className="flex size-8 shrink-0 items-center justify-center border border-slate-200 bg-white text-slate-600">
              <User className="size-4 text-sky-600" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase">
                Penyelenggara
              </span>
              <p className="text-xs font-bold text-slate-800">
                {agenda.organizer}
              </p>
            </div>
          </div>

          {/* TARGET AUDIENCE */}
          <div className="flex items-start gap-2.5">
            <div className="flex size-8 shrink-0 items-center justify-center border border-slate-200 bg-white text-slate-600">
              <Building2 className="size-4 text-amber-600" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase">
                Target Peserta
              </span>
              <p className="text-xs font-bold text-slate-800">
                {agenda.targetAudience}
              </p>
            </div>
          </div>

          {/* CONTACT PERSON */}
          <div className="flex items-start gap-2.5">
            <div className="flex size-8 shrink-0 items-center justify-center border border-slate-200 bg-white text-slate-600">
              <Info className="size-4 text-indigo-600" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase">
                Kontak Informasi
              </span>
              <p className="text-xs font-bold text-slate-800">
                {agenda.contactPerson}
              </p>
            </div>
          </div>
        </div>

        {/* FULL DESCRIPTION SECTION */}
        <div className="space-y-2">
          <h3 className="flex items-center gap-2 text-xs font-bold tracking-wider text-slate-900 uppercase">
            <FileText className="size-4 text-slate-500" />
            Deskripsi & Rincian Kegiatan
          </h3>
          <div className="border border-slate-200 bg-slate-50/50 p-4 text-xs leading-relaxed font-medium whitespace-pre-line text-slate-700">
            {agenda.description}
          </div>
        </div>
      </div>

      {/* OPTIONAL BOTTOM SLOT (ACTIONS FOR ADMIN OR PUBLIC) */}
      {children}
    </div>
  );
}

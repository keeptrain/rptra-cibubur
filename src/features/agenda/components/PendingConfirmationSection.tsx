"use client";

import Link from "next/link";
import { Calendar, Clock, MapPin, User, CheckCircle2 } from "lucide-react";
import { AgendaItem } from "./AgendaListSection";

interface PendingConfirmationSectionProps {
  pendingAgendas: AgendaItem[];
  onConfirmCompleted?: (id: string) => void;
}

export default function PendingConfirmationSection({
  pendingAgendas,
  onConfirmCompleted,
}: PendingConfirmationSectionProps) {
  if (!pendingAgendas || pendingAgendas.length === 0) return null;

  return (
    <div className="border border-emerald-300 bg-white p-5 text-left shadow-2xs">
      {/* SECTION HEADER */}
      <div className="mb-4 flex flex-col gap-2 border-b border-emerald-200/60 pb-3">
        <h3 className="text-xs font-black tracking-wider text-emerald-950 uppercase">
          MEMERLUKAN KONFIRMASI KETERLAKSANAAN ({pendingAgendas.length})
        </h3>
        <p className="text-xs font-medium text-emerald-800">
          Jadwal berikut telah melewati jam pelaksanaan WIB. Apakah kegiatan sudah terlaksana?
        </p>
      </div>

      {/* PENDING ITEMS LIST */}
      <div className="space-y-3">
        {pendingAgendas.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-3 border border-emerald-200 bg-white p-4 shadow-2xs sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="space-y-1 text-left">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="bg-amber-100 px-2 py-0.5 font-bold text-amber-800">
                  Perlu Konfirmasi
                </span>
                <span className="font-semibold text-slate-500">{item.eventDate}</span>
              </div>

              <Link
                href={`/manajemen-agenda/${item.id}`}
                className="inline-block text-sm font-bold text-slate-900 transition-colors hover:text-emerald-600"
              >
                {item.title}
              </Link>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                <span className="flex items-center gap-1">
                  <Clock className="size-3 text-slate-400" />
                  {item.startTime} - {item.endTime} WIB
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="size-3 text-slate-400" />
                  {item.location}
                </span>
                <span className="flex items-center gap-1">
                  <User className="size-3 text-slate-400" />
                  {item.organizer}
                </span>
              </div>
            </div>

            {/* ACTION BUTTON TO TOGGLE COMPLETED */}
            <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0">
              <button
                type="button"
                onClick={() => onConfirmCompleted?.(item.id)}
                className="inline-flex items-center gap-1.5 bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white shadow-2xs transition-colors hover:bg-emerald-700"
              >
                <CheckCircle2 className="size-3.5" />
                Tandai Terlaksana
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

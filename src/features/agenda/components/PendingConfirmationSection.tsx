"use client";

import Link from "next/link";
import {
  AlertTriangle,
  Calendar,
  Clock,
  MapPin,
  User,
  CheckCircle2,
} from "lucide-react";
import { AgendaItem } from "./AgendaListSection";

interface PendingConfirmationSectionProps {
  agendas: AgendaItem[];
  onConfirmCompleted: (id: string) => void;
}

export default function PendingConfirmationSection({
  agendas,
  onConfirmCompleted,
}: PendingConfirmationSectionProps) {
  // Filter items where date & time has passed but status is still UPCOMING
  const pendingItems = agendas.filter((item) => {
    if (item.status === "COMPLETED") return false;

    // Check if event time has passed WIB
    const now = new Date();
    const wibFormatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Jakarta",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const parts = wibFormatter.formatToParts(now);
    const partMap: Record<string, string> = {};
    parts.forEach((p) => {
      partMap[p.type] = p.value;
    });

    const currentTodayStr = `${partMap.year}-${partMap.month}-${partMap.day}`;
    const currentTotalMinutes =
      (parseInt(partMap.hour, 10) % 24) * 60 + parseInt(partMap.minute, 10);

    if (item.eventDate < currentTodayStr) return true;
    if (item.eventDate > currentTodayStr) return false;

    const [eHour, eMin] = item.endTime.slice(0, 5).split(":").map(Number);
    const eventEndMinutes = (eHour || 0) * 60 + (eMin || 0);

    return currentTotalMinutes >= eventEndMinutes;
  });

  if (pendingItems.length === 0) return null;

  return (
    <div className="border border-emerald-300 bg-emerald-50/40 p-5 text-left shadow-2xs">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-2 border-b border-emerald-200/60 pb-3 mb-4">
        <div className="flex size-7 items-center justify-center rounded-lg bg-emerald-600 text-white">
          <AlertTriangle className="size-4" />
        </div>
        <div>
          <h3 className="text-xs font-black tracking-wider text-emerald-950 uppercase">
            MEMERLUKAN KONFIRMASI KETERLAKSANAAN ({pendingItems.length})
          </h3>
          <p className="text-xs font-medium text-emerald-800">
            Jadwal berikut telah melewati jam pelaksanaan WIB. Apakah kegiatan sudah terlaksana?
          </p>
        </div>
      </div>

      {/* PENDING ITEMS LIST */}
      <div className="space-y-3">
        {pendingItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-3 border border-emerald-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between shadow-2xs"
          >
            <div className="space-y-1 text-left">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="inline-flex items-center gap-1 bg-amber-100 px-2.5 py-0.5 text-[11px] font-bold text-amber-800">
                  <Clock className="size-3" />
                  Jam Lewat
                </span>
                <span className="flex items-center gap-1 font-bold text-slate-700">
                  <Calendar className="size-3.5 text-slate-400" />
                  {new Date(item.eventDate).toLocaleDateString("id-ID", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                  })}
                </span>
                <span className="text-slate-300">•</span>
                <span className="font-medium text-slate-600">
                  {item.startTime} - {item.endTime} WIB
                </span>
              </div>

              <Link
                href={`/manajemen-agenda/${item.id}`}
                className="inline-block text-sm font-bold text-slate-900 hover:text-emerald-600 transition-colors"
              >
                {item.title}
              </Link>

              <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-slate-500">
                <span className="flex items-center gap-1">
                  <MapPin className="size-3.5 text-slate-400" />
                  {item.location}
                </span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-1">
                  <User className="size-3.5 text-slate-400" />
                  {item.organizer}
                </span>
              </div>
            </div>

            {/* CONFIRMATION ACTION BUTTON */}
            <div className="flex shrink-0 items-center gap-2 pt-2 sm:pt-0">
              <button
                type="button"
                onClick={() => onConfirmCompleted(item.id)}
                className="inline-flex items-center gap-1.5 bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-2xs transition-colors hover:bg-emerald-700"
              >
                <CheckCircle2 className="size-4" />
                Tandai Terlaksana
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

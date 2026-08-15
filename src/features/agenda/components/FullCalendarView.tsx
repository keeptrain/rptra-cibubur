"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin } from "lucide-react";
import { AgendaItem } from "../constants/agendas";

interface FullCalendarViewProps {
  agendas: AgendaItem[];
}

export default function FullCalendarView({ agendas }: FullCalendarViewProps) {
  const [selectedDayNum, setSelectedDayNum] = useState<number>(15);

  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  const agendaDatesMap: Record<number, AgendaItem[]> = {
    15: [agendas[0]],
    16: [agendas[1], agendas[2]],
    18: [agendas[3]],
    19: [agendas[4]],
    20: [agendas[5]],
    21: [agendas[6]],
  };

  const selectedAgendas = agendaDatesMap[selectedDayNum] || [];

  return (
    <div className="space-y-6 pt-2">
      {/* CALENDAR CONTAINER CARD */}
      <div className="rounded-3xl border border-emerald-100/90 bg-white p-6 shadow-xs sm:p-8">
        
        {/* CALENDAR MONTH HEADER */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-xs">
              <Calendar className="size-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-tight text-emerald-950 uppercase sm:text-2xl">
                AGUSTUS 2026
              </h3>
              <p className="text-xs font-semibold text-emerald-700">
                Kalender Kegiatan Bulanan RPTRA Cibubur
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex size-9 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-900 transition-colors hover:bg-emerald-100"
              aria-label="Bulan Sebelumnya"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              className="flex size-9 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-900 transition-colors hover:bg-emerald-100"
              aria-label="Bulan Berikutnya"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        {/* DAYS OF WEEK HEADER */}
        <div className="grid grid-cols-7 gap-1 border-b border-emerald-100 pb-2 text-center text-xs font-bold text-emerald-950">
          <span className="text-red-500">Ming</span>
          <span>Sen</span>
          <span>Sel</span>
          <span>Rab</span>
          <span>Kam</span>
          <span>Jum</span>
          <span className="text-emerald-700">Sab</span>
        </div>

        {/* CALENDAR DAYS GRID (August 2026 starts on Saturday = offset 6) */}
        <div className="grid grid-cols-7 gap-1.5 pt-3">
          {/* Offset empty slots for Saturday start */}
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={`empty-${idx}`} className="h-14 sm:h-16 rounded-2xl bg-emerald-50/20" />
          ))}

          {/* Days 1 to 31 */}
          {daysInMonth.map((dayNum) => {
            const hasAgendas = agendaDatesMap[dayNum];
            const isSelected = selectedDayNum === dayNum;
            const isToday = dayNum === 15;

            return (
              <button
                key={dayNum}
                onClick={() => setSelectedDayNum(dayNum)}
                className={`relative flex h-14 flex-col items-center justify-between rounded-2xl border p-2 text-center transition-all sm:h-16 ${
                  isSelected
                    ? "border-emerald-600 bg-emerald-600 text-white shadow-xs"
                    : isToday
                    ? "border-emerald-500 bg-emerald-100 text-emerald-950 font-bold"
                    : "border-emerald-100 bg-white text-emerald-950 hover:border-emerald-200 hover:bg-emerald-50/60"
                }`}
              >
                <span className="text-xs font-bold sm:text-sm">{dayNum}</span>

                {/* Event Indicator Badges */}
                {hasAgendas && (
                  <span
                    className={`flex items-center justify-center rounded-full px-2 py-0.5 text-[9px] font-bold ${
                      isSelected
                        ? "bg-lime-400 text-emerald-950"
                        : "bg-emerald-100 text-emerald-900"
                    }`}
                  >
                    {hasAgendas.length} Acara
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* SELECTED DAY AGENDA PANEL */}
      <div className="rounded-3xl border border-emerald-100/90 bg-white p-6 shadow-xs sm:p-8">
        <h4 className="text-base font-bold text-emerald-950 uppercase sm:text-lg">
          Agenda Tanggal {selectedDayNum} Agustus 2026
        </h4>

        {selectedAgendas.length === 0 ? (
          <p className="mt-3 text-xs font-medium text-emerald-800/70">
            Tidak ada agenda terjadwal pada tanggal ini.
          </p>
        ) : (
          <div className="mt-4 space-y-3">
            {selectedAgendas.map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-between rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4 sm:flex-row sm:items-center"
              >
                <div>
                  <span className="inline-block rounded-full bg-emerald-100 px-3 py-0.5 text-[10px] font-bold text-emerald-900">
                    {item.categoryLabel}
                  </span>
                  <h5 className="mt-1.5 text-base font-bold text-emerald-950">
                    {item.title}
                  </h5>
                  <div className="mt-1 flex flex-wrap gap-4 text-xs font-medium text-emerald-900/80">
                    <span className="flex items-center gap-1">
                      <Clock className="size-3.5 text-emerald-600" /> {item.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="size-3.5 text-emerald-600" /> {item.location}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

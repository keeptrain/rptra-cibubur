"use client";

import { useState } from "react";
import { Sparkles, Calendar, Layers } from "lucide-react";
import { MOCK_AGENDAS } from "./constants/agendas";
import TodayHighlight from "./components/TodayHighlight";
import SevenDaySchedule from "./components/SevenDaySchedule";
import FullCalendarView from "./components/FullCalendarView";

export default function AgendaPage() {
  const [activeView, setActiveView] = useState<"highlight" | "calendar">(
    "highlight",
  );
  const todayAgenda = MOCK_AGENDAS.find((a) => a.isToday) || MOCK_AGENDAS[0];

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* PAGE HEADER & VIEW TOGGLE SWITCH */}
      <div className="flex flex-col gap-6 border-b border-emerald-100/80 pb-8 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-black tracking-tight text-emerald-950 uppercase sm:text-5xl">
            Agenda &amp;{" "}
            <span className="text-emerald-600">Kegiatan Warga</span>
          </h1>
          <p className="max-w-2xl text-xs font-medium text-emerald-800/80 sm:text-base">
            Jadwal pelayanan Posyandu, senam bersama, kelas literasi anak, dan
            kegiatan komunitas warga 100% bebas biaya.
          </p>
        </div>

        {/* View Switcher Pills */}
        <div className="flex shrink-0 items-center gap-1 rounded-full border border-emerald-200/80 bg-emerald-50/70 p-1.5 shadow-xs">
          <button
            type="button"
            onClick={() => setActiveView("highlight")}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase transition-all ${
              activeView === "highlight"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-emerald-900 hover:bg-emerald-100/60"
            }`}
          >
            <Layers className="size-4" />7 Hari Ke Depan
          </button>
          <button
            type="button"
            onClick={() => setActiveView("calendar")}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase transition-all ${
              activeView === "calendar"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-emerald-900 hover:bg-emerald-100/60"
            }`}
          >
            <Calendar className="size-4" />
            Full Calendar
          </button>
        </div>
      </div>

      {/* VIEW CONTENT */}
      {activeView === "highlight" ? (
        <div className="mt-8 space-y-8">
          {/* Today's Spotlight Hero Banner */}
          <TodayHighlight agenda={todayAgenda} />

          {/* 7-Day Schedule Section */}
          <div>
            <h3 className="text-xl font-black tracking-tight text-emerald-950 uppercase sm:text-2xl">
              JADWAL 7 HARI KE DEPAN
            </h3>
            <SevenDaySchedule agendas={MOCK_AGENDAS} />
          </div>
        </div>
      ) : (
        /* Full Monthly Calendar View */
        <FullCalendarView agendas={MOCK_AGENDAS} />
      )}
    </main>
  );
}

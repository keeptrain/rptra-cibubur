"use client";

import { useState } from "react";
import { MOCK_AGENDAS } from "./constants/agendas";
import TodayHighlight from "./components/TodayHighlight";
import SevenDaySchedule from "./components/SevenDaySchedule";
import FullCalendarView from "./components/FullCalendarView";

export default function AgendaPage() {
  const [activeView] = useState<"highlight" | "calendar">("highlight");
  const todayAgenda = MOCK_AGENDAS.find((a) => a.isToday) || MOCK_AGENDAS[0];

  return (
    <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
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

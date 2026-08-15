"use client";

import { useState } from "react";
import { Clock, MapPin, User, Calendar, CheckCircle2 } from "lucide-react";
import { AgendaItem } from "../constants/agendas";

interface SevenDayScheduleProps {
  agendas: AgendaItem[];
}

export default function SevenDaySchedule({ agendas }: SevenDayScheduleProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDay, setSelectedDay] = useState<string>("all");

  const categories = [
    { id: "all", label: "Semua Kategori" },
    { id: "kesehatan", label: "Kesehatan / Posyandu" },
    { id: "olahraga", label: "Olahraga & Senam" },
    { id: "edukasi", label: "Anak & Edukasi" },
    { id: "komunitas", label: "PKK & Komunitas" },
  ];

  const days = [
    { id: "all", label: "7 Hari Ini" },
    { id: "Sabtu", label: "Sab (15)" },
    { id: "Minggu", label: "Ming (16)" },
    { id: "Selasa", label: "Sel (18)" },
    { id: "Rabu", label: "Rab (19)" },
    { id: "Kamis", label: "Kam (20)" },
    { id: "Jumat", label: "Jum (21)" },
  ];

  const filtered = agendas.filter((item) => {
    const matchCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchDay = selectedDay === "all" || item.dayName === selectedDay;
    return matchCategory && matchDay;
  });

  return (
    <div className="space-y-6 pt-2">
      {/* FILTER & DAY SELECTOR HEADER */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                selectedCategory === cat.id
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "border border-emerald-100/80 bg-emerald-50/60 text-emerald-900/80 hover:bg-emerald-100/60 hover:text-emerald-950"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Day Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {days.map((day) => (
            <button
              key={day.id}
              onClick={() => setSelectedDay(day.id)}
              className={`shrink-0 rounded-xl px-3.5 py-1.5 font-bold transition-all ${
                selectedDay === day.id
                  ? "bg-emerald-950 text-white shadow-xs"
                  : "bg-emerald-100/70 text-emerald-900 hover:bg-emerald-200/70"
              }`}
            >
              {day.label}
            </button>
          ))}
        </div>
      </div>

      {/* AGENDA CARDS LIST */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-emerald-200 bg-white/60 p-10 text-center text-emerald-800/70">
          <Calendar className="mx-auto size-10 text-emerald-400" />
          <p className="mt-2 text-sm font-bold">Tidak ada agenda untuk filter terpilih.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between rounded-2xl border border-emerald-100/90 bg-white p-6 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md"
            >
              <div className="space-y-3">
                {/* Day & Category Badge */}
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-800">
                    <Calendar className="size-3 text-emerald-600" />
                    {item.dayName}
                  </span>
                  <span className="rounded-full bg-emerald-100/70 px-3 py-1 text-[10px] font-bold text-emerald-900">
                    {item.categoryLabel}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-emerald-950 sm:text-xl">
                  {item.title}
                </h3>

                <p className="line-clamp-2 text-xs font-medium leading-relaxed text-emerald-900/80 sm:text-sm">
                  {item.description}
                </p>

                {/* Details */}
                <div className="space-y-1.5 pt-2 text-xs font-medium text-emerald-900/90 sm:text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="size-4 text-emerald-600 shrink-0" />
                    <span>{item.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="size-4 text-emerald-600 shrink-0" />
                    <span>{item.location}</span>
                  </div>
                  {item.instructor && (
                    <div className="flex items-center gap-2">
                      <User className="size-4 text-emerald-600 shrink-0" />
                      <span>{item.instructor}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Target Audience Footer */}
              <div className="mt-5 pt-3.5 border-t border-emerald-100/80 flex items-center justify-between text-xs">
                <span className="font-semibold text-emerald-800">
                  Sasaran: <strong className="text-emerald-950 font-bold">{item.targetAudience}</strong>
                </span>
                <span className="flex items-center gap-1 font-bold text-emerald-600">
                  <CheckCircle2 className="size-3.5" /> Gratis
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

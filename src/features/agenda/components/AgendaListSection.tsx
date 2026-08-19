"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  CheckCircle2,
  AlertCircle,
  PlusIcon,
  Search,
  AlertTriangle,
} from "lucide-react";

export interface AgendaItem {
  id: string;
  title: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  location: string;
  organizer: string;
  description: string;
  status: "UPCOMING" | "COMPLETED";
}

interface AgendaListSectionProps {
  agendas: AgendaItem[];
}

// Helper function to check if event date and end time has passed current WIB time
function isEventTimePassed(eventDateStr: string, endTimeStr: string): boolean {
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

  if (eventDateStr < currentTodayStr) return true;
  if (eventDateStr > currentTodayStr) return false;

  const [eHour, eMin] = endTimeStr.slice(0, 5).split(":").map(Number);
  const eventEndMinutes = (eHour || 0) * 60 + (eMin || 0);

  return currentTotalMinutes >= eventEndMinutes;
}

export default function AgendaListSection({ agendas }: AgendaListSectionProps) {
  const [activeTab, setActiveTab] = useState<"ALL" | "UPCOMING" | "COMPLETED">(
    "ALL"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("08");
  const [selectedYear, setSelectedYear] = useState("2026");

  const filteredAgendas = agendas.filter((item) => {
    const matchesTab =
      activeTab === "ALL" ? true : item.status === activeTab;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.organizer.toLowerCase().includes(searchQuery.toLowerCase());

    const itemYearMonth = item.eventDate.slice(0, 7);
    const filterYearMonth = `${selectedYear}-${selectedMonth}`;
    const matchesMonthYear = itemYearMonth === filterYearMonth;

    return matchesTab && matchesSearch && matchesMonthYear;
  });

  return (
    <div className="space-y-4 border border-slate-200 bg-white p-5 text-left shadow-2xs">
      {/* TOP HEADER ROW: TITLE & SUBTITLE ON LEFT, CREATE BUTTON ON RIGHT */}
      <div className="flex flex-col gap-3 border-b border-slate-100 pb-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900">
            Daftar Agenda Kegiatan RPTRA
          </h3>
          <p className="text-xs font-medium text-slate-500">
            Kelola status keterlaksanaan dan rincian agenda publik
          </p>
        </div>

        {/* CREATE AGENDA BUTTON LINK TO SEPARATE PAGE */}
        <Link
          href="/manajemen-agenda/form"
          className="inline-flex items-center gap-1.5 bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-2xs transition-colors hover:bg-emerald-700 self-start sm:self-auto"
        >
          <PlusIcon className="size-4" />
          Buat Agenda Baru
        </Link>
      </div>

      {/* ROW BELOW TITLE: FILTER TABS ON LEFT, SEPARATE MONTH & YEAR SELECTORS ON RIGHT */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-1">
        {/* LEFT: FILTER TABS (SEMUA, AKAN DATANG, TERLAKSANA) */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab("ALL")}
            className={`px-3 py-1.5 transition-colors ${
              activeTab === "ALL"
                ? "bg-white text-slate-900 shadow-2xs font-bold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Semua ({agendas.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("UPCOMING")}
            className={`px-3 py-1.5 transition-colors ${
              activeTab === "UPCOMING"
                ? "bg-white text-amber-800 shadow-2xs font-bold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Akan Datang ({agendas.filter((a) => a.status === "UPCOMING").length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("COMPLETED")}
            className={`px-3 py-1.5 transition-colors ${
              activeTab === "COMPLETED"
                ? "bg-white text-sky-800 shadow-2xs font-bold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Terlaksana ({agendas.filter((a) => a.status === "COMPLETED").length})
          </button>
        </div>

        {/* RIGHT: SEPARATE MONTH & YEAR DROPDOWN SELECTORS */}
        <div className="flex items-center gap-2">
          {/* MONTH DROPDOWN */}
          <div className="flex items-center gap-1.5 border border-slate-200 bg-slate-50/80 px-2.5 py-1.5 text-xs font-semibold text-slate-700">
            <Calendar className="size-3.5 text-slate-400 shrink-0" />
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="bg-transparent font-bold text-slate-900 outline-none cursor-pointer"
            >
              <option value="01">Januari</option>
              <option value="02">Februari</option>
              <option value="03">Maret</option>
              <option value="04">April</option>
              <option value="05">Mei</option>
              <option value="06">Juni</option>
              <option value="07">Juli</option>
              <option value="08">Agustus</option>
              <option value="09">September</option>
              <option value="10">Oktober</option>
              <option value="11">November</option>
              <option value="12">Desember</option>
            </select>
          </div>

          {/* YEAR DROPDOWN */}
          <div className="border border-slate-200 bg-slate-50/80 px-2.5 py-1.5 text-xs font-semibold text-slate-700">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="bg-transparent font-bold text-slate-900 outline-none cursor-pointer"
            >
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
            </select>
          </div>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="relative pt-1">
        <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Cari berdasarkan judul kegiatan, lokasi, atau penyelenggara..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border border-slate-200 bg-slate-50/50 pl-10 pr-4 py-2 text-xs font-medium text-slate-900 outline-none focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500"
        />
      </div>

      {/* AGENDA CARDS LIST */}
      {filteredAgendas.length === 0 ? (
        <div className="border border-dashed border-slate-200 bg-slate-50/60 p-8 text-center">
          <AlertCircle className="mx-auto size-8 text-slate-300 mb-2" />
          <p className="text-xs font-semibold text-slate-500">
            Tidak ada agenda kegiatan yang cocok pada bulan dan tahun ini.
          </p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {filteredAgendas.map((item) => {
            const isCompleted = item.status === "COMPLETED";
            const timePassed = isEventTimePassed(item.eventDate, item.endTime);
            const needsConfirmation = !isCompleted && timePassed;

            return (
              <div
                key={item.id}
                className={`border p-3.5 transition-all hover:border-slate-300 ${
                  isCompleted
                    ? "border-slate-200 bg-slate-50/60 opacity-80"
                    : needsConfirmation
                    ? "border-l-4 border-l-amber-500 border-slate-200 bg-amber-50/20"
                    : "border-slate-200 bg-white"
                }`}
              >
                <div className="space-y-1.5 text-left">
                  {/* STATUS & DATE ROW */}
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    {/* ACCURATE STATUS BADGES */}
                    {isCompleted ? (
                      <span className="inline-flex items-center gap-1 bg-sky-100 text-sky-800 px-2.5 py-0.5 text-[11px] font-bold">
                        <CheckCircle2 className="size-3" />
                        Terlaksana
                      </span>
                    ) : needsConfirmation ? (
                      <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 px-2.5 py-0.5 text-[11px] font-bold">
                        <AlertTriangle className="size-3 text-amber-700" />
                        Menunggu Konfirmasi
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 px-2.5 py-0.5 text-[11px] font-bold">
                        <Clock className="size-3" />
                        Akan Datang
                      </span>
                    )}

                    {/* DATE */}
                    <span className="flex items-center gap-1 font-bold text-slate-700">
                      <Calendar className="size-3.5 text-slate-400" />
                      {new Date(item.eventDate).toLocaleDateString("id-ID", {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                      })}
                    </span>

                    <span className="text-slate-300">•</span>

                    {/* TIME */}
                    <span className="font-medium text-slate-600">
                      {item.startTime} - {item.endTime} WIB
                    </span>
                  </div>

                  {/* PROMINENT TITLE LINKING TO DETAIL PAGE */}
                  <h4>
                    <Link
                      href={`/manajemen-agenda/${item.id}`}
                      className={`text-sm font-bold transition-colors hover:text-emerald-600 ${
                        isCompleted
                          ? "text-slate-600 line-through decoration-slate-300"
                          : "text-slate-900"
                      }`}
                    >
                      {item.title}
                    </Link>
                  </h4>

                  {/* LOCATION & ORGANIZER */}
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
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

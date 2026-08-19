"use client";

import { useTransition } from "react";
import Link from "next/link";
import { useQueryState, parseAsString, parseAsStringEnum } from "nuqs";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  CheckCircle2,
  AlertCircle,
  Search,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { AgendaStatus, FILTER_MANAGEMENT_AGENDA } from "../constants/agendas";
import FilterCard from "./management/FilterCard";

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

  const todayWibStr = `${partMap.year}-${partMap.month}-${partMap.day}`;
  const nowWibMinutes =
    parseInt(partMap.hour || "0", 10) * 60 +
    parseInt(partMap.minute || "0", 10);

  if (eventDateStr < todayWibStr) return true;
  if (eventDateStr > todayWibStr) return false;

  const cleanEnd = (endTimeStr || "00:00").slice(0, 5);
  const [eH, eM] = cleanEnd.split(":").map(Number);
  const endMinutes = (eH || 0) * 60 + (eM || 0);

  return nowWibMinutes >= endMinutes;
}
interface AgendaListSectionProps {
  agendas: AgendaItem[];
  initialMonth?: string;
  initialYear?: string;
}

export default function AgendaListSection({
  agendas,
  initialMonth = "08",
  initialYear = "2026",
}: AgendaListSectionProps) {
  const [isPending, startTransition] = useTransition();

  // nuqs with shallow: false triggers Server Component (RSC) re-evaluations
  const [activeTab, setActiveTab] = useQueryState(
    "status",
    parseAsStringEnum<AgendaStatus>(["ALL", "UPCOMING", "COMPLETED", "PENDING"])
      .withDefault("ALL")
      .withOptions({ shallow: false }),
  );

  const [selectedMonth, setSelectedMonth] = useQueryState(
    "month",
    parseAsString.withDefault(initialMonth).withOptions({ shallow: false }),
  );

  const [selectedYear, setSelectedYear] = useQueryState(
    "year",
    parseAsString.withDefault(initialYear).withOptions({ shallow: false }),
  );

  const [searchQuery, setSearchQuery] = useQueryState(
    "q",
    parseAsString
      .withDefault("")
      .withOptions({ throttleMs: 300, shallow: false }),
  );

  const handleStatusChange = (status: AgendaStatus) => {
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setActiveTab(status);
    });
  };

  const handleMonthChange = (month: string) => {
    startTransition(() => {
      setSelectedMonth(month);
    });
  };

  const handleYearChange = (year: string) => {
    startTransition(() => {
      setSelectedYear(year);
    });
  };

  const handleSearchChange = (q: string) => {
    startTransition(() => {
      setSearchQuery(q);
    });
  };

  // 1. Filter by selected Month & Year
  const monthYearFiltered = agendas.filter((item) => {
    const itemYearMonth = item.eventDate.slice(0, 7);
    const filterYearMonth = `${selectedYear}-${selectedMonth}`;
    return itemYearMonth === filterYearMonth;
  });

  // 2. Dynamic metrics based on selected Month & Year
  const totalThisMonth = monthYearFiltered.length;
  const upcomingCount = monthYearFiltered.filter(
    (a) => a.status === "UPCOMING",
  ).length;
  const completedCount = monthYearFiltered.filter(
    (a) => a.status === "COMPLETED",
  ).length;
  const pendingCount = monthYearFiltered.filter(
    (a) => a.status === "UPCOMING" && isEventTimePassed(a.eventDate, a.endTime),
  ).length;

  const getCountForTab = (tab: AgendaStatus) => {
    switch (tab) {
      case "ALL":
        return totalThisMonth;
      case "UPCOMING":
        return upcomingCount;
      case "COMPLETED":
        return completedCount;
      case "PENDING":
        return pendingCount;
    }
  };

  // 3. Filter by Tab & Search Query
  const finalFilteredAgendas = monthYearFiltered.filter((item) => {
    const matchesTab =
      activeTab === "ALL"
        ? true
        : activeTab === "PENDING"
          ? item.status === "UPCOMING" &&
            isEventTimePassed(item.eventDate, item.endTime)
          : item.status === activeTab;

    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      query === "" ||
      item.title.toLowerCase().includes(query) ||
      item.location.toLowerCase().includes(query) ||
      item.organizer.toLowerCase().includes(query);

    return matchesTab && matchesSearch;
  });

  return (
    <>
      {/* SECTION 1: CLICKABLE DYNAMIC METRICS CARDS AS PRIMARY FILTERS (4-COLUMN ROW) */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
        {FILTER_MANAGEMENT_AGENDA.map((agenda) => (
          <FilterCard
            key={agenda.activeTab}
            isPending={isPending}
            agenda={agenda}
            count={getCountForTab(agenda.activeTab)}
            isActive={activeTab === agenda.activeTab}
            onSelect={handleStatusChange}
          />
        ))}
      </div>

      {/* SEARCH & MONTH/YEAR SELECTORS ROW */}
      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
        {/* SEARCH BAR */}
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari berdasarkan judul kegiatan, lokasi, atau penyelenggara..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full border border-slate-200 bg-slate-50/50 py-2 pr-4 pl-10 text-xs font-medium text-slate-900 outline-none focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        {/* MONTH & YEAR DROPDOWN SELECTORS */}
        <div className="flex items-center gap-2">
          {/* MONTH DROPDOWN */}
          <div className="flex items-center gap-1.5 border border-slate-200 bg-slate-50/80 px-2.5 py-2 text-xs font-semibold text-slate-700">
            <Calendar className="size-3.5 shrink-0 text-slate-400" />
            <select
              value={selectedMonth}
              onChange={(e) => handleMonthChange(e.target.value)}
              className="cursor-pointer bg-transparent font-bold text-slate-900 outline-none"
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
          <div className="flex items-center gap-1.5 border border-slate-200 bg-slate-50/80 px-2.5 py-2 text-xs font-semibold text-slate-700">
            <select
              value={selectedYear}
              onChange={(e) => handleYearChange(e.target.value)}
              className="cursor-pointer bg-transparent font-bold text-slate-900 outline-none"
            >
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
            </select>
          </div>
        </div>
      </div>

      {/* AGENDA CARDS LIST WITH SOFT TRANSITION FEEDBACK */}
      <div
        className={`space-y-2.5 transition-opacity duration-200 ${
          isPending ? "pointer-events-none opacity-50" : "opacity-100"
        }`}
      >
        {isPending ? (
          <div className="flex items-center justify-center gap-2 border border-emerald-200/80 bg-emerald-50/60 p-2.5 text-xs font-semibold text-emerald-800">
            <Loader2 className="size-4 animate-spin text-emerald-600" />
            <span>Memperbarui data server...</span>
          </div>
        ) : null}

        {finalFilteredAgendas.length === 0 ? (
          <div className="border border-dashed border-slate-200 bg-slate-50/60 p-8 text-center">
            <AlertCircle className="mx-auto mb-2 size-8 text-slate-300" />
            <p className="text-xs font-semibold text-slate-500">
              Tidak ada agenda kegiatan yang cocok pada bulan dan tahun ini.
            </p>
          </div>
        ) : (
          finalFilteredAgendas.map((item) => {
            const isCompleted = item.status === "COMPLETED";
            const timePassed = isEventTimePassed(item.eventDate, item.endTime);
            const needsConfirmation = !isCompleted && timePassed;

            return (
              <div
                key={item.id}
                className={`flex flex-col gap-3 border p-4 shadow-2xs transition-all sm:flex-row sm:items-center sm:justify-between ${
                  isCompleted
                    ? "border-slate-200 bg-slate-50/60 opacity-80"
                    : needsConfirmation
                      ? "border-l-4 border-slate-200 border-l-amber-500 bg-amber-50/20"
                      : "border-slate-200 bg-white"
                }`}
              >
                <div className="space-y-1.5 text-left">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    {/* ACCURATE STATUS BADGES */}
                    {isCompleted ? (
                      <span className="inline-flex items-center gap-1 bg-sky-100 px-2.5 py-0.5 text-[11px] font-bold text-sky-800">
                        <CheckCircle2 className="size-3" />
                        Terlaksana
                      </span>
                    ) : needsConfirmation ? (
                      <span className="inline-flex items-center gap-1 bg-amber-100 px-2.5 py-0.5 text-[11px] font-bold text-amber-900">
                        <AlertTriangle className="size-3 text-amber-700" />
                        Menunggu Konfirmasi
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-amber-100 px-2.5 py-0.5 text-[11px] font-bold text-amber-800">
                        <Clock className="size-3" />
                        Akan Datang
                      </span>
                    )}

                    <span className="font-semibold text-slate-500">
                      {item.eventDate}
                    </span>
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

                {/* ACTION BUTTON */}
                <div className="flex shrink-0 items-center gap-2 pt-2 sm:pt-0">
                  <Link
                    href={`/manajemen-agenda/${item.id}`}
                    className="border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs transition-colors hover:bg-slate-50"
                  >
                    Rincian
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}

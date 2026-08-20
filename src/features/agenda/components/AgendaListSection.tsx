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
} from "lucide-react";
import { AgendaStatus, FILTER_MANAGEMENT_AGENDA } from "../constants/agendas";
import FilterCard from "./management/FilterCard";
import AgendaListSkeleton from "./skeleton/AgendaListSkeleton";
import { isEventTimePassed } from "../utils/isEventTimePassed";

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
  metrics: {
    totalThisMonth: number;
    upcomingCount: number;
    completedCount: number;
    pendingCount: number;
  };
  initialMonth?: string;
  initialYear?: string;
}

export default function AgendaListSection({
  agendas,
  metrics,
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

  const handleParamChange = <T,>(setter: (val: T) => void, val: T) => {
    startTransition(() => {
      setter(val);
    });
  };

  const getCountForTab = (tab: AgendaStatus) => {
    switch (tab) {
      case "ALL":
        return metrics.totalThisMonth;
      case "UPCOMING":
        return metrics.upcomingCount;
      case "COMPLETED":
        return metrics.completedCount;
      case "PENDING":
        return metrics.pendingCount;
    }
  };

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
            onSelect={(tab) => handleParamChange(setActiveTab, tab)}
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
            onChange={(e) => handleParamChange(setSearchQuery, e.target.value)}
            className="w-full border border-slate-200 bg-slate-50/50 py-2 pr-4 pl-10 text-xs font-medium outline-none focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        {/* MONTH & YEAR DROPDOWN SELECTORS */}
        <div className="flex items-center gap-2">
          {/* MONTH DROPDOWN */}
          <div className="flex items-center gap-1.5 border border-slate-200 bg-slate-50/80 px-2.5 py-2 text-xs font-semibold">
            <Calendar className="size-3.5 shrink-0 text-slate-400" />
            <select
              value={selectedMonth}
              onChange={(e) =>
                handleParamChange(setSelectedMonth, e.target.value)
              }
              className="cursor-pointer bg-transparent font-bold outline-none"
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
          <div className="flex items-center gap-1.5 border border-slate-200 bg-slate-50/80 px-2.5 py-2 text-xs font-semibold">
            <select
              value={selectedYear}
              onChange={(e) =>
                handleParamChange(setSelectedYear, e.target.value)
              }
              className="cursor-pointer bg-transparent font-bold outline-none"
            >
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
            </select>
          </div>
        </div>
      </div>

      {/* AGENDA CARDS LIST WITH SKELETON FALLBACK WHEN PENDING */}
      {isPending ? (
        <AgendaListSkeleton />
      ) : agendas.length === 0 ? (
        <div className="border border-dashed border-slate-200 bg-slate-50/60 p-8 text-center">
          <AlertCircle className="mx-auto mb-2 size-8 text-slate-300" />
          <p className="text-xs font-semibold">
            Tidak ada agenda kegiatan yang cocok pada bulan dan tahun ini.
          </p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {agendas.map((item) => {
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

                    <span className="font-semibold">{item.eventDate}</span>
                  </div>

                  <Link
                    href={`/manajemen-agenda/${item.id}`}
                    className="inline-block text-sm font-bold"
                  >
                    {item.title}
                  </Link>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
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
                    className="border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold shadow-2xs transition-colors hover:bg-slate-50"
                  >
                    Rincian
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

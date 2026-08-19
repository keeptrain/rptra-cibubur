import { Calendar, CalendarDays, CheckCircle2, ArrowUpRight } from "lucide-react";

interface AgendaMetricsProps {
  totalThisMonth?: number;
  upcomingCount?: number;
  completedCount?: number;
}

export default function AgendaMetrics({
  totalThisMonth = 12,
  upcomingCount = 4,
  completedCount = 8,
}: AgendaMetricsProps) {
  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3">
      {/* CARD 1: TOTAL AGENDAS */}
      <div className="flex flex-col justify-between border border-slate-200 bg-white p-3 text-left shadow-2xs sm:p-4">
        {/* TOP ROW: ICON & ARROW */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600 sm:size-10">
            <CalendarDays className="size-4.5 sm:size-5" />
          </div>
          <ArrowUpRight className="size-3.5 text-slate-400" />
        </div>

        {/* BOTTOM ROW: NUMBER & LABEL */}
        <div className="flex items-baseline gap-1.5 flex-wrap">
          <span className="text-xl font-black text-slate-900 sm:text-2xl">
            {totalThisMonth}
          </span>
          <span className="text-xs font-semibold text-slate-500">
            Agenda
          </span>
        </div>
      </div>

      {/* CARD 2: UPCOMING AGENDAS */}
      <div className="flex flex-col justify-between border border-slate-200 bg-white p-3 text-left shadow-2xs sm:p-4">
        {/* TOP ROW: ICON & ARROW */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600 sm:size-10">
            <Calendar className="size-4.5 sm:size-5" />
          </div>
          <ArrowUpRight className="size-3.5 text-slate-400" />
        </div>

        {/* BOTTOM ROW: NUMBER & LABEL */}
        <div className="flex items-baseline gap-1.5 flex-wrap">
          <span className="text-xl font-black text-slate-900 sm:text-2xl">
            {upcomingCount}
          </span>
          <span className="text-xs font-semibold text-slate-500">
            Mendatang
          </span>
        </div>
      </div>

      {/* CARD 3: COMPLETED AGENDAS */}
      <div className="flex flex-col justify-between border border-slate-200 bg-white p-3 text-left shadow-2xs sm:p-4">
        {/* TOP ROW: ICON & ARROW */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 sm:size-10">
            <CheckCircle2 className="size-4.5 sm:size-5" />
          </div>
          <ArrowUpRight className="size-3.5 text-slate-400" />
        </div>

        {/* BOTTOM ROW: NUMBER & LABEL */}
        <div className="flex items-baseline gap-1.5 flex-wrap">
          <span className="text-xl font-black text-slate-900 sm:text-2xl">
            {completedCount}
          </span>
          <span className="text-xs font-semibold text-slate-500">
            Terlaksana
          </span>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useQueryState, parseAsString } from "nuqs";
import { WibDayItem } from "../utils/utils";

interface FilterUpcomingEventCardProps {
  next7Days: WibDayItem[];
  currentMonthName: string;
}

/**
 * Full-width filter header component for public upcoming events page.
 * Uses nuqs with shallow: false & useTransition to trigger Server Component re-evaluation on URL changes.
 */
export default function FilterUpcomingEventCard({
  next7Days,
  currentMonthName,
}: FilterUpcomingEventCardProps) {
  const defaultDayDate = next7Days[0]?.dateStr || "";

  // nuqs with shallow: false triggers Server Component (RSC) re-evaluations
  const [selectedDay, setSelectedDay] = useQueryState(
    "day",
    parseAsString.withDefault(defaultDayDate).withOptions({ shallow: false }),
  );

  const handleDaySelect = (dateStr: string) => {
    setSelectedDay(dateStr);
  };

  return (
    <div className="w-full space-y-4 text-left">
      {/* SECTION HEADER: MONTH TITLE */}
      <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-2xl">
        {currentMonthName}
      </h2>

      {/* HORIZONTAL 7-DAY PILLS STRIP FULL WIDTH (7 EQUAL COLUMNS) */}
      <div className="flex w-full scrollbar-none items-center gap-2 overflow-x-auto pb-2 sm:overflow-visible">
        {next7Days.map((day) => {
          const isActive =
            selectedDay === day.dateStr || (selectedDay === "" && day.isToday);

          return (
            <button
              key={day.dateStr}
              type="button"
              onClick={() => handleDaySelect(day.dateStr)}
              className={`flex min-w-13 flex-1 cursor-pointer flex-col items-center justify-center rounded-2xl px-2.5 py-3 text-center transition-all ${
                isActive
                  ? "bg-emerald-500 font-black text-slate-950 shadow-md ring-2 ring-emerald-400"
                  : day.isToday
                    ? "border-2 border-emerald-500 bg-emerald-50 font-bold text-slate-900"
                    : "border border-slate-200 bg-white text-slate-700 hover:border-slate-300"
              }`}
            >
              <span className="text-base leading-none font-black sm:text-lg">
                {day.dayNum}
              </span>
              <span className="mt-1 text-[10px] leading-none font-bold uppercase opacity-80">
                {day.dayShort}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

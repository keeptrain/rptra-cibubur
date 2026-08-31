"use client";

import { useQueryState, parseAsString } from "nuqs";
import { Button } from "@/components/ui/button";
import { WibDayItem } from "../../utils/utils";

interface FilterUpcomingEventCardProps {
  next7Days: WibDayItem[];
  currentMonthName: string;
}

/**
 * Full-width filter header component for public upcoming events page.
 * Uses nuqs with shallow: false to trigger Server Component re-evaluation on URL changes.
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
      <h2 className="text-2xl font-semibold tracking-tight">
        {currentMonthName}
      </h2>

      {/* HORIZONTAL 7-DAY PILLS STRIP FULL WIDTH (7 EQUAL COLUMNS) */}
      <div className="flex w-full scrollbar-none items-center gap-2 overflow-x-auto pb-2 sm:overflow-visible">
        {next7Days.map((day) => {
          const isActive =
            selectedDay === day.dateStr || (selectedDay === "" && day.isToday);

          return (
            <Button
              key={day.dateStr}
              type="button"
              variant={
                isActive ? "default" : day.isToday ? "outline" : "secondary"
              }
              onClick={() => handleDaySelect(day.dateStr)}
              className="flex h-auto min-w-13 flex-1 flex-col items-center justify-center rounded-2xl px-2.5 py-3"
            >
              <span className="text-base leading-none sm:text-lg">
                {day.dayNum}
              </span>
              <span className="mt-2 text-xs leading-none font-bold opacity-80">
                {day.dayShort}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}

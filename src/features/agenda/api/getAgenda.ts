import { unstable_cache } from "next/cache";
import { WibDateDetails } from "../utils/utils";
import { isEventTimePassed } from "../utils/isEventTimePassed";
import { SupabaseClient } from "@supabase/supabase-js";

export interface AgendaData {
  agendas: Array<{
    id: string;
    title: string;
    eventDate: string;
    startTime: string;
    endTime: string;
    location: string;
    organizer: string;
    description: string;
    status: "UPCOMING" | "COMPLETED";
  }>;
  serverWibToday: string;
  currentMonth: string;
  currentYear: string;
}

export interface AgendaMetrics {
  totalThisMonth: number;
  upcomingCount: number;
  completedCount: number;
  pendingCount: number;
}

/**
 * Core cached data fetching function for active agendas.
 * Accepts injected SupabaseClient instance and wibDate.
 */
export function getAgendaQuery(
  supabase: SupabaseClient,
  wibDate: WibDateDetails,
) {
  const {
    fullDate: serverWibToday,
    month: currentMonth,
    year: currentYear,
  } = wibDate;

  return unstable_cache(
    async (): Promise<AgendaData> => {
      try {
        const { data, error } = await supabase
          .from("park_agendas")
          .select(
            `
            id,
            title,
            eventDate:event_date,
            startTime:start_time,
            endTime:end_time,
            location,
            organizer,
            description,
            status
          `,
          )
          .is("deleted_at", null)
          .order("event_date", { ascending: false });

        if (error || !data) {
          console.error("Supabase Agenda Fetch Error:", error?.message);
          return {
            agendas: [],
            serverWibToday,
            currentMonth,
            currentYear,
          };
        }

        return {
          agendas: data as AgendaData["agendas"],
          serverWibToday,
          currentMonth,
          currentYear,
        };
      } catch (err) {
        console.error("Cache Fetch Error:", err);
        return {
          agendas: [],
          serverWibToday,
          currentMonth,
          currentYear,
        };
      }
    },
    [`park-agendas-list-${currentYear}-${currentMonth}`],
    {
      revalidate: 3600,
      tags: ["park-agendas", `park-agendas-${currentYear}-${currentMonth}`],
    },
  )();
}

/**
 * Reusable helper to compute monthly agenda metrics (total, upcoming, completed, pending).
 */
export function computeAgendaMetrics(
  agendas: AgendaData["agendas"],
  targetMonth: string,
  targetYear: string,
  overridePendingCount?: number,
): AgendaMetrics {
  const monthYearAgendas = agendas.filter((item) => {
    const itemYearMonth = item.eventDate.slice(0, 7);
    return itemYearMonth === `${targetYear}-${targetMonth}`;
  });

  const totalThisMonth = monthYearAgendas.length;
  const upcomingCount = monthYearAgendas.filter(
    (a) => a.status === "UPCOMING",
  ).length;
  const completedCount = monthYearAgendas.filter(
    (a) => a.status === "COMPLETED",
  ).length;

  const pendingCount =
    overridePendingCount !== undefined
      ? overridePendingCount
      : monthYearAgendas.filter(
          (a) =>
            a.status === "UPCOMING" &&
            isEventTimePassed(a.eventDate, a.endTime),
        ).length;

  return {
    totalThisMonth,
    upcomingCount,
    completedCount,
    pendingCount,
  };
}

import { unstable_cache } from "next/cache";
import { createClient } from "@/lib/supabase/client";
import { WibDateDetails } from "../utils/utils";

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
  pendingAgendas: Array<{
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
  metrics: {
    totalThisMonth: number;
    upcomingCount: number;
    completedCount: number;
  };
  serverWibToday: string;
  currentMonth: string;
  currentYear: string;
}

/**
 * Core cached data fetching function for agendas.
 * Accepts wibDate dynamically passed from top-level Page orchestrator.
 */
export function getAgenda(wibDate: WibDateDetails) {
  const {
    fullDate: serverWibToday,
    month: currentMonth,
    year: currentYear,
  } = wibDate;

  return unstable_cache(
    async (): Promise<AgendaData> => {
      try {
        const supabase = createClient();
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
            pendingAgendas: [],
            metrics: { totalThisMonth: 0, upcomingCount: 0, completedCount: 0 },
            serverWibToday,
            currentMonth,
            currentYear,
          };
        }

        const agendas = data as AgendaData["agendas"];

        // 1. Separate pending agendas (UPCOMING status but event date/time has passed WIB)
        const pendingAgendas: AgendaData["agendas"] = [];
        let upcomingCount = 0;
        let completedCount = 0;

        for (const item of agendas) {
          if (item.status === "COMPLETED") {
            completedCount++;
          } else if (item.status === "UPCOMING") {
            upcomingCount++;
            if (item.eventDate < serverWibToday) {
              pendingAgendas.push(item);
            }
          }
        }

        const metrics = {
          totalThisMonth: agendas.length,
          upcomingCount,
          completedCount,
        };

        return {
          agendas,
          pendingAgendas,
          metrics,
          serverWibToday,
          currentMonth,
          currentYear,
        };
      } catch (err) {
        console.error("Cache Fetch Error:", err);
        return {
          agendas: [],
          pendingAgendas: [],
          metrics: { totalThisMonth: 0, upcomingCount: 0, completedCount: 0 },
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

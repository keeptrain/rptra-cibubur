import { createClient } from "@/lib/supabase/client";
import { unstable_cache } from "next/cache";
import { AgendaItem } from "../components/AgendaListSection";
import { getCurrentWibDateDetails } from "../utils/utils";

export interface AgendaData {
  agendas: AgendaItem[];
  pendingAgendas: AgendaItem[];
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
 * Core cached database fetcher for park agendas with zero GC & O(1) request latency.
 * Pre-filters pendingAgendas (past unconfirmed events) inside unstable_cache on server.
 */
export const getAgenda = unstable_cache(
  async (): Promise<AgendaData> => {
    const { fullDate: serverWibToday, month: currentMonth, year: currentYear } =
      getCurrentWibDateDetails();

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
        `
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

      const agendas = data as unknown as AgendaItem[];

      // Single-pass O(N) loop to compute metrics & pendingAgendas during cache warming
      let upcomingCount = 0;
      let completedCount = 0;
      const pendingAgendas: AgendaItem[] = [];

      for (let i = 0; i < agendas.length; i++) {
        const item = agendas[i];
        if (item.status === "UPCOMING") {
          upcomingCount++;
          // Event date has passed current WIB date but status is still UPCOMING
          if (item.eventDate < serverWibToday) {
            pendingAgendas.push(item);
          }
        } else if (item.status === "COMPLETED") {
          completedCount++;
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
  ["park-agendas-list-cache"],
  {
    revalidate: 3600,
    tags: ["park-agendas"],
  }
);

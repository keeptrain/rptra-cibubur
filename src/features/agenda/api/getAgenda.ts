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
  serverWibToday: string;
  currentMonth: string;
  currentYear: string;
}

/**
 * Core cached data fetching function for raw agendas.
 * Returns raw agendas from Supabase cached for 1 hour.
 */
export function getAgenda(wibDate: WibDateDetails) {
  const { fullDate: serverWibToday, month: currentMonth, year: currentYear } =
    wibDate;

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

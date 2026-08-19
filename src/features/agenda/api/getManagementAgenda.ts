import { createClient } from "@/lib/supabase/client";
import { unstable_cache } from "next/cache";
import { AgendaItem } from "../components/AgendaListSection";

export interface ManagementAgendaData {
  agendas: AgendaItem[];
  metrics: {
    totalThisMonth: number;
    upcomingCount: number;
    completedCount: number;
  };
  serverWibToday: string;
}

// Helper to get current today YYYY-MM-DD in Asia/Jakarta (WIB) timezone
export function getCurrentWibDateString(): string {
  const now = new Date();
  const wibFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const parts = wibFormatter.formatToParts(now);
  const partMap: Record<string, string> = {};
  parts.forEach((p) => {
    partMap[p.type] = p.value;
  });

  return `${partMap.year}-${partMap.month}-${partMap.day}`;
}

/**
 * Cached Database Fetcher wrapped in Next.js unstable_cache
 * Uses PostgreSQL column aliasing directly in Supabase .select() to eliminate
 * server-side JS .map() memory allocation and Garbage Collection (GC) overhead.
 */
const fetchAgendasFromDbCached = unstable_cache(
  async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("park_agendas")
        .select(`
          id,
          title,
          eventDate:event_date,
          startTime:start_time,
          endTime:end_time,
          location,
          organizer,
          description,
          status
        `)
        .is("deleted_at", null)
        .order("event_date", { ascending: false });

      if (error) {
        console.error("Supabase Agenda Fetch Error:", error.message);
        return { data: null, error: error.message };
      }

      return { data, error: null };
    } catch (err) {
      console.error("Cache Fetch Error:", err);
      return {
        data: null,
        error: err instanceof Error ? err.message : "Cache fetch failed",
      };
    }
  },
  ["park-agendas-list-cache"],
  {
    revalidate: 3600,
    tags: ["park-agendas"],
  }
);

/**
 * BFF API function to resolve all required page data for ManagementAgenda
 * directly from Supabase database `park_agendas` table with zero JS .map() GC overhead.
 */
export async function getManagementAgenda(): Promise<ManagementAgendaData> {
  const serverWibToday = getCurrentWibDateString();

  try {
    const { data: dbAgendas, error } = await fetchAgendasFromDbCached();

    if (error || !dbAgendas) {
      return {
        agendas: [],
        metrics: {
          totalThisMonth: 0,
          upcomingCount: 0,
          completedCount: 0,
        },
        serverWibToday,
      };
    }

    // Direct assignment via Supabase PostgreSQL SELECT Column Aliasing (Zero GC Overhead)
    const agendas = dbAgendas as unknown as AgendaItem[];

    const totalThisMonth = agendas.length;
    const upcomingCount = agendas.filter((a) => a.status === "UPCOMING").length;
    const completedCount = agendas.filter((a) => a.status === "COMPLETED").length;

    return {
      agendas,
      metrics: {
        totalThisMonth,
        upcomingCount,
        completedCount,
      },
      serverWibToday,
    };
  } catch {
    return {
      agendas: [],
      metrics: {
        totalThisMonth: 0,
        upcomingCount: 0,
        completedCount: 0,
      },
      serverWibToday,
    };
  }
}

import { createClient } from "@/lib/supabase/client";
import { getAgendaQuery, computeAgendaMetrics, AgendaData } from "./getAgenda";
import { getCurrentWibDateDetails } from "../utils/utils";
import { AgendaStatus } from "../constants/agendas";
import { isEventTimePassed } from "../utils/isEventTimePassed";
import { SupabaseClient } from "@supabase/supabase-js";

export interface ManagementAgendaParams {
  status?: AgendaStatus | null;
  month?: string | null;
  year?: string | null;
  q?: string | null;
}

export interface ManagementAgendaData {
  agendas: AgendaData["agendas"];
  metrics: {
    totalThisMonth: number;
    upcomingCount: number;
    completedCount: number;
    pendingCount: number;
  };
  currentMonth: string;
  currentYear: string;
}

/**
 * Management Agenda BFF data fetcher.
 * Reuses 1 SupabaseClient instance across parallel pending query & cached agendas fetch.
 */
export async function getManagementAgenda(
  params: ManagementAgendaParams = {},
): Promise<ManagementAgendaData> {
  const wibDate = getCurrentWibDateDetails();

  const targetMonth = params.month || wibDate.month;
  const targetYear = params.year || wibDate.year;
  const targetStatus = params.status || "ALL";
  const targetQuery = (params.q || "").trim().toLowerCase();

  const supabase = createClient();

  // 1. DEDICATED DB QUERY FOR PENDING AGENDAS (PARALLEL EXECUTION WITH PROMISE.ALL)
  if (targetStatus === "PENDING") {
    const [pendingAgendasRaw, rawData] = await Promise.all([
      getPendingAgendasQuery(supabase, wibDate),
      getAgendaQuery(supabase, wibDate),
    ]);

    const filteredPendingAgendas = pendingAgendasRaw.filter((item) => {
      const isPassed = isEventTimePassed(item.eventDate, item.endTime);
      const matchesSearch =
        targetQuery === "" ||
        item.title.toLowerCase().includes(targetQuery) ||
        item.location.toLowerCase().includes(targetQuery) ||
        item.organizer.toLowerCase().includes(targetQuery);

      return isPassed && matchesSearch;
    });

    const metrics = computeAgendaMetrics(
      rawData.agendas,
      targetMonth,
      targetYear,
      filteredPendingAgendas.length,
    );

    return {
      agendas: filteredPendingAgendas,
      metrics,
      currentMonth: targetMonth,
      currentYear: targetYear,
    };
  }

  // 2. STANDARD CACHED QUERY FOR ALL, UPCOMING, COMPLETED
  const rawData = await getAgendaQuery(supabase, wibDate);
  const rawAgendas = rawData.agendas;

  const metrics = computeAgendaMetrics(rawAgendas, targetMonth, targetYear);

  const monthYearAgendas = rawAgendas.filter((item) => {
    const itemYearMonth = item.eventDate.slice(0, 7);
    return itemYearMonth === `${targetYear}-${targetMonth}`;
  });

  const filteredAgendas = monthYearAgendas.filter((item) => {
    const matchesStatus =
      targetStatus === "ALL" ? true : item.status === targetStatus;

    const matchesSearch =
      targetQuery === "" ||
      item.title.toLowerCase().includes(targetQuery) ||
      item.location.toLowerCase().includes(targetQuery) ||
      item.organizer.toLowerCase().includes(targetQuery);

    return matchesStatus && matchesSearch;
  });

  return {
    agendas: filteredAgendas,
    metrics,
    currentMonth: targetMonth,
    currentYear: targetYear,
  };
}

async function getPendingAgendasQuery(
  supabase: SupabaseClient,
  wibDate: ReturnType<typeof getCurrentWibDateDetails>,
) {
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
    .eq("status", "UPCOMING")
    .lte("event_date", wibDate.fullDate)
    .order("event_date", { ascending: false });

  if (error) {
    console.error("Supabase Pending Query Error:", error.message);
  }

  return (data || []) as AgendaData["agendas"];
}

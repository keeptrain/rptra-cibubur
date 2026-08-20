import { createClient } from "@/lib/supabase/client";
import { getAgenda, AgendaData } from "./getAgenda";
import { WibDateDetails } from "../utils/utils";
import { AgendaStatus } from "../constants/agendas";
import { isEventTimePassed } from "../utils/isEventTimePassed";

export interface ManagementAgendaParams {
  status?: AgendaStatus;
  month?: string;
  year?: string;
  q?: string;
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
 * Management Agenda data fetcher.
 * When status === 'PENDING', executes a dedicated fresh Supabase database query
 * (.eq('status', 'UPCOMING').lte('event_date', wibDate.fullDate)) for optimal fresh performance.
 */
export async function getManagementAgenda(
  wibDate: WibDateDetails,
  params: ManagementAgendaParams = {},
): Promise<ManagementAgendaData> {
  const targetMonth = params.month || wibDate.month;
  const targetYear = params.year || wibDate.year;
  const targetStatus = params.status || "ALL";
  const targetQuery = (params.q || "").trim().toLowerCase();

  // 1. DEDICATED DB QUERY FOR PENDING AGENDAS
  if (targetStatus === "PENDING") {
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
      .eq("status", "UPCOMING")
      .lte("event_date", wibDate.fullDate)
      .order("event_date", { ascending: false });

    if (error) {
      console.error("Supabase Pending Query Error:", error.message);
    }

    let pendingAgendas = (data || []) as AgendaData["agendas"];

    // Filter by fresh WIB time and search query
    pendingAgendas = pendingAgendas.filter((item) => {
      const isPassed = isEventTimePassed(item.eventDate, item.endTime);
      const matchesSearch =
        targetQuery === "" ||
        item.title.toLowerCase().includes(targetQuery) ||
        item.location.toLowerCase().includes(targetQuery) ||
        item.organizer.toLowerCase().includes(targetQuery);

      return isPassed && matchesSearch;
    });

    // Also get general month metrics
    const rawData = await getAgenda(wibDate);
    const monthYearAgendas = rawData.agendas.filter((item) => {
      const itemYearMonth = item.eventDate.slice(0, 7);
      return itemYearMonth === `${targetYear}-${targetMonth}`;
    });

    const upcomingCount = monthYearAgendas.filter(
      (a) => a.status === "UPCOMING",
    ).length;
    const completedCount = monthYearAgendas.filter(
      (a) => a.status === "COMPLETED",
    ).length;

    return {
      agendas: pendingAgendas,
      metrics: {
        totalThisMonth: monthYearAgendas.length,
        upcomingCount,
        completedCount,
        pendingCount: pendingAgendas.length,
      },
      currentMonth: targetMonth,
      currentYear: targetYear,
    };
  }

  // 2. STANDARD CACHED QUERY FOR ALL, UPCOMING, COMPLETED
  const rawData = await getAgenda(wibDate);
  const rawAgendas = rawData.agendas;

  const monthYearAgendas = rawAgendas.filter((item) => {
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

  const pendingCount = monthYearAgendas.filter(
    (a) => a.status === "UPCOMING" && isEventTimePassed(a.eventDate, a.endTime),
  ).length;

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
    metrics: {
      totalThisMonth,
      upcomingCount,
      completedCount,
      pendingCount,
    },
    currentMonth: targetMonth,
    currentYear: targetYear,
  };
}

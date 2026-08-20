import { createClient } from "@/lib/supabase/client";
import { getAgendaQuery } from "./getAgenda";
import { AgendaItem as PublicAgendaItem } from "../constants/agendas";
import {
  getCurrentWibDateDetails,
  getIndonesianMonthYear,
  getNext7WibDays,
} from "../utils/utils";
import { isEventOngoing } from "../utils/isEventOngoing";
import { isEventTimePassed } from "../utils/isEventTimePassed";

function getDayNameIndonesian(dateStr: string): string {
  if (!dateStr) return "Hari Ini";
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? "Hari Ini" : days[d.getDay()];
}

/**
 * Public Agenda BFF data resolution function.
 * Centralizes WIB date evaluation, 7-day strip resolution, day parameter filtering,
 * and smart time-priority sorting (Ongoing -> Upcoming closest time -> Passed).
 */
export async function getPublicAgendas(selectedDayParam?: string) {
  const wibDate = getCurrentWibDateDetails();
  const supabase = createClient();
  const { agendas: dbAgendas, serverWibToday } = await getAgendaQuery(
    supabase,
    wibDate,
  );

  const next7Days = getNext7WibDays(wibDate);
  const defaultDayDate = next7Days[0]?.dateStr || "";
  const activeDay = selectedDayParam || defaultDayDate;

  const formattedAgendas: PublicAgendaItem[] =
    dbAgendas.length > 0
      ? dbAgendas.map((item) => {
          const isToday = item.eventDate === serverWibToday;
          const isOngoing = isEventOngoing(
            item.eventDate,
            item.startTime,
            item.endTime,
            serverWibToday,
          );

          return {
            id: item.id,
            title: item.title,
            category: "komunitas",
            categoryLabel: item.organizer || "Kegiatan RPTRA",
            date: item.eventDate,
            dayName: getDayNameIndonesian(item.eventDate),
            time: `${item.startTime} - ${item.endTime} WIB`,
            startTime: item.startTime,
            endTime: item.endTime,
            location: item.location,
            instructor: item.organizer,
            targetAudience: "Warga RPTRA Cibubur",
            description: item.description,
            isToday,
            isOngoing,
          };
        })
      : [];

  const filteredAgendas = formattedAgendas.filter(
    (item) => item.date === activeDay || item.dayName === activeDay,
  );

  // Smart time-priority sorting:
  // 1. Ongoing event first
  // 2. Upcoming events sorted by startTime ascending (closest time first)
  // 3. Passed events sorted by startTime ascending at the bottom
  filteredAgendas.sort((a, b) => {
    if (a.isOngoing && !b.isOngoing) return -1;
    if (!a.isOngoing && b.isOngoing) return 1;

    const aPassed = isEventTimePassed(a.date, a.endTime || "");
    const bPassed = isEventTimePassed(b.date, b.endTime || "");

    if (!aPassed && bPassed) return -1;
    if (aPassed && !bPassed) return 1;

    const startTimeA = a.startTime || "";
    const startTimeB = b.startTime || "";
    return startTimeA.localeCompare(startTimeB);
  });

  const currentMonthName = getIndonesianMonthYear(wibDate.month, wibDate.year);

  return {
    agendas: filteredAgendas,
    currentMonthName,
    next7Days,
    defaultDayDate,
    activeDay,
    wibDate,
  };
}

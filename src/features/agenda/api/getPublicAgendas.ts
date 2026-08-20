import { createClient } from "@/lib/supabase/client";
import { getAgendaQuery } from "./getAgenda";
import { AgendaItem as PublicAgendaItem } from "../constants/agendas";
import {
  getCurrentWibDateDetails,
  getIndonesianMonthYear,
  getNext7WibDays,
} from "../utils/utils";
import { isEventOngoing } from "../utils/isEventOngoing";

function getDayNameIndonesian(dateStr: string): string {
  if (!dateStr) return "Hari Ini";
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? "Hari Ini" : days[d.getDay()];
}

/**
 * Public Agenda BFF data resolution function.
 * Returns formatted agendas with accurate isToday and isOngoing flags, month title, and 7-day strip items.
 */
export async function getPublicAgendas() {
  const wibDate = getCurrentWibDateDetails();
  const supabase = createClient();
  const { agendas: dbAgendas, serverWibToday } = await getAgendaQuery(
    supabase,
    wibDate,
  );

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
            location: item.location,
            instructor: item.organizer,
            targetAudience: "Warga RPTRA Cibubur",
            description: item.description,
            isToday,
            isOngoing,
          };
        })
      : [];

  const todayAgenda =
    formattedAgendas.find((a) => a.isToday) || formattedAgendas[0];

  const currentMonthName = getIndonesianMonthYear(wibDate.month, wibDate.year);
  const next7Days = getNext7WibDays(wibDate);

  return {
    formattedAgendas,
    todayAgenda,
    currentMonthName,
    next7Days,
    wibDate,
  };
}

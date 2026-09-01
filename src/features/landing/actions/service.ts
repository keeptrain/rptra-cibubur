import { createAnonClient, SupabaseAnonClient } from "@/lib/supabase/client";
import { getCurrentWibDateDetails } from "@/features/agenda/utils/utils";
import { isEventTimePassed } from "@/features/agenda/utils/isEventTimePassed";

export type HeroAgenda = {
  id: string;
  title: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  location: string;
  formattedDate: string;
};

function formatDate(d: string) {
  return new Date(`${d}T00:00:00+07:00`).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  });
}

function toHeroAgenda(
  raw: Omit<HeroAgenda, "formattedDate"> | null,
): HeroAgenda | null {
  if (!raw) return null;
  return { ...raw, formattedDate: formatDate(raw.eventDate) };
}

export async function getHeroActivitiesData() {
  const supabase = createAnonClient();
  const [nearest, latest] = await Promise.all([
    fetchNearest(supabase),
    fetchLatest(supabase),
  ]);
  return { nearest, latest };
}

async function fetchNearest(supabase: SupabaseAnonClient) {
  const wibToday = getCurrentWibDateDetails().fullDate;
  const { data } = await supabase
    .from("park_agendas")
    .select(
      "id, title, eventDate:event_date, startTime:start_time, endTime:end_time, location",
    )
    .is("deleted_at", null)
    .eq("status", "UPCOMING")
    .gte("event_date", wibToday)
    .order("event_date", { ascending: true })
    .order("start_time", { ascending: true })
    .limit(5);
  if (!data || data.length === 0) return null;
  const filtered = (data as Omit<HeroAgenda, "formattedDate">[]).filter(
    (a) => !isEventTimePassed(a.eventDate, a.endTime),
  );
  const raw = (filtered[0] || data[0]) as Omit<HeroAgenda, "formattedDate">;
  return toHeroAgenda(raw);
}

async function fetchLatest(supabase: SupabaseAnonClient) {
  const { data } = await supabase
    .from("park_agendas")
    .select(
      "id, title, eventDate:event_date, startTime:start_time, endTime:end_time, location",
    )
    .is("deleted_at", null)
    .eq("status", "COMPLETED")
    .order("event_date", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (!data) return null;
  return toHeroAgenda(data as Omit<HeroAgenda, "formattedDate">);
}

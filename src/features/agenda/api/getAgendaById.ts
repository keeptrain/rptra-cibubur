import { uuidV7Schema as validateUuidV7 } from "@/lib/schema";
import { safeParse } from "valibot";
import { createClient } from "@/lib/supabase/client";

export interface DetailAgendaItem {
  id: string;
  title: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  location: string;
  organizer: string;
  targetAudience: string;
  contactPerson: string;
  bannerUrl: string;
  description: string;
  status: "UPCOMING" | "COMPLETED";
}

export async function getAgendaById(
  id: string,
): Promise<DetailAgendaItem | null> {
  const result = safeParse(validateUuidV7(), id);
  if (!result.success) {
    return null;
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("park_agendas")
      .select("*")
      .eq("id", id)
      .is("deleted_at", null)
      .maybeSingle();

    if (error || !data) {
      return null;
    }

    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      id: data.id,
      title: data.title,
      eventDate: data.event_date,
      startTime: data.start_time?.slice(0, 5) || "08:00",
      endTime: data.end_time?.slice(0, 5) || "11:00",
      location: data.location || "RPTRA Cibubur",
      organizer: data.organizer || "Pengelola RPTRA",
      targetAudience: data.target_audience || "Seluruh Warga RPTRA",
      contactPerson: data.contact_person || "-",
      bannerUrl: "/images/rptra-cibubur.webp",
      description: data.description || "-",
      status: data.status || "UPCOMING",
    };
  } catch {
    return null;
  }
}

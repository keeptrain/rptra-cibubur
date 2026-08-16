import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export interface OperatingHourItem {
  day_of_week: number;
  day_name: string;
  open_time: string;
  close_time: string;
  is_open: boolean;
  updated_at: string;
}

export async function getOperatingHours(): Promise<OperatingHourItem[]> {
  try {
    const cookieStore = await cookies();
    const supabase = await createClient(cookieStore);
    const { data, error } = await supabase
      .from("park_operating_hours")
      .select("*")
      .order("day_of_week", { ascending: true });

    if (error || !data) {
      return [];
    }

    return data as OperatingHourItem[];
  } catch {
    return [];
  }
}

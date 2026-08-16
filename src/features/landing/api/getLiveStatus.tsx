import { createClient } from "@/lib/supabase/client";
import { unstable_cache } from "next/cache";

export const getLiveStatus = unstable_cache(
  async () => {
    const timeZone = "Asia/Jakarta";
    const nowWib = new Date(new Date().toLocaleString("en-US", { timeZone }));
    const todayStr = nowWib.toISOString().split("T")[0];
    const dayOfWeek = nowWib.getDay(); // 0 = Minggu, 1 = Senin, ... 6 = Sabtu
    const currentHour = nowWib.getHours();

    let isParkOpen = currentHour >= 6 && currentHour < 18;
    let activeNotice: string | null = null;
    let operatingHoursText = "06:00 - 18:00 WIB";

    try {
      const supabase = createClient();

      // 1. Read 7-day regular schedule from park_operating_hours table
      const { data: schedule } = await supabase
        .from("park_operating_hours")
        .select("*")
        .eq("day_of_week", dayOfWeek)
        .maybeSingle();

      if (schedule) {
        if (!schedule.is_open) {
          operatingHoursText = "Libur (Jadwal Reguler)";
        } else if (schedule.open_time && schedule.close_time) {
          const openClean = schedule.open_time.slice(0, 5);
          const closeClean = schedule.close_time.slice(0, 5);
          operatingHoursText = `${openClean} - ${closeClean} WIB`;
        }
      }

      // 2. Check for today's operation log override (sudden closure / custom event notice)
      const { data: todayLog } = await supabase
        .from("park_operation_logs")
        .select("*")
        .eq("override_date", todayStr)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (todayLog) {
        if (todayLog.status === "CLOSED") {
          isParkOpen = false;
          if (todayLog.reason_notice) {
            activeNotice = todayLog.reason_notice;
          }
        } else if (todayLog.status === "OPEN") {
          isParkOpen = true;
        }
      } else if (schedule) {
        if (!schedule.is_open) {
          isParkOpen = false;
        } else if (schedule.open_time && schedule.close_time) {
          const openHour = parseInt(schedule.open_time.split(":")[0], 10);
          const closeHour = parseInt(schedule.close_time.split(":")[0], 10);
          isParkOpen = currentHour >= openHour && currentHour < closeHour;
        }
      }
    } catch {
      // Fallback default calculation if DB query is unconfigured
    }

    const noticeItems = activeNotice
      ? Array.from(
          { length: Math.max(8, Math.ceil(180 / activeNotice.length)) },
          () => activeNotice,
        )
      : [];

    return {
      isOpen: isParkOpen,
      operatingHours: operatingHoursText,
      closeNotice: noticeItems,
    };
  },
  ["get-live-status-cache-key"],
  {
    tags: ["live-status"],
    revalidate: 7200, // Auto revalidate every 2 hours
  },
);

export type ParkLiveStatusResponse = Awaited<ReturnType<typeof getLiveStatus>>;

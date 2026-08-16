import { createClient } from "@/lib/supabase/client";
import { unstable_cache } from "next/cache";

export const getLiveStatus = unstable_cache(
  async () => {
    // Determine WIB (Asia/Jakarta) date and time cleanly via Intl.DateTimeFormat
    const now = new Date();
    const wibFormatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Jakarta",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      weekday: "short",
      hour12: false,
    });

    const parts = wibFormatter.formatToParts(now);
    const partMap: Record<string, string> = {};
    parts.forEach((p) => {
      partMap[p.type] = p.value;
    });

    // Extract YYYY-MM-DD
    const todayStr = `${partMap.year}-${partMap.month}-${partMap.day}`;

    // Get WIB day of week (0 = Minggu, 1 = Senin, ... 6 = Sabtu)
    const nowWib = new Date(
      now.toLocaleString("en-US", { timeZone: "Asia/Jakarta" })
    );
    const dayOfWeek = nowWib.getDay();

    const currentHour = parseInt(partMap.hour, 10) % 24;
    const currentMinute = parseInt(partMap.minute, 10);
    const currentTotalMinutes = currentHour * 60 + currentMinute;

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
          isParkOpen = false;
          operatingHoursText = "Libur (Jadwal Reguler)";
        } else if (schedule.open_time && schedule.close_time) {
          const openClean = schedule.open_time.slice(0, 5);
          const closeClean = schedule.close_time.slice(0, 5);
          operatingHoursText = `${openClean} - ${closeClean} WIB`;

          const [oHour, oMin] = openClean.split(":").map(Number);
          const [cHour, cMin] = closeClean.split(":").map(Number);
          const openTotal = oHour * 60 + (oMin || 0);
          const closeTotal = cHour * 60 + (cMin || 0);

          isParkOpen =
            currentTotalMinutes >= openTotal && currentTotalMinutes < closeTotal;
        }
      }

      // 2. Check for today's operation log override (higher priority)
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
        } else if (todayLog.status === "MODIFIED") {
          if (todayLog.custom_open_time && todayLog.custom_close_time) {
            const openClean = todayLog.custom_open_time.slice(0, 5);
            const closeClean = todayLog.custom_close_time.slice(0, 5);
            operatingHoursText = `${openClean} - ${closeClean} WIB (Jadwal Khusus)`;

            const [oHour, oMin] = openClean.split(":").map(Number);
            const [cHour, cMin] = closeClean.split(":").map(Number);
            const openTotal = oHour * 60 + (oMin || 0);
            const closeTotal = cHour * 60 + (cMin || 0);

            isParkOpen =
              currentTotalMinutes >= openTotal &&
              currentTotalMinutes < closeTotal;
          }
          if (todayLog.reason_notice) {
            activeNotice = todayLog.reason_notice;
          }
        } else if (todayLog.status === "OPEN") {
          isParkOpen = true;
        }
      }
    } catch {
      // Fallback default calculation
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
    revalidate: 7200,
  },
);

export type ParkLiveStatusResponse = Awaited<ReturnType<typeof getLiveStatus>>;

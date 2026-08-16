import { createClient } from "@/lib/supabase/client";
import { unstable_cache } from "next/cache";

export interface OperatingScheduleData {
  is_open?: boolean;
  open_time?: string | null;
  close_time?: string | null;
}

export interface OperationLogData {
  status?: string | null;
  custom_open_time?: string | null;
  custom_close_time?: string | null;
  reason_notice?: string | null;
}

/**
 * Pure helper function to parse HH:mm or HH:mm:ss to total minutes since midnight
 */
export function parseTimeToMinutes(timeStr: string): number {
  if (!timeStr) return 0;
  const clean = timeStr.slice(0, 5);
  const [h, m] = clean.split(":").map(Number);
  return (h || 0) * 60 + (m || 0);
}

/**
 * Pure function to compute park operating status given current WIB total minutes, schedule, and override log
 */
export function computeParkStatus(
  currentTotalMinutes: number,
  schedule: OperatingScheduleData | null,
  todayLog: OperationLogData | null,
) {
  let isParkOpen = false;
  let activeNotice: string | null = null;
  let operatingHoursText = "06:00 - 18:00 WIB";
  let statusLabel = "Ditutup (Sesuai Jam Reguler)";
  let isEmergencyClosed = false;
  let isScheduleOpenNow = false;

  if (schedule) {
    if (!schedule.is_open) {
      operatingHoursText = "Libur (Jadwal Reguler)";
      isScheduleOpenNow = false;
    } else if (schedule.open_time && schedule.close_time) {
      const openClean = schedule.open_time.slice(0, 5);
      const closeClean = schedule.close_time.slice(0, 5);
      operatingHoursText = `${openClean} - ${closeClean} WIB`;

      const openTotal = parseTimeToMinutes(schedule.open_time);
      const closeTotal = parseTimeToMinutes(schedule.close_time);

      isScheduleOpenNow =
        currentTotalMinutes >= openTotal && currentTotalMinutes < closeTotal;
    }
  }

  // Base status from regular schedule
  isParkOpen = isScheduleOpenNow;
  statusLabel = isParkOpen ? "Beroperasi" : "Ditutup (Sesuai Jam Reguler)";

  // Check today's operation log override
  if (todayLog) {
    if (todayLog.status === "CLOSED") {
      isParkOpen = false;
      isEmergencyClosed = true;
      statusLabel = "Ditutup Sementara (Penutupan Darurat)";
      if (todayLog.reason_notice) {
        activeNotice = todayLog.reason_notice;
      }
    } else if (todayLog.status === "MODIFIED") {
      if (todayLog.custom_open_time && todayLog.custom_close_time) {
        const openClean = todayLog.custom_open_time.slice(0, 5);
        const closeClean = todayLog.custom_close_time.slice(0, 5);
        operatingHoursText = `${openClean} - ${closeClean} WIB (Jadwal Khusus)`;

        const openTotal = parseTimeToMinutes(todayLog.custom_open_time);
        const closeTotal = parseTimeToMinutes(todayLog.custom_close_time);

        isParkOpen =
          currentTotalMinutes >= openTotal && currentTotalMinutes < closeTotal;

        statusLabel = isParkOpen
          ? "Beroperasi (Jadwal Khusus)"
          : "Ditutup (Di Luar Jam Khusus)";
      }
      if (todayLog.reason_notice) {
        activeNotice = todayLog.reason_notice;
      }
    } else if (todayLog.status === "OPEN") {
      isParkOpen = isScheduleOpenNow;
      statusLabel = isParkOpen ? "Beroperasi" : "Ditutup (Sesuai Jam Reguler)";
    }
  }

  const noticeItems = activeNotice
    ? Array.from(
        { length: Math.max(8, Math.ceil(180 / activeNotice.length)) },
        () => activeNotice,
      )
    : [];

  return {
    isOpen: isParkOpen,
    statusLabel,
    isEmergencyClosed,
    operatingHours: operatingHoursText,
    closeNotice: noticeItems,
  };
}

// Cached DB fetcher (caches schedule and todayLog per day/date)
export const getCachedOperatingData = unstable_cache(
  async (dayOfWeek: number, todayStr: string) => {
    try {
      const supabase = createClient();

      const { data: schedule } = await supabase
        .from("park_operating_hours")
        .select("*")
        .eq("day_of_week", dayOfWeek)
        .maybeSingle();

      const { data: todayLog } = await supabase
        .from("park_operation_logs")
        .select("*")
        .eq("override_date", todayStr)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      return { schedule, todayLog };
    } catch {
      return { schedule: null, todayLog: null };
    }
  },
  ["live-status-db-cache"],
  {
    tags: ["live-status"],
    revalidate: 3600,
  },
);

export async function getLiveStatus() {
  // 1. Determine WIB (Asia/Jakarta) date and time dynamically per request
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
    now.toLocaleString("en-US", { timeZone: "Asia/Jakarta" }),
  );
  const dayOfWeek = nowWib.getDay();

  const currentHour = parseInt(partMap.hour, 10) % 24;
  const currentMinute = parseInt(partMap.minute, 10);
  const currentTotalMinutes = currentHour * 60 + currentMinute;

  // 2. Fetch cached DB data
  const { schedule, todayLog } = await getCachedOperatingData(
    dayOfWeek,
    todayStr,
  );

  // 3. Compute status using pure computeParkStatus function
  return computeParkStatus(currentTotalMinutes, schedule, todayLog);
}

export type ParkLiveStatusResponse = Awaited<ReturnType<typeof getLiveStatus>>;

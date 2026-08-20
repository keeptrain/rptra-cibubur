import { getCurrentWibDateDetails } from "./utils";

/**
 * Checks if an agenda event is currently active / ongoing right now in WIB timezone.
 * Returns true ONLY if:
 * 1. eventDate === serverWibToday (today)
 * 2. Current WIB time (HH:mm:ss) >= startTime AND Current WIB time <= endTime
 */
export function isEventOngoing(
  eventDate: string,
  startTime: string,
  endTime: string,
  serverWibToday?: string,
): boolean {
  const wibDetails = getCurrentWibDateDetails();
  const todayStr = serverWibToday || wibDetails.fullDate;

  if (eventDate !== todayStr) return false;

  // Format current WIB time as "HH:mm:ss" in 24-hour format
  const now = new Date();
  const wibTimeFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Jakarta",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const parts = wibTimeFormatter.formatToParts(now);
  let hour = "00";
  let minute = "00";
  let second = "00";

  parts.forEach((p) => {
    if (p.type === "hour") hour = p.value.padStart(2, "0");
    if (p.type === "minute") minute = p.value.padStart(2, "0");
    if (p.type === "second") second = p.value.padStart(2, "0");
  });

  if (hour === "24") hour = "00";

  const currentWibTime = `${hour}:${minute}:${second}`;

  // Standardize startTime & endTime to HH:mm:ss
  const formatTime = (t: string) => {
    const clean = t.replace(/WIB/i, "").trim();
    const timeParts = clean.split(":");
    const h = (timeParts[0] || "00").padStart(2, "0");
    const m = (timeParts[1] || "00").padStart(2, "0");
    const s = (timeParts[2] || "00").padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const start = formatTime(startTime);
  const end = formatTime(endTime);

  return currentWibTime >= start && currentWibTime <= end;
}

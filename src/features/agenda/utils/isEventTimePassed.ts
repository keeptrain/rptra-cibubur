/**
 * Evaluates whether an event date and end time has passed current WIB time.
 * Executed dynamically on server outside unstable_cache to ensure 100% fresh calculations.
 */
export function isEventTimePassed(
  eventDateStr: string,
  endTimeStr: string,
): boolean {
  const now = new Date();
  const wibFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const parts = wibFormatter.formatToParts(now);
  const partMap: Record<string, string> = {};
  parts.forEach((p) => {
    partMap[p.type] = p.value;
  });

  const todayWibStr = `${partMap.year}-${partMap.month}-${partMap.day}`;
  const nowWibMinutes =
    parseInt(partMap.hour || "0", 10) * 60 +
    parseInt(partMap.minute || "0", 10);

  if (eventDateStr < todayWibStr) return true;
  if (eventDateStr > todayWibStr) return false;

  const cleanEnd = (endTimeStr || "00:00").slice(0, 5);
  const [eH, eM] = cleanEnd.split(":").map(Number);
  const endMinutes = (eH || 0) * 60 + (eM || 0);

  return nowWibMinutes >= endMinutes;
}

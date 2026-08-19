export interface WibDateDetails {
  year: string;
  month: string;
  day: string;
  fullDate: string;
}

/**
 * Returns structured WIB timezone date details (year, month, day, fullDate)
 * to avoid manual string splitting and eliminate hydration mismatches.
 */
export function getCurrentWibDateDetails(): WibDateDetails {
  const now = new Date();
  const wibFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const parts = wibFormatter.formatToParts(now);
  const partMap: Record<string, string> = {};
  parts.forEach((p) => {
    partMap[p.type] = p.value;
  });

  const year = partMap.year || "2026";
  const month = partMap.month || "08";
  const day = partMap.day || "19";

  return {
    year,
    month,
    day,
    fullDate: `${year}-${month}-${day}`,
  };
}

export function getCurrentWibDateString(): string {
  return getCurrentWibDateDetails().fullDate;
}

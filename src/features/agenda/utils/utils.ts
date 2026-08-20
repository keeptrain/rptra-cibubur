export interface WibDateDetails {
  year: string;
  month: string;
  day: string;
  fullDate: string;
}

export interface WibDayItem {
  dateStr: string;
  dayNum: string;
  dayShort: string;
  dayFull: string;
  isToday: boolean;
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
  const day = partMap.day || "20";

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

export function getIndonesianMonthYear(monthStr: string, yearStr: string): string {
  const monthNames: Record<string, string> = {
    "01": "Januari",
    "02": "Februari",
    "03": "Maret",
    "04": "April",
    "05": "Mei",
    "06": "Juni",
    "07": "Juli",
    "08": "Agustus",
    "09": "September",
    "10": "Oktober",
    "11": "November",
    "12": "Desember",
  };

  const name = monthNames[monthStr] || "Agustus";
  return `${name} ${yearStr}`;
}

export function getNext7WibDays(wibDate: WibDateDetails): WibDayItem[] {
  const days: WibDayItem[] = [];
  const baseDate = new Date(`${wibDate.fullDate}T00:00:00+07:00`);
  const dayNamesShort = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
  const dayNamesFull = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

  for (let i = 0; i < 7; i++) {
    const d = new Date(baseDate);
    d.setDate(baseDate.getDate() + i);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const dateStr = `${year}-${month}-${day}`;

    const dayIndex = d.getDay();
    days.push({
      dateStr,
      dayNum: day,
      dayShort: dayNamesShort[dayIndex],
      dayFull: dayNamesFull[dayIndex],
      isToday: i === 0,
    });
  }

  return days;
}

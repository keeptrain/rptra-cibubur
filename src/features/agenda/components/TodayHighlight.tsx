import { CalendarPlus, ArrowUpRight } from "lucide-react";
import { AgendaItem } from "../constants/agendas";

interface TodayHighlightProps {
  agenda: AgendaItem;
}

function getGoogleCalendarUrl(agenda: AgendaItem) {
  const title = encodeURIComponent(`${agenda.title} - RPTRA Cibubur`);
  const details = encodeURIComponent(
    `${agenda.description}\n\nWaktu: ${agenda.time}\nLokasi: ${agenda.location}${
      agenda.instructor ? `\nPendamping: ${agenda.instructor}` : ""
    }`
  );
  const location = encodeURIComponent(
    `${agenda.location}, RPTRA Cibubur, Jakarta Timur`
  );

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const dateFormatted = `${year}${month}${day}`;

  let startTime = "080000";
  let endTime = "100000";

  const timeMatch = agenda.time.match(/(\d{2}):(\d{2})\s*-\s*(\d{2}):(\d{2})/);
  if (timeMatch) {
    startTime = `${timeMatch[1]}${timeMatch[2]}00`;
    endTime = `${timeMatch[3]}${timeMatch[4]}00`;
  }

  const dates = `${dateFormatted}T${startTime}/${dateFormatted}T${endTime}`;

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;
}

export default function TodayHighlight({ agenda }: TodayHighlightProps) {
  const calendarUrl = getGoogleCalendarUrl(agenda);

  return (
    <div className="relative overflow-hidden rounded-3xl border-2 border-emerald-950 bg-[#F7F5EE] p-6 text-emerald-950 shadow-[6px_6px_0px_0px_#041D17] sm:p-8">
      {/* Editorial Top Tag Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-emerald-950 pb-4">
        <div className="flex items-center gap-2">
          <span className="inline-block size-2.5 animate-pulse rounded-full bg-emerald-600" />
          <span className="text-xs font-black tracking-widest text-emerald-950 uppercase">
            HARI INI • {agenda.dayName.toUpperCase()}
          </span>
        </div>
        <span className="text-xs font-black tracking-wider text-emerald-800 uppercase">
          {agenda.categoryLabel}
        </span>
      </div>

      {/* Main Content */}
      <div className="space-y-4 pt-5">
        <h2 className="text-3xl leading-[0.95] font-black tracking-tight uppercase sm:text-4xl lg:text-5xl">
          {agenda.title}
        </h2>

        <p className="max-w-3xl text-xs leading-relaxed font-semibold text-emerald-900/80 sm:text-sm">
          {agenda.description}
        </p>

        {/* Minimal Hairline Meta Grid */}
        <div className="grid grid-cols-1 gap-4 border-t-2 border-emerald-950 pt-4 text-xs font-black sm:grid-cols-3 sm:text-sm">
          <div>
            <span className="block text-[10px] tracking-widest text-emerald-700 uppercase">
              WAKTU
            </span>
            <span className="text-emerald-950">{agenda.time}</span>
          </div>

          <div>
            <span className="block text-[10px] tracking-widest text-emerald-700 uppercase">
              LOKASI
            </span>
            <span className="text-emerald-950">{agenda.location}</span>
          </div>

          {agenda.instructor && (
            <div>
              <span className="block text-[10px] tracking-widest text-emerald-700 uppercase">
                NARSUM / PENDAMPING
              </span>
              <span className="text-emerald-950">{agenda.instructor}</span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-3">
          <a
            href={calendarUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-emerald-950 bg-emerald-950 px-6 py-3.5 text-xs font-black tracking-wider text-[#A7F3D0] uppercase shadow-[3px_3px_0px_0px_#A7F3D0] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
          >
            <CalendarPlus className="size-4 text-[#A7F3D0]" />
            + SIMPAN KE GOOGLE CALENDAR
            <ArrowUpRight className="size-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

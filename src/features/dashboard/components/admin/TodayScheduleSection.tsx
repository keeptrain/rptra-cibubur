import { Users } from "lucide-react";

interface TodayItem {
  id: string;
  type: "VISIT" | "EVENT";
  title: string;
  time: string;
  organizer: string;
  participantsCount?: number;
  location?: string;
}

interface TodayScheduleSectionProps {
  items?: TodayItem[];
}

const mockSampleItems: TodayItem[] = [
  {
    id: "1",
    type: "VISIT",
    title: "Kunjungan PAUD Melati Cibubur",
    time: "09:00 WIB",
    organizer: "PAUD Melati (Kunjungan Rombongan)",
    participantsCount: 35,
  },
  {
    id: "2",
    type: "EVENT",
    title: "Senam Kesehatan Lansia RPTRA",
    time: "15:30 WIB",
    organizer: "Kader PKK Cibubur",
    participantsCount: 20,
  },
];

export default function TodayScheduleSection({
  items = mockSampleItems,
}: TodayScheduleSectionProps) {
  // Format current Indonesian date string
  const timeZone = "Asia/Jakarta";
  const todayDateStr = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone,
  });

  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 px-5 text-left shadow-xs sm:p-5 sm:px-6">
      {/* CARD HEADER */}
      <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
        <span className="text-2xl font-black text-slate-900">
          {items.length}
        </span>
        <div>
          <h3 className="text-xs font-black tracking-wider text-slate-900 uppercase">
            AGENDA &amp; KUNJUNGAN HARI INI
          </h3>
          <p className="text-[11px] font-semibold text-slate-400">
            {todayDateStr}
          </p>
        </div>
      </div>

      {/* ITEMS LIST OR EMPTY STATE */}
      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/60 p-5 text-center">
          <p className="text-xs font-semibold text-slate-500">
            Tidak ada jadwal kunjungan atau agenda warga untuk hari ini.
          </p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-2 rounded-xl border border-slate-200/80 bg-slate-50/60 p-3.5 sm:flex-row sm:items-center sm:justify-between"
            >
              {/* ITEM TIME BADGE & COLUMN DETAILS */}
              <div className="flex flex-col items-start gap-3 sm:flex-row">
                <div className="shrink-0 rounded-lg bg-slate-200/80 px-2.5 py-1 text-xs font-bold text-slate-700">
                  {item.time}
                </div>

                <div className="flex flex-col gap-0.5">
                  <h4 className="text-sm leading-snug font-bold text-slate-900">
                    {item.title}
                  </h4>
                  <p className="text-xs font-medium text-slate-500">
                    {item.organizer}
                  </p>
                </div>
              </div>

              {/* PARTICIPANTS COUNT BADGE */}
              {item.participantsCount && (
                <div className="flex items-center gap-1.5 self-start rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-bold text-slate-700 shadow-2xs sm:self-auto">
                  <Users className="size-3.5 text-slate-500" />
                  <span>{item.participantsCount} Orang</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

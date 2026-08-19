import { getAgenda } from "./api/getAgenda";
import { AgendaItem as PublicAgendaItem } from "./constants/agendas";
import TodayHighlight from "./components/TodayHighlight";
import SevenDaySchedule from "./components/SevenDaySchedule";
import FullCalendarView from "./components/FullCalendarView";

function getDayNameIndonesian(dateStr: string): string {
  if (!dateStr) return "Hari Ini";
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? "Hari Ini" : days[d.getDay()];
}

export default async function AgendaPage() {
  const { agendas: dbAgendas, serverWibToday } = await getAgenda();

  const formattedAgendas: PublicAgendaItem[] =
    dbAgendas.length > 0
      ? dbAgendas.map((item) => {
          const isToday = item.eventDate === serverWibToday;
          return {
            id: item.id,
            title: item.title,
            category: "komunitas",
            categoryLabel: item.organizer || "Kegiatan RPTRA",
            date: item.eventDate,
            dayName: getDayNameIndonesian(item.eventDate),
            time: `${item.startTime} - ${item.endTime} WIB`,
            location: item.location,
            instructor: item.organizer,
            targetAudience: "Warga RPTRA Cibubur",
            description: item.description,
            isToday,
            isOngoing: isToday,
          };
        })
      : [];

  const todayAgenda =
    formattedAgendas.find((a) => a.isToday) || formattedAgendas[0];

  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
      <div className="mt-8 space-y-12">
        {/* Today's Spotlight Hero Banner */}
        {todayAgenda ? <TodayHighlight agenda={todayAgenda} /> : null}

        {/* 7-Day Schedule Section */}
        <section className="space-y-4">
          <h3 className="text-xl font-black tracking-tight text-emerald-950 uppercase sm:text-2xl">
            JADWAL 7 HARI KE DEPAN
          </h3>
          <SevenDaySchedule agendas={formattedAgendas} />
        </section>

        {/* Full Monthly Calendar View */}
        <section className="space-y-4">
          <h3 className="text-xl font-black tracking-tight text-emerald-950 uppercase sm:text-2xl">
            KALENDER KEGIATAN BULANAN
          </h3>
          <FullCalendarView agendas={formattedAgendas} />
        </section>
      </div>
    </main>
  );
}

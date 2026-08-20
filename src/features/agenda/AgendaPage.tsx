import TodayHighlight from "./components/TodayHighlight";
import SevenDaySchedule from "./components/SevenDaySchedule";
import { getPublicAgendas } from "./api/getPublicAgendas";

export default async function AgendaPage() {
  const { formattedAgendas, todayAgenda } = await getPublicAgendas();

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
      </div>
    </main>
  );
}

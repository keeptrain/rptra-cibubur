import { Suspense } from "react";
import { Calendar } from "lucide-react";
import FilterUpcomingEventCard from "./components/FilterUpcomingEventCard";
import EventCard from "./components/EventCard";
import { getPublicAgendas } from "./api/getPublicAgendas";
import EventCardSkeleton from "./components/skeleton/EventCardSkeleton";
import { AgendaItem as PublicAgendaItem } from "./constants/agendas";

interface AgendaPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function AgendaPage({ searchParams }: AgendaPageProps) {
  const { formattedAgendas, currentMonthName, next7Days } =
    await getPublicAgendas();

  const defaultDayDate = next7Days[0]?.dateStr || "";

  const resolvedSearchParams = await searchParams;
  const selectedDay = (resolvedSearchParams?.day as string) || defaultDayDate;

  return (
    <main className="mx-auto w-full max-w-7xl px-4 pt-8 pb-40 sm:px-6 lg:px-8">
      <div className="space-y-6">
        {/* FILTER AREA (MONTH TITLE & 7-DAY PILL STRIP FULL WIDTH) */}
        <FilterUpcomingEventCard
          next7Days={next7Days}
          currentMonthName={currentMonthName}
        />

        {/* SUSPENSE BOUNDARY FOR TRANSITION SKELETON */}
        <Suspense key={selectedDay} fallback={<EventCardSkeleton />}>
          <AsyncAgendaList
            selectedDay={selectedDay}
            formattedAgendas={formattedAgendas}
          />
        </Suspense>
      </div>
    </main>
  );
}

/**
 * Async Server Component for rendering filtered agenda list.
 * Awaits data resolution to trigger Suspense fallback stream during URL query param transitions.
 */
async function AsyncAgendaList({
  selectedDay,
  formattedAgendas,
}: {
  selectedDay: string;
  formattedAgendas: PublicAgendaItem[];
}) {
  // Artificial 500ms delay to demonstrate Suspense streaming skeleton fallback
  await new Promise((resolve) => setTimeout(resolve, 500));

  const filteredAgendas = formattedAgendas.filter(
    (item) => item.date === selectedDay || item.dayName === selectedDay,
  );

  if (filteredAgendas.length === 0) {
    return <Empty />;
  }

  return (
    <div className="space-y-3">
      {filteredAgendas.map((item) => (
        <EventCard key={item.id} item={item} />
      ))}
    </div>
  );
}

function Empty() {
  return (
    <div className="p-8 text-center">
      <Calendar className="mx-auto size-8 text-slate-300" />
      <p className="mt-2 text-base text-slate-500">
        Tidak ada agenda kegiatan pada tanggal ini.
      </p>
    </div>
  );
}

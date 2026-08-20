import { Suspense } from "react";
import { Calendar } from "lucide-react";
import FilterUpcomingEventCard from "./components/public/FilterUpcomingEventCard";
import EventCard from "./components/public/EventCard";
import { getPublicAgendas } from "./api/getPublicAgendas";
import EventCardSkeleton from "./components/skeleton/EventCardSkeleton";
import { AgendaItem as PublicAgendaItem } from "./constants/agendas";

interface AgendaPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function AgendaPage({ searchParams }: AgendaPageProps) {
  const resolvedSearchParams = await searchParams;
  const selectedDayParam = resolvedSearchParams?.day as string | undefined;

  const { agendas, currentMonthName, next7Days, activeDay } =
    await getPublicAgendas(selectedDayParam);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pt-8 pb-40 sm:px-6 lg:px-8">
      <div className="flex flex-1 flex-col space-y-6">
        {/* FILTER AREA (MONTH TITLE & 7-DAY PILL STRIP FULL WIDTH) */}
        <FilterUpcomingEventCard
          next7Days={next7Days}
          currentMonthName={currentMonthName}
        />

        {/* SUSPENSE BOUNDARY FOR TRANSITION SKELETON */}
        <div className="min-h-95">
          <Suspense key={activeDay} fallback={<EventCardSkeleton />}>
            <AsyncAgendaList agendas={agendas} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}

/**
 * Async Server Component for rendering pre-filtered agenda list.
 * Receives filtered agendas from single getPublicAgendas call.
 */
async function AsyncAgendaList({ agendas }: { agendas: PublicAgendaItem[] }) {
  // Artificial 500ms delay to demonstrate Suspense streaming skeleton fallback
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (agendas.length === 0) {
    return <Empty />;
  }

  return (
    <div className="space-y-3">
      {agendas.map((item) => (
        <EventCard key={item.id} item={item} />
      ))}
    </div>
  );
}

function Empty() {
  return (
    <div className="flex min-h-50 flex-col items-center justify-center p-8 text-center">
      <Calendar className="mx-auto size-8 text-slate-300" />
      <p className="mt-2 text-base text-slate-500">
        Tidak ada agenda kegiatan pada tanggal ini.
      </p>
    </div>
  );
}

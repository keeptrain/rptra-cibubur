import { Suspense } from "react";
import { Calendar } from "lucide-react";
import FilterUpcomingEventCard from "./components/FilterUpcomingEventCard";
import EventCard from "./components/EventCard";
import { getPublicAgendas } from "./api/getPublicAgendas";
import EventCardSkeleton from "./components/skeleton/EventCardSkeleton";

interface AgendaPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function AgendaPage({ searchParams }: AgendaPageProps) {
  const { formattedAgendas, currentMonthName, next7Days } =
    await getPublicAgendas();

  const defaultDayDate = next7Days[0]?.dateStr || "";

  const resolvedSearchParams = await searchParams;
  const selectedDay = (resolvedSearchParams?.day as string) || defaultDayDate;

  // Server-side filtering for optimal SEO rendering & zero client JS delay
  const filteredAgendas = formattedAgendas.filter(
    (item) => item.date === selectedDay || item.dayName === selectedDay,
  );

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
          {/* SERVER-SIDE RENDERED AGENDA CARDS LIST (EXPLICIT MAP FOR SEO) */}
          <div className="space-y-3 text-left">
            {filteredAgendas.length === 0 ? (
              <div className="border border-dashed border-slate-200 bg-slate-50/60 p-8 text-center">
                <Calendar className="mx-auto size-8 text-slate-300" />
                <p className="mt-2 text-xs font-semibold text-slate-500">
                  Tidak ada agenda kegiatan pada tanggal ini.
                </p>
              </div>
            ) : (
              filteredAgendas.map((item) => (
                <EventCard key={item.id} item={item} />
              ))
            )}
          </div>
        </Suspense>
      </div>
    </main>
  );
}

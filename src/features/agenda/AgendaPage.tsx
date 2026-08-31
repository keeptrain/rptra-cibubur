import { Suspense } from "react";
import Image from "next/image";
import MainContainer from "@/components/container/MainContainer";
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
    <MainContainer>
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
    </MainContainer>
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
    <div className="flex min-h-80 flex-col items-center justify-center gap-4 p-8 text-center">
      <Image
        src="/assets/empty-activities.svg"
        alt="Tidak ada agenda kegiatan"
        width={280}
        height={210}
        className="h-44 w-auto opacity-90 sm:h-52"
        priority={false}
      />
      <div className="space-y-1">
        <p className="text-sm font-semibold text-zinc-700">
          Belum ada kegiatan pada tanggal ini
        </p>
        <p className="text-xs text-zinc-500">
          Coba pilih tanggal lain di atas atau kembali lagi nanti.
        </p>
      </div>
    </div>
  );
}

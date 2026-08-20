import { Suspense } from "react";
import PageHeader from "@/components/shared/PageHeader";
import DetailAgendaSkeleton from "./components/skeleton/DetailAgendaSkeleton";
import { AgendaDetailContent } from "./components/shared/DetailAgendaContent";
import DetailAgendaActions from "./components/DetailAgendaActions";

interface DetailAgendaPageProps {
  params: Promise<{ id?: string }>;
}

export default async function DetailAgendaPage({
  params,
}: DetailAgendaPageProps) {
  const { id } = await params;
  const targetId = id || "";

  return (
    <main className="flex-1">
      <div className="mx-auto max-w-4xl">
        <PageHeader
          title="Rincian Agenda Kegiatan"
          description="Informasi rincian acara dan status pelaksanaan kegiatan RPTRA"
          backHref="/manajemen-agenda"
        />

        {/* REACT SUSPENSE BOUNDARY WITH SKELETON FALLBACK */}
        <Suspense fallback={<DetailAgendaSkeleton />}>
          <AgendaDetailContent
            id={targetId}
            renderActions={(agenda) => (
              <DetailAgendaActions id={agenda.id} status={agenda.status} />
            )}
          />
        </Suspense>
      </div>
    </main>
  );
}

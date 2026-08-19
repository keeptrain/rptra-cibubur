import { Suspense } from "react";
import PageHeader from "@/components/shared/PageHeader";
import ManagementAgendaContent from "./components/ManagementAgendaContent";
import { agendaSearchParamsCache } from "./params/agendaParams";
import ManagementAgendaSkeleton from "./components/skeleton/ManagementAgendaSkeleton";

interface ManagementAgendaPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ManagementAgendaPage({
  searchParams,
}: ManagementAgendaPageProps) {
  const parsedParams = await agendaSearchParamsCache.parse(searchParams);

  return (
    <main className="flex-1">
      <div className="mx-auto min-h-screen max-w-4xl">
        {/* SHARED REUSABLE PAGE HEADER (LOADS INSTANTLY WITH 0 LATENCY) */}
        <PageHeader
          backHref="/menu"
          title="Manajemen Agenda Kegiatan"
          description="Kelola jadwal & kalender kegiatan publik RPTRA"
        />

        {/* SUSPENSE BOUNDARY FOR CONTENT BELOW PAGE HEADER */}
        <Suspense fallback={<ManagementAgendaSkeleton />}>
          <ManagementAgendaContent initialParams={parsedParams} />
        </Suspense>
      </div>
    </main>
  );
}

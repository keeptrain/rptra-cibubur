import { Suspense } from "react";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import { getManagementAgenda } from "./api/getManagementAgenda";
import AgendaListSection from "./components/AgendaListSection";
import ManagementAgendaSkeleton from "./components/skeleton/ManagementAgendaSkeleton";
import { agendaSearchParamsCache } from "./params/agendaParams";
import { getCurrentWibDateDetails } from "./utils/utils";

interface ManagementAgendaPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ManagementAgendaPage({
  searchParams,
}: ManagementAgendaPageProps) {
  // Single top-level execution of current WIB date details for the request
  const wibDate = getCurrentWibDateDetails();

  const parsedParams = await agendaSearchParamsCache.parse(searchParams);
  const { agendas, metrics, currentMonth, currentYear } =
    await getManagementAgenda(wibDate, {
      status: parsedParams.status,
      month: parsedParams.month || wibDate.month,
      year: parsedParams.year || wibDate.year,
      q: parsedParams.q,
    });

  return (
    <main className="flex-1">
      <div className="mx-auto min-h-screen max-w-4xl">
        {/* SHARED REUSABLE PAGE HEADER (LOADS INSTANTLY WITH 0 LATENCY) */}
        <PageHeader
          backHref="/menu"
          title="Manajemen Agenda Kegiatan"
          description="Kelola jadwal & kalender kegiatan publik RPTRA"
        />

        <div className="space-y-6 text-left">
          <div className="space-y-4 border border-slate-200 bg-white p-5 text-left shadow-2xs">
            {/* TOP HEADER ROW: TITLE ON LEFT, CREATE BUTTON ON RIGHT */}
            <div className="flex flex-col gap-3 border-b border-slate-100 pb-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Daftar Agenda Kegiatan RPTRA
                </h3>
                <p className="text-xs font-medium text-slate-500">
                  Kelola status keterlaksanaan dan rincian agenda publik
                </p>
              </div>

              {/* CREATE AGENDA BUTTON LINK TO SEPARATE PAGE */}
              <Link
                href="/manajemen-agenda/form"
                className="inline-flex items-center gap-1.5 self-start bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-2xs transition-colors hover:bg-emerald-700 sm:self-auto"
              >
                <PlusIcon className="size-4" />
                Buat Agenda Baru
              </Link>
            </div>

            <Suspense fallback={<ManagementAgendaSkeleton />}>
              <AgendaListSection
                agendas={agendas}
                metrics={metrics}
                initialMonth={currentMonth}
                initialYear={currentYear}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}

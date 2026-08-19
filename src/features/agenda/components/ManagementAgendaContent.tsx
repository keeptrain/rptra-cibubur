import Link from "next/link";
import { PlusIcon } from "lucide-react";
import { getManagementAgenda } from "../api/getManagementAgenda";
import AgendaListSection from "./AgendaListSection";
import { AgendaStatus } from "../constants/agendas";

interface ManagementAgendaContentProps {
  initialParams?: {
    status: AgendaStatus;
    month: string;
    year: string;
    q: string;
  };
}

export default async function ManagementAgendaContent({
  initialParams,
}: ManagementAgendaContentProps) {
  // Execute BFF Server Data Resolution
  const { agendas, currentMonth, currentYear } = await getManagementAgenda();

  return (
    <div className="space-y-6 text-left">
      {/* SECTION 2: MAIN AGENDA LIST & FILTERS CONTAINER */}
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
        <AgendaListSection
          agendas={agendas}
          initialMonth={initialParams?.month || currentMonth}
          initialYear={initialParams?.year || currentYear}
        />
      </div>
    </div>
  );
}

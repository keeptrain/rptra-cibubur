import { Suspense } from "react";
import Link from "next/link";
import PageHeader from "@/components/shared/PageHeader";
import { getAgendaById } from "./api/getAgendaById";
import DetailAgendaCard from "./components/DetailAgendaCard";
import DetailAgendaActions from "./components/DetailAgendaActions";
import DetailAgendaSkeleton from "./components/skeleton/DetailAgendaSkeleton";
import { ArrowLeft } from "lucide-react";

interface DetailAgendaPageProps {
  params: Promise<{ id?: string; slug?: string }>;
}

async function AgendaDetailContent({ id }: { id: string }) {
  const agenda = await getAgendaById(id);

  if (!agenda) {
    return (
      <div className="border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
        <p className="mb-4 text-sm font-semibold text-slate-600">
          Agenda kegiatan tidak ditemukan atau telah dihapus.
        </p>
        <Link
          href="/manajemen-agenda"
          className="inline-flex items-center gap-1.5 bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700"
        >
          <ArrowLeft className="size-4" />
          Kembali ke Daftar Agenda
        </Link>
      </div>
    );
  }

  return (
    <DetailAgendaCard agenda={agenda}>
      <DetailAgendaActions id={agenda.id} status={agenda.status} />
    </DetailAgendaCard>
  );
}

export default async function DetailAgendaPage({
  params,
}: DetailAgendaPageProps) {
  const { slug, id } = await params;
  const targetId = slug || id || "";

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
          <AgendaDetailContent id={targetId} />
        </Suspense>
      </div>
    </main>
  );
}

import { Suspense } from "react";
import MainContainer from "@/components/container/MainContainer";
import BackButton from "@/components/shared/BackButton";
import { AgendaDetailContent } from "./components/shared/DetailAgendaContent";
import DetailAgendaSkeleton from "./components/skeleton/DetailAgendaSkeleton";

interface PublicDetailAgendaPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PublicDetailAgendaPage({
  params,
}: PublicDetailAgendaPageProps) {
  const { slug } = await params;
  return (
    <MainContainer>
      {/* REACT SUSPENSE BOUNDARY WITH ROUNDED-XL SKELETON FALLBACK */}
      <Suspense fallback={<DetailAgendaSkeleton isRounded />}>
        <div className="rounded-xl border border-zinc-200 bg-white p-6 text-left shadow-2xs sm:p-8">
          <AgendaDetailContent id={slug} renderActions={() => null} />
        </div>
      </Suspense>

      {/* PUBLIC ACTIONS DIRECTLY BELOW THE CARD */}
      <div className="flex w-full flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <BackButton
          fallbackHref="/agenda"
          className="w-full justify-center rounded-xl border border-zinc-200 bg-zinc-50 py-3 text-xs font-bold text-zinc-700 transition-all hover:border-zinc-300 hover:bg-zinc-100 hover:text-zinc-900 sm:w-auto sm:px-6"
        >
          Kembali ke Daftar Agenda
        </BackButton>
      </div>
    </MainContainer>
  );
}

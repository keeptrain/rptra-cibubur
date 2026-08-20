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
      <div className="flex items-center">
        <BackButton fallbackHref="/agenda">Kembali</BackButton>
      </div>

      {/* REACT SUSPENSE BOUNDARY WITH SKELETON FALLBACK */}
      <Suspense fallback={<DetailAgendaSkeleton />}>
        <AgendaDetailContent id={slug} renderActions={() => null} />
      </Suspense>
    </MainContainer>
  );
}

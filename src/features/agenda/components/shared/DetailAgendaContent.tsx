import { ReactNode } from "react";
import { FileQuestionIcon } from "lucide-react";
import { getAgendaById, DetailAgendaItem } from "../../api/getAgendaById";
import DetailAgendaCard from "../DetailAgendaCard";

interface AgendaDetailContentProps {
  id: string;
  renderActions: (agenda: DetailAgendaItem) => ReactNode;
}

export async function AgendaDetailContent({
  id,
  renderActions,
}: AgendaDetailContentProps) {
  const agenda = await getAgendaById(id);

  if (!agenda) {
    return (
      <div className="border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-slate-100">
          <FileQuestionIcon className="size-7" />
        </div>
        <p className="mb-4 text-sm text-slate-600">
          Agenda kegiatan tidak ditemukan atau telah dihapus.
        </p>
      </div>
    );
  }

  return (
    <DetailAgendaCard agenda={agenda}>{renderActions(agenda)}</DetailAgendaCard>
  );
}

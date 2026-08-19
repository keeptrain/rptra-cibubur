import { getManagementAgenda } from "../api/getManagementAgenda";
import AgendaListSection from "./AgendaListSection";

export default async function ManagementAgendaContent() {
  // Execute BFF Server Data Resolution
  const { agendas, currentMonth, currentYear } = await getManagementAgenda();

  return (
    <div className="space-y-6">
      {/* CLIENT MANAGEMENT SECTIONS (4-CARD DYNAMIC METRICS + AGENDA LIST) */}
      <AgendaListSection
        agendas={agendas}
        initialMonth={currentMonth}
        initialYear={currentYear}
      />
    </div>
  );
}

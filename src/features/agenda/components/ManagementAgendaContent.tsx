import AgendaManagementClient from "./AgendaManagementClient";
import { getManagementAgenda } from "../api/getManagementAgenda";

export default async function ManagementAgendaContent() {
  // Execute BFF Server Data Resolution
  const { agendas } = await getManagementAgenda();

  return (
    <div className="space-y-6">
      {/* CLIENT MANAGEMENT SECTIONS (4-CARD DYNAMIC METRICS + AGENDA LIST) */}
      <AgendaManagementClient initialAgendas={agendas} />
    </div>
  );
}

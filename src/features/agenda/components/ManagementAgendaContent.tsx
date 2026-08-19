import AgendaMetrics from "./AgendaMetrics";
import AgendaManagementClient from "./AgendaManagementClient";
import { getManagementAgendaPageData } from "../api/getManagementAgendaPageData";

export default async function ManagementAgendaContent() {
  // Execute BFF Server Data Resolution
  const { agendas, metrics } = await getManagementAgendaPageData();

  return (
    <div className="space-y-6">
      {/* SECTION 1: SUMMARY METRICS STATS */}
      <AgendaMetrics
        totalThisMonth={metrics.totalThisMonth}
        upcomingCount={metrics.upcomingCount}
        completedCount={metrics.completedCount}
      />

      {/* SECTION 2 & 3: CLIENT MANAGEMENT SECTIONS (PENDING CONFIRMATIONS & LIST) */}
      <AgendaManagementClient initialAgendas={agendas} />
    </div>
  );
}

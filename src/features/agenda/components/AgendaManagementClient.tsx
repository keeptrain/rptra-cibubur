"use client";

import AgendaListSection, { AgendaItem } from "./AgendaListSection";

interface AgendaManagementClientProps {
  initialAgendas: AgendaItem[];
}

export default function AgendaManagementClient({
  initialAgendas,
}: AgendaManagementClientProps) {
  return (
    <div className="space-y-6">
      {/* MAIN AGENDA LIST & 4-CARD DYNAMIC METRIC FILTERS */}
      <AgendaListSection agendas={initialAgendas} />
    </div>
  );
}

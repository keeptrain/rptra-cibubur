"use client";

import { useState } from "react";
import PendingConfirmationSection from "./PendingConfirmationSection";
import AgendaListSection, { AgendaItem } from "./AgendaListSection";

interface AgendaManagementClientProps {
  initialAgendas: AgendaItem[];
}

export default function AgendaManagementClient({
  initialAgendas,
}: AgendaManagementClientProps) {
  const [agendas, setAgendas] = useState<AgendaItem[]>(initialAgendas);

  const handleConfirmCompleted = (id: string) => {
    setAgendas((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "COMPLETED" } : item
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* SECTION 2: DEDICATED PENDING CONFIRMATION SECTION (FOR PAST UNCONFIRMED EVENTS) */}
      <PendingConfirmationSection
        agendas={agendas}
        onConfirmCompleted={handleConfirmCompleted}
      />

      {/* SECTION 3: AGENDA LIST SECTION WITH STATUS FILTERS */}
      <AgendaListSection agendas={agendas} />
    </div>
  );
}

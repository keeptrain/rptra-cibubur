"use client";

import { useState } from "react";
import PendingConfirmationSection from "./PendingConfirmationSection";
import AgendaListSection, { AgendaItem } from "./AgendaListSection";

interface AgendaManagementClientProps {
  initialAgendas: AgendaItem[];
  initialPendingAgendas: AgendaItem[];
}

export default function AgendaManagementClient({
  initialAgendas,
  initialPendingAgendas,
}: AgendaManagementClientProps) {
  const [agendas, setAgendas] = useState<AgendaItem[]>(initialAgendas);
  const [pendingAgendas, setPendingAgendas] = useState<AgendaItem[]>(initialPendingAgendas);

  const handleConfirmCompleted = (id: string) => {
    setAgendas((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "COMPLETED" } : item
      )
    );
    setPendingAgendas((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* SECTION 2: DEDICATED PENDING CONFIRMATION SECTION (PRE-FILTERED ON SERVER) */}
      <PendingConfirmationSection
        pendingAgendas={pendingAgendas}
        onConfirmCompleted={handleConfirmCompleted}
      />

      {/* SECTION 3: AGENDA LIST SECTION WITH STATUS FILTERS */}
      <AgendaListSection agendas={agendas} />
    </div>
  );
}

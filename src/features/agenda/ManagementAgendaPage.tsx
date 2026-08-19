"use client";

import { useState } from "react";
import PageHeader from "@/components/shared/PageHeader";
import AgendaMetrics from "./components/AgendaMetrics";
import PendingConfirmationSection from "./components/PendingConfirmationSection";
import AgendaListSection, { AgendaItem } from "./components/AgendaListSection";

const DUMMY_AGENDAS: AgendaItem[] = [
  {
    id: "ag-01",
    title: "Senam Sehat Lansia & Pemeriksaan Kesehatan",
    eventDate: "2026-08-18", // Past date requiring confirmation
    startTime: "06:30",
    endTime: "08:30",
    location: "Lapangan Serbaguna RPTRA",
    organizer: "Puskesmas & Kader PKK Cibubur",
    description:
      "Senam kebugaran bersama dilanjutkan dengan pemeriksaan tekanan darah dan gula darah gratis untuk lansia.",
    status: "UPCOMING",
  },
  {
    id: "ag-02",
    title: "Pelatihan Kerajinan Daur Ulang Sampah Plastik",
    eventDate: "2026-08-22",
    startTime: "09:00",
    endTime: "11:30",
    location: "Aula Utama RPTRA",
    organizer: "Karang Taruna RT 05",
    description:
      "Workshop kreatif mengolah limbah plastik rumah tangga menjadi barang berguna dan bernilai jual.",
    status: "UPCOMING",
  },
  {
    id: "ag-03",
    title: "Posyandu Balita & Pembagian PMT Tambahan",
    eventDate: "2026-08-15",
    startTime: "08:00",
    endTime: "11:00",
    location: "Ruang Kesehatan RPTRA",
    organizer: "Kader Posyandu Cibubur",
    description:
      "Penimbangan balita, imunisasi rutin, dan pembagian makanan tambahan bergizi untuk tumbuh kembang anak.",
    status: "COMPLETED",
  },
  {
    id: "ag-04",
    title: "Lomba Mewarnai & Dongeng Anak Anak",
    eventDate: "2026-08-10",
    startTime: "13:00",
    endTime: "15:30",
    location: "Ruang Perpustakaan RPTRA",
    organizer: "Pengelola RPTRA & Komunitas Dongeng",
    description:
      "Kegiatan edukasi anak-anak mendengarkan cerita cerita rakyat Indonesia dan kompetisi mewarnai.",
    status: "COMPLETED",
  },
];

export default function ManagementAgendaPage() {
  const [agendas, setAgendas] = useState<AgendaItem[]>(DUMMY_AGENDAS);

  const handleConfirmCompleted = (id: string) => {
    setAgendas((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "COMPLETED" } : item
      )
    );
  };

  const totalThisMonth = agendas.length;
  const upcomingCount = agendas.filter((a) => a.status === "UPCOMING").length;
  const completedCount = agendas.filter((a) => a.status === "COMPLETED").length;

  return (
    <main className="flex-1">
      <div className="mx-auto min-h-screen max-w-4xl">
        {/* SHARED REUSABLE PAGE HEADER */}
        <PageHeader
          backHref="/menu"
          title="Manajemen Agenda Kegiatan"
          description="Kelola jadwal & kalender kegiatan publik RPTRA"
        />

        <div className="space-y-6">
          {/* SECTION 1: SUMMARY METRICS STATS */}
          <AgendaMetrics
            totalThisMonth={totalThisMonth}
            upcomingCount={upcomingCount}
            completedCount={completedCount}
          />

          {/* SECTION 2: DEDICATED PENDING CONFIRMATION SECTION (FOR PAST UNCONFIRMED EVENTS) */}
          <PendingConfirmationSection
            agendas={agendas}
            onConfirmCompleted={handleConfirmCompleted}
          />

          {/* SECTION 3: AGENDA LIST SECTION WITH STATUS FILTERS */}
          <AgendaListSection agendas={agendas} />
        </div>
      </div>
    </main>
  );
}

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { AgendaItem } from "../components/AgendaListSection";

export interface ManagementAgendaPageData {
  agendas: AgendaItem[];
  metrics: {
    totalThisMonth: number;
    upcomingCount: number;
    completedCount: number;
  };
  serverWibToday: string;
}

// Helper to get current today YYYY-MM-DD in Asia/Jakarta (WIB) timezone
export function getCurrentWibDateString(): string {
  const now = new Date();
  const wibFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const parts = wibFormatter.formatToParts(now);
  const partMap: Record<string, string> = {};
  parts.forEach((p) => {
    partMap[p.type] = p.value;
  });

  return `${partMap.year}-${partMap.month}-${partMap.day}`;
}

const DUMMY_AGENDAS: AgendaItem[] = [
  {
    id: "ag-01",
    title: "Senam Sehat Lansia & Pemeriksaan Kesehatan",
    eventDate: "2026-08-18",
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

/**
 * BFF (Backend For Frontend) API function to resolve all required page data
 * for ManagementAgendaPage in a single server execution with WIB timezone precision.
 */
export async function getManagementAgendaPageData(): Promise<ManagementAgendaPageData> {
  const serverWibToday = getCurrentWibDateString();

  // Simulated latency delay (1.5s) to demonstrate Skeleton Loading UI
  await new Promise((resolve) => setTimeout(resolve, 1500));

  try {
    const cookieStore = await cookies();
    const supabase = await createClient(cookieStore);

    const { data: dbAgendas, error } = await supabase
      .from("park_agendas")
      .select("*")
      .order("event_date", { ascending: false });

    const agendas: AgendaItem[] =
      error || !dbAgendas || dbAgendas.length === 0
        ? DUMMY_AGENDAS
        : dbAgendas.map((item) => ({
            id: item.id,
            title: item.title,
            eventDate: item.event_date,
            startTime: item.start_time?.slice(0, 5) || "08:00",
            endTime: item.end_time?.slice(0, 5) || "11:00",
            location: item.location || "RPTRA Cibubur",
            organizer: item.organizer || "Pengelola RPTRA",
            description: item.description || "",
            status: item.status || "UPCOMING",
          }));

    const totalThisMonth = agendas.length;
    const upcomingCount = agendas.filter((a) => a.status === "UPCOMING").length;
    const completedCount = agendas.filter((a) => a.status === "COMPLETED").length;

    return {
      agendas,
      metrics: {
        totalThisMonth,
        upcomingCount,
        completedCount,
      },
      serverWibToday,
    };
  } catch {
    const totalThisMonth = DUMMY_AGENDAS.length;
    const upcomingCount = DUMMY_AGENDAS.filter((a) => a.status === "UPCOMING").length;
    const completedCount = DUMMY_AGENDAS.filter((a) => a.status === "COMPLETED").length;

    return {
      agendas: DUMMY_AGENDAS,
      metrics: {
        totalThisMonth,
        upcomingCount,
        completedCount,
      },
      serverWibToday,
    };
  }
}

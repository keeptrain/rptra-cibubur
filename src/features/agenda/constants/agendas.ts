import {
  CalendarIcon,
  CheckLineIcon,
  ClockIcon,
  FileExclamationPointIcon,
  LucideIcon,
} from "lucide-react";

export interface AgendaItem {
  id: string;
  title: string;
  category: "kesehatan" | "olahraga" | "edukasi" | "komunitas";
  categoryLabel: string;
  date: string; // YYYY-MM-DD
  dayName: string;
  time: string;
  location: string;
  instructor?: string;
  targetAudience: string;
  description: string;
  isToday?: boolean;
  isOngoing?: boolean;
}

export type AgendaStatus = "ALL" | "UPCOMING" | "COMPLETED" | "PENDING";

export interface FilterManagementAgenda {
  activeTab: AgendaStatus;
  title: string;
  searchQuery: string;
  selectedMonth: string;
  selectedYear: string;
  icon: LucideIcon;
}

export const FILTER_MANAGEMENT_AGENDA: FilterManagementAgenda[] = [
  {
    activeTab: "ALL",
    title: "Total Agenda",
    searchQuery: "",
    selectedMonth: "08",
    selectedYear: "2026",
    icon: CalendarIcon,
  },
  {
    activeTab: "UPCOMING",
    title: "Akan Datang",
    searchQuery: "",
    selectedMonth: "08",
    selectedYear: "2026",
    icon: ClockIcon,
  },
  {
    activeTab: "COMPLETED",
    title: "Selesai",
    searchQuery: "",
    selectedMonth: "08",
    selectedYear: "2026",
    icon: CheckLineIcon,
  },
  {
    activeTab: "PENDING",
    title: "Pending",
    searchQuery: "",
    selectedMonth: "08",
    selectedYear: "2026",
    icon: FileExclamationPointIcon,
  },
];

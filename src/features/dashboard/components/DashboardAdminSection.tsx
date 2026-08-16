import { getLiveStatus } from "@/features/landing/api/getLiveStatus";
import DashboardMetrics from "./admin/DashboardMetrics";
import TodayScheduleSection from "./admin/TodayScheduleSection";
import { Clock, Settings2Icon } from "lucide-react";
import Link from "next/link";
import CloseParkForm from "./admin/CloseParkForm";

export default async function DashboardAdminSection() {
  const { isOpen, operatingHours } = await getLiveStatus();

  return (
    <div className="space-y-5">
      {/* PARK STATUS CONTROL CARD */}
      <div className="border border-slate-200 bg-white p-5 px-6 text-left shadow-xs">
        <div className="mb-4 flex flex-col gap-2 border-b border-slate-100 pb-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">
              STATUS OPERASIONAL HARI INI
            </span>
            <Link
              href={"/jam-operasional"}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              <Settings2Icon className="size-4" />
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div
              className={`w-fit rounded-2xl px-4 py-1 text-xs font-semibold ${
                isOpen
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-rose-100 text-rose-800"
              }`}
            >
              {isOpen ? "Beroperasi" : "Ditutup"}
            </div>

            {/* DYNAMIC REGULAR OPERATING HOURS */}
            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
              <Clock className="size-3.5 text-slate-400" />
              <span>Jadwal Reguler: {operatingHours}</span>
            </div>
          </div>
        </div>

        {/* FORM CONTAINER */}
        <CloseParkForm isOpen={isOpen} />
      </div>

      {/* ISOLATED METRICS COMPONENT */}
      <DashboardMetrics />

      {/* TODAY'S SCHEDULE SECTION */}
      <TodayScheduleSection />
    </div>
  );
}

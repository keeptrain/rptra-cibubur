import { getLiveStatus } from "@/features/landing/api/getLiveStatus";
import CloseParkForm from "./CloseParkForm";
import { AxeIcon, LayoutDashboardIcon, Clock } from "lucide-react";
import Link from "next/link";

export default async function DashboardAdminSection() {
  const { isOpen, operatingHours } = await getLiveStatus();

  return (
    <div className="space-y-5 px-4 py-6 sm:px-6">
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3 border-b border-slate-200/80 pb-4 text-left">
        <div className="flex size-9 items-center justify-center rounded-xl bg-white shadow-xs">
          <LayoutDashboardIcon className="size-5 text-slate-700" />
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900">Dashboard</h2>
        </div>
      </div>

      {/* PARK STATUS CONTROL CARD */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 px-6 text-left shadow-xs">
        <div className="mb-4 flex flex-col gap-2 border-b border-slate-100 pb-4">
          <div className="flex justify-between">
            <span className="text-[11px] font-semibold text-slate-500">
              STATUS HARI INI
            </span>
            <Link
              href={"/settings"}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              Settings <AxeIcon className="size-3.5" />
            </Link>
          </div>

          <div className="flex flex-col items-center gap-3">
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
    </div>
  );
}

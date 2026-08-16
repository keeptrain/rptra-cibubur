import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/features/auth/lib/getUser";
import { getOperatingHours } from "./api/getOperatingHours";
import RegularHoursEditor from "./components/RegularHoursEditor";
import OverrideScheduleModal from "./components/OverrideScheduleModal";
import OperationLogsHistoryTable from "./components/OperationLogsHistoryTable";
import { ArrowLeft, Clock } from "lucide-react";

export default async function OperationalSettingPage() {
  const user = await getCurrentUser();
  const isAdmin = user?.app_metadata?.role === "admin";

  if (!isAdmin) {
    redirect("/dashboard");
  }

  const initialHours = await getOperatingHours();

  return (
    <main className="flex-1">
      <div className="mx-auto min-h-screen max-w-4xl space-y-5 px-4 py-6 sm:px-6">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-4 text-left">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="flex size-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-2xs transition-colors hover:bg-slate-50 hover:text-slate-900"
            >
              <ArrowLeft className="size-5" />
            </Link>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Manajemen Jam Operasional
              </h2>
              <p className="text-xs font-medium text-slate-500">
                Kelola jadwal reguler 7-hari, override penutupan, &amp; riwayat log.
              </p>
            </div>
          </div>

          <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
            <Clock className="size-5" />
          </div>
        </div>

        {/* SECTION 1: 7-DAY REGULAR HOURS EDITOR */}
        <RegularHoursEditor initialHours={initialHours} />

        {/* SECTION 2: OVERRIDE SCHEDULE MODAL */}
        <div className="flex justify-end">
          <OverrideScheduleModal />
        </div>

        {/* SECTION 3: OPERATION LOGS HISTORY TABLE */}
        <OperationLogsHistoryTable />
      </div>
    </main>
  );
}

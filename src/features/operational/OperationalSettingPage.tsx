import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/features/auth/lib/getUser";
import { getOperatingHours } from "./api/getOperatingHours";
import RegularHoursEditor from "./components/RegularHoursEditor";
import OperationLogsHistoryTable from "./components/OperationLogsHistoryTable";
import { ArrowLeft } from "lucide-react";

export default async function OperationalSettingPage() {
  const user = await getCurrentUser();
  const isAdmin = user?.app_metadata?.role === "admin";

  if (!isAdmin) {
    redirect("/dashboard");
  }

  const initialHours = await getOperatingHours();

  return (
    <main className="flex-1">
      <div className="mx-auto min-h-screen max-w-4xl">
        {/* HEADER */}
        <div className="p-4">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="flex size-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-2xs transition-colors hover:bg-slate-50 hover:text-slate-900"
            >
              <ArrowLeft className="size-5" />
            </Link>
            <div>
              <h2 className="text-base font-bold">Manajemen Jam Operasional</h2>
              <p className="text-xs font-medium text-slate-500">
                Kelola jadwal reguler 7-hari, override penutupan, &amp; riwayat
                log.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 1: 7-DAY REGULAR HOURS EDITOR */}
        <div className="space-y-6">
          <RegularHoursEditor initialHours={initialHours} />

          {/* SECTION 2: OPERATION LOGS HISTORY TABLE (WITH INLINE OVERRIDE FORM TOGGLE) */}
          <OperationLogsHistoryTable />
        </div>
      </div>
    </main>
  );
}

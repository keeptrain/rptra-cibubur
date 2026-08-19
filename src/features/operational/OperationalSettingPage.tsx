import { redirect } from "next/navigation";
import { getCurrentUser } from "@/features/auth/lib/getUser";
import { getOperatingHours } from "./api/getOperatingHours";
import RegularHoursEditor from "./components/RegularHoursEditor";
import OperationLogsHistoryTable from "./components/OperationLogsHistoryTable";
import PageHeader from "@/components/shared/PageHeader";

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
        <PageHeader
          backHref="/dashboard"
          title="Manajemen Jam Operasional"
          description="Kelola jadwal reguler 7-hari, override penutupan, & riwayat log."
        />

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

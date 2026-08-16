import Link from "next/link";
import { getCurrentUser } from "../auth/lib/getUser";
import DashboardAdminSection from "./components/DashboardAdminSection";
import DashboardUserSection from "./components/DashboardUserSection";
import { TreesIcon, UserCircle2Icon } from "lucide-react";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const isAdmin = user?.app_metadata?.role === "admin";

  return (
    <main className="flex-1">
      <div className="mx-auto min-h-screen max-w-4xl">
        {/* SECTION HEADER */}
        <header className="flex items-center justify-between gap-3 p-4 text-left">
          {/* Logo & Brand */}
          <Link href="/">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-500 shadow-sm transition-transform hover:scale-105">
              <TreesIcon className="size-6 text-white" />
            </div>
          </Link>
          <h2 className="text-base font-bold text-slate-900">Dashboard</h2>
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <UserCircle2Icon className="size-4" />
            <span>Akun</span>
          </div>
        </header>
        {isAdmin ? <DashboardAdminSection /> : <DashboardUserSection />}
      </div>
    </main>
  );
}

import Link from "next/link";
import { getCurrentUser } from "../auth/lib/getUser";
import DashboardAdminSection from "./components/DashboardAdminSection";
import DashboardUserSection from "./components/DashboardUserSection";
import { TreesIcon, User, ShieldCheck } from "lucide-react";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const isAdmin = user?.app_metadata?.role === "admin";

  return (
    <main className="flex-1">
      <div className="mx-auto min-h-screen max-w-4xl">
        {/* SECTION HEADER */}
        <header className="flex items-center gap-3 px-4 py-4 text-left sm:px-6">
          <Link href="/">
            <div className="flex size-10 items-center justify-center rounded-full bg-emerald-500 shadow-xs transition-transform hover:scale-105">
              <TreesIcon className="size-6 text-white" />
            </div>
          </Link>

          {/* Welcome — tanpa header, hanya greeting */}
          <div>
            <h2 className="text-base font-semibold sm:text-lg">
              Selamat datang kembali
            </h2>
            <p className="text-muted-foreground text-xs sm:text-sm">
              Kelola kunjungan dan agenda RPTRA Cibubur Anda di sini.
            </p>
          </div>
        </header>

        {isAdmin ? <DashboardAdminSection /> : <DashboardUserSection />}
      </div>
    </main>
  );
}

import { getCurrentUser } from "../auth/lib/getUser";
import DashboardAdminSection from "./components/DashboardAdminSection";
import DashboardUserSection from "./components/DashboardUserSection";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const isAdmin = user?.app_metadata?.role === "admin";

  return (
    <main className="flex-1">
      <div className="mx-auto min-h-screen max-w-4xl">
        {isAdmin ? <DashboardAdminSection /> : <DashboardUserSection />}
      </div>
    </main>
  );
}

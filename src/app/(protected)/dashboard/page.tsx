import { getCurrentUser } from "@/features/auth/lib/getUser";
import DashboardPage from "@/features/dashboard/DashboardPage";

export default async function DashboardRoute() {
  const user = await getCurrentUser();
  return <DashboardPage userEmail={user?.email || "Pengguna RPTRA"} />;
}

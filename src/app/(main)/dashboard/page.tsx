import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardPage from "@/features/dashboard/DashboardPage";

export default async function DashboardRoute() {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return <DashboardPage userEmail={user.email || "Pengguna RPTRA"} />;
}

import { redirect } from "next/navigation";
import { getCurrentUser } from "@/features/auth/lib/getUser";
import ProtectedBottomNav from "@/features/dashboard/components/ProtectedBottomNav";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 pb-24 md:pb-15">
      {children}
      <ProtectedBottomNav />
    </div>
  );
}

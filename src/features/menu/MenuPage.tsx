import Link from "next/link";
import { getCurrentUser } from "@/features/auth/lib/getUser";
import MenuSection from "./components/MenuSection";
import { TreesIcon } from "lucide-react";

export default async function MenuPage() {
  const user = await getCurrentUser();
  const isAdmin = user?.app_metadata?.role === "admin";
  const userEmail = user?.email || "Pengguna RPTRA";

  return (
    <main className="flex-1">
      <div className="mx-auto min-h-screen max-w-4xl">
        {/* SECTION HEADER */}
        <header className="flex items-center justify-between gap-3 p-4 text-left">
          <Link href="/">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-500 shadow-xs transition-transform hover:scale-105">
              <TreesIcon className="size-6 text-white" />
            </div>
          </Link>
        </header>

        <MenuSection isAdmin={isAdmin} userEmail={userEmail} />
      </div>
    </main>
  );
}

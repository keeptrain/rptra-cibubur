import Link from "next/link";
import { getCurrentUser } from "@/features/auth/lib/getUser";
import MenuSection from "./components/MenuSection";
import { TreesIcon } from "lucide-react";
import LogoutButton from "./components/LogoutButton";

export default async function MenuPage() {
  const user = await getCurrentUser();
  const isAdmin = user?.app_metadata?.role === "admin";
  const userEmail = user?.email || "Pengguna RPTRA";

  return (
    <main className="flex-1">
      <div className="mx-auto min-h-screen max-w-4xl">
        {/* SECTION HEADER */}
        <header className="flex items-center justify-between gap-4 px-4 py-4 text-left sm:px-6">
          <div className="flex items-center gap-4">
            <Link href="/">
              <div className="flex size-10 items-center justify-center rounded-full bg-emerald-500 shadow-xs transition-transform hover:scale-105">
                <TreesIcon className="size-6 text-white" />
              </div>
            </Link>
            <span className="font-medium">Menu</span>
          </div>
          <div>
            <LogoutButton />
          </div>
        </header>

        <MenuSection isAdmin={isAdmin} userEmail={userEmail} />
      </div>
    </main>
  );
}

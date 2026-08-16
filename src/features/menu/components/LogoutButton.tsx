"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { logoutAction } from "@/features/auth/actions/logoutAction";

export default function LogoutButton() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logoutAction();
    router.push("/login");
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="flex w-full items-center justify-center gap-2 border border-rose-200 bg-rose-50 p-4 text-xs font-bold text-rose-700 transition-colors hover:bg-rose-100 disabled:opacity-50"
    >
      <LogOut className="size-4" />
      {isLoggingOut ? "Proses Keluar..." : "Keluar Akun"}
    </button>
  );
}

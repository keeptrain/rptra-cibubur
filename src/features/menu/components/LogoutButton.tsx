"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { logoutAction } from "@/features/auth/actions/logoutAction";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export default function LogoutButton() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logoutAction();
    router.push("/login");
  };

  return (
    <Button
      disabled={isLoggingOut}
      onClick={handleLogout}
      size="sm"
      variant="destructive"
    >
      {isLoggingOut ? (
        <div className="flex items-center gap-2">
          <Spinner />
          Keluar...
        </div>
      ) : (
        "Logout"
      )}
    </Button>
  );
}

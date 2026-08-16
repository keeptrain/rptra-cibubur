"use server";

import { getCurrentUser } from "@/features/auth/lib/getUser";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { updateTag, revalidatePath } from "next/cache";

export async function updateParkStatusAction(
  status: "OPEN" | "CLOSED",
  reasonNotice: string,
) {
  try {
    const user = await getCurrentUser();

    if (!user || user.app_metadata?.role !== "admin") {
      return {
        success: false,
        error: "Akses ditolak. Hanya administrator yang dapat mengubah status taman.",
      };
    }

    const timeZone = "Asia/Jakarta";
    const nowWib = new Date(new Date().toLocaleString("en-US", { timeZone }));
    const todayStr = nowWib.toISOString().split("T")[0];

    const cookieStore = await cookies();
    const supabase = await createClient(cookieStore);

    // Insert log record into park_operation_logs via Server Client with RLS
    const { error: insertError } = await supabase
      .from("park_operation_logs")
      .insert({
        override_date: todayStr,
        status: status,
        reason_notice: reasonNotice.trim() || "Taman ditutup sementara.",
      });

    if (insertError) {
      return {
        success: false,
        error: `Gagal menyimpan log operasional: ${insertError.message}`,
      };
    }

    // Purge/update live status cache tag & revalidate landing page instantly
    updateTag("live-status");
    revalidatePath("/");
    revalidatePath("/dashboard");

    return { success: true };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Terjadi kesalahan sistem.",
    };
  }
}

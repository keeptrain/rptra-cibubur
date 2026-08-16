"use server";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { updateTag } from "next/cache";

export interface CreateOverrideInput {
  overrideDate: string; // YYYY-MM-DD
  status: "CLOSED" | "MODIFIED" | "OPEN";
  customOpenTime?: string | null;
  customCloseTime?: string | null;
  reasonNotice?: string | null;
}

export async function createOverrideLogAction(input: CreateOverrideInput) {
  try {
    const cookieStore = await cookies();
    const supabase = await createClient(cookieStore);

    // Verify authenticated user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return { success: false, message: "Sesi telah berakhir. Silakan login kembali." };
    }

    // Verify admin role
    const userRole = user.app_metadata?.role;
    if (userRole !== "admin") {
      return { success: false, message: "Akses ditolak. Memerlukan peran Administrator." };
    }

    // Validate input rules
    if (!input.overrideDate) {
      return { success: false, message: "Tanggal override wajib diisi." };
    }

    if (input.status === "CLOSED" && (!input.reasonNotice || !input.reasonNotice.trim())) {
      return { success: false, message: "Alasan penutupan wajib diisi untuk status CLOSED." };
    }

    if (input.status === "MODIFIED" && (!input.customOpenTime || !input.customCloseTime)) {
      return { success: false, message: "Jam buka & jam tutup khusus wajib diisi untuk status MODIFIED." };
    }

    const { error: insertError } = await supabase
      .from("park_operation_logs")
      .insert({
        override_date: input.overrideDate,
        status: input.status,
        custom_open_time: input.status === "MODIFIED" ? input.customOpenTime : null,
        custom_close_time: input.status === "MODIFIED" ? input.customCloseTime : null,
        reason_notice: input.reasonNotice?.trim() || null,
        admin_id: user.id,
      });

    if (insertError) {
      return { success: false, message: `Gagal menyimpan: ${insertError.message}` };
    }

    // Purge cached live status
    try {
      updateTag("live-status");
    } catch {}

    return { success: true, message: "Override jadwal operasional berhasil disimpan!" };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Terjadi kesalahan sistem.";
    return { success: false, message: msg };
  }
}

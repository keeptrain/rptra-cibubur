"use server";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { updateTag } from "next/cache";
import {
  CreateOverrideInput,
  validateOverrideInput,
} from "../utils/validateOverrideInput";
export type { CreateOverrideInput };

export async function createOverrideLogAction(input: CreateOverrideInput) {
  // Vercel Best Practice: async-cheap-condition-before-await
  // Evaluate cheap synchronous validation before performing async cookies() or DB operations
  const validation = validateOverrideInput(input);
  if (!validation.isValid) {
    return { success: false, message: validation.message! };
  }

  try {
    const cookieStore = await cookies();
    const supabase = await createClient(cookieStore);

    // Verify authenticated user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return {
        success: false,
        message: "Sesi telah berakhir. Silakan login kembali.",
      };
    }

    // Verify admin role
    const userRole = user.app_metadata?.role;
    if (userRole !== "admin") {
      return {
        success: false,
        message: "Akses ditolak. Memerlukan peran Administrator.",
      };
    }

    const { error: insertError } = await supabase
      .from("park_operation_logs")
      .insert({
        override_date: input.overrideDate,
        status: input.status,
        custom_open_time:
          input.status === "MODIFIED" ? input.customOpenTime : null,
        custom_close_time:
          input.status === "MODIFIED" ? input.customCloseTime : null,
        reason_notice: input.reasonNotice?.trim() || null,
        admin_id: user.id,
      });

    if (insertError) {
      return {
        success: false,
        message: `Gagal menyimpan: ${insertError.message}`,
      };
    }

    // Purge cached live status
    try {
      updateTag("live-status");
    } catch {}

    return {
      success: true,
      message: "Override jadwal operasional berhasil disimpan!",
    };
  } catch (err: unknown) {
    const msg =
      err instanceof Error ? err.message : "Terjadi kesalahan sistem.";
    return { success: false, message: msg };
  }
}

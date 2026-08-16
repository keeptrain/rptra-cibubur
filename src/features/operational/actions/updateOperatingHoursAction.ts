"use server";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { updateTag } from "next/cache";

interface UpdateOperatingHourInput {
  dayOfWeek: number;
  openTime: string;
  closeTime: string;
  isOpen: boolean;
}

export async function updateOperatingHoursAction(
  input: UpdateOperatingHourInput,
) {
  // Vercel Best Practice: async-cheap-condition-before-await
  // Evaluate cheap synchronous validation before performing async cookies() or DB operations
  if (
    input.dayOfWeek < 0 ||
    input.dayOfWeek > 6 ||
    !input.openTime ||
    !input.closeTime
  ) {
    return {
      success: false,
      message: "Data input jadwal operasional tidak valid.",
    };
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

    const { error: updateError } = await supabase
      .from("park_operating_hours")
      .update({
        open_time: input.openTime,
        close_time: input.closeTime,
        is_open: input.isOpen,
        updated_at: new Date().toISOString(),
      })
      .eq("day_of_week", input.dayOfWeek);

    if (updateError) {
      return {
        success: false,
        message: `Gagal memperbarui: ${updateError.message}`,
      };
    }

    // Purge cached live status
    try {
      updateTag("live-status");
    } catch {}

    return { success: true, message: "Jadwal reguler berhasil diperbarui!" };
  } catch (err: unknown) {
    const msg =
      err instanceof Error ? err.message : "Terjadi kesalahan sistem.";
    return { success: false, message: msg };
  }
}

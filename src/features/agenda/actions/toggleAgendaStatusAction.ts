"use server";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";
import { ActionResult } from "./createAgendaAction";

export async function toggleAgendaStatusAction(
  id: string,
  targetStatus: "UPCOMING" | "COMPLETED"
): Promise<ActionResult> {
  if (!id || typeof id !== "string") {
    return {
      success: false,
      errors: ["ID agenda tidak valid."],
    };
  }

  if (targetStatus !== "UPCOMING" && targetStatus !== "COMPLETED") {
    return {
      success: false,
      errors: ["Status target harus UPCOMING atau COMPLETED."],
    };
  }

  try {
    const cookieStore = await cookies();
    const supabase = await createClient(cookieStore);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return {
        success: false,
        errors: ["Sesi otentikasi telah berakhir. Silakan login kembali."],
      };
    }

    if (user.app_metadata?.role !== "admin") {
      return {
        success: false,
        errors: ["Akses ditolak. Anda tidak memiliki wewenang administrator."],
      };
    }

    const { error: updateError } = await supabase
      .from("park_agendas")
      .update({
        status: targetStatus,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (updateError) {
      return {
        success: false,
        errors: [`Gagal memperbarui status agenda: ${updateError.message}`],
      };
    }

    revalidateTag("park-agendas", "default");
    revalidatePath("/manajemen-agenda");
    revalidatePath(`/manajemen-agenda/${id}`);

    return {
      success: true,
      message: `Status agenda berhasil diubah menjadi ${
        targetStatus === "COMPLETED" ? "Terlaksana" : "Akan Datang"
      }!`,
    };
  } catch (err) {
    return {
      success: false,
      errors: [
        `Terjadi kesalahan sistem: ${
          err instanceof Error ? err.message : "Gagal memproses aksi server"
        }`,
      ],
    };
  }
}

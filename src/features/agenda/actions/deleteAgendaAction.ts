"use server";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";
import { ActionResult } from "./createAgendaAction";

export async function deleteAgendaAction(id: string): Promise<ActionResult> {
  if (!id || typeof id !== "string") {
    return {
      success: false,
      errors: ["ID agenda tidak valid."],
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

    // Soft delete: Update deleted_at timestamp instead of hard DELETE
    const { error: deleteError } = await supabase
      .from("park_agendas")
      .update({
        deleted_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (deleteError) {
      return {
        success: false,
        errors: [`Gagal menghapus agenda: ${deleteError.message}`],
      };
    }

    revalidateTag("park-agendas", "default");
    revalidatePath("/manajemen-agenda");

    return {
      success: true,
      message: "Agenda kegiatan berhasil dihapus!",
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

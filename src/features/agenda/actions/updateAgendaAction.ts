"use server";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";
import { validateAgendaUpdateInput } from "../schemas/agendaSchema";
import { ActionResult } from "./createAgendaAction";

export async function updateAgendaAction(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const rawInput = {
    id: (formData.get("id") as string) || "",
    title: (formData.get("title") as string) || "",
    eventDate: (formData.get("eventDate") as string) || "",
    startTime: (formData.get("startTime") as string) || "",
    endTime: (formData.get("endTime") as string) || "",
    location: (formData.get("location") as string) || "",
    organizer: (formData.get("organizer") as string) || "",
    targetAudience: (formData.get("targetAudience") as string) || undefined,
    contactPerson: (formData.get("contactPerson") as string) || undefined,
    bannerUrl: (formData.get("bannerUrl") as string) || undefined,
    description: (formData.get("description") as string) || undefined,
  };

  const validation = validateAgendaUpdateInput(rawInput);
  if (!validation.success) {
    return {
      success: false,
      errors: validation.errors,
    };
  }

  const validData = validation.data;

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
        title: validData.title,
        event_date: validData.eventDate,
        start_time: `${validData.startTime}:00`,
        end_time: `${validData.endTime}:00`,
        location: validData.location,
        organizer: validData.organizer,
        target_audience: validData.targetAudience || null,
        contact_person: validData.contactPerson || null,
        banner_url: validData.bannerUrl || null,
        description: validData.description || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", validData.id);

    if (updateError) {
      return {
        success: false,
        errors: [`Gagal memperbarui agenda: ${updateError.message}`],
      };
    }

    revalidateTag("park-agendas", "default");
    revalidatePath("/manajemen-agenda");
    revalidatePath(`/manajemen-agenda/${validData.id}`);

    return {
      success: true,
      message: "Agenda kegiatan berhasil diperbarui!",
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

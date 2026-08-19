"use server";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";
import { uuidv7 } from "uuidv7";
import { validateAgendaInput } from "../schemas/agendaSchema";

export interface ActionResult {
  success: boolean;
  message?: string;
  errors?: string[];
  data?: Record<string, unknown>;
}

export async function createAgendaAction(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  // 1. Vercel Best Practice: Cheap synchronous validation BEFORE any async calls
  const rawInput = {
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

  const validation = validateAgendaInput(rawInput);
  if (!validation.success) {
    return {
      success: false,
      errors: validation.errors,
    };
  }

  const validData = validation.data;

  // 2. Authenticate admin user via app_metadata
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

    // Verify admin role via app_metadata
    if (user.app_metadata?.role !== "admin") {
      return {
        success: false,
        errors: ["Akses ditolak. Anda tidak memiliki wewenang administrator."],
      };
    }

    // 3. Generate UUIDv7 for time-ordered primary key
    const newId = uuidv7();

    // 4. Insert into park_agendas table
    const { error: insertError } = await supabase.from("park_agendas").insert({
      id: newId,
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
      status: validData.status || "UPCOMING",
      created_by: user.id,
    });

    if (insertError) {
      return {
        success: false,
        errors: [`Gagal menyimpan agenda ke database: ${insertError.message}`],
      };
    }

    // 5. Invalidate cache tags & paths
    revalidateTag("park-agendas", "default");
    revalidatePath("/manajemen-agenda");

    return {
      success: true,
      message: "Agenda kegiatan baru berhasil disimpan!",
      data: { id: newId },
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

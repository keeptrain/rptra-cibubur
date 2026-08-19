import * as v from "valibot";

// Time format regex (HH:mm in 24h format)
const TIME_REGEX = /^([01]\d|2[0-3]):[0-5]\d$/;
// Date format regex (YYYY-MM-DD)
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Valibot Schema for Agenda Creation & Input Payload
 */
export const AgendaInputSchema = v.object({
  title: v.pipe(
    v.string("Judul kegiatan wajib berupa teks."),
    v.trim(),
    v.minLength(5, "Judul kegiatan minimal 5 karakter."),
    v.maxLength(150, "Judul kegiatan maksimal 150 karakter.")
  ),
  eventDate: v.pipe(
    v.string("Tanggal kegiatan wajib diisi."),
    v.trim(),
    v.regex(DATE_REGEX, "Format tanggal tidak valid (harus YYYY-MM-DD).")
  ),
  startTime: v.pipe(
    v.string("Jam mulai wajib diisi."),
    v.trim(),
    v.regex(TIME_REGEX, "Format jam mulai tidak valid (contoh: 08:00).")
  ),
  endTime: v.pipe(
    v.string("Jam selesai wajib diisi."),
    v.trim(),
    v.regex(TIME_REGEX, "Format jam selesai tidak valid (contoh: 11:00).")
  ),
  location: v.pipe(
    v.string("Lokasi kegiatan wajib berupa teks."),
    v.trim(),
    v.minLength(3, "Lokasi kegiatan minimal 3 karakter.")
  ),
  organizer: v.pipe(
    v.string("Penyelenggara kegiatan wajib berupa teks."),
    v.trim(),
    v.minLength(3, "Penyelenggara kegiatan minimal 3 karakter.")
  ),
  targetAudience: v.optional(v.string()),
  contactPerson: v.optional(v.string()),
  bannerUrl: v.optional(v.string()),
  description: v.optional(v.string()),
  status: v.optional(
    v.picklist(["UPCOMING", "COMPLETED"], "Status harus UPCOMING atau COMPLETED.")
  ),
});

export type AgendaInput = v.InferOutput<typeof AgendaInputSchema>;

/**
 * Valibot Schema for Agenda Update Payload (requires valid UUID id)
 */
export const AgendaUpdateSchema = v.object({
  id: v.pipe(
    v.string("ID agenda wajib diisi."),
    v.trim(),
    v.uuid("Format ID agenda tidak valid.")
  ),
  title: v.pipe(
    v.string("Judul kegiatan wajib berupa teks."),
    v.trim(),
    v.minLength(5, "Judul kegiatan minimal 5 karakter."),
    v.maxLength(150, "Judul kegiatan maksimal 150 karakter.")
  ),
  eventDate: v.pipe(
    v.string("Tanggal kegiatan wajib diisi."),
    v.trim(),
    v.regex(DATE_REGEX, "Format tanggal tidak valid (harus YYYY-MM-DD).")
  ),
  startTime: v.pipe(
    v.string("Jam mulai wajib diisi."),
    v.trim(),
    v.regex(TIME_REGEX, "Format jam mulai tidak valid (contoh: 08:00).")
  ),
  endTime: v.pipe(
    v.string("Jam selesai wajib diisi."),
    v.trim(),
    v.regex(TIME_REGEX, "Format jam selesai tidak valid (contoh: 11:00).")
  ),
  location: v.pipe(
    v.string("Lokasi kegiatan wajib berupa teks."),
    v.trim(),
    v.minLength(3, "Lokasi kegiatan minimal 3 karakter.")
  ),
  organizer: v.pipe(
    v.string("Penyelenggara kegiatan wajib berupa teks."),
    v.trim(),
    v.minLength(3, "Penyelenggara kegiatan minimal 3 karakter.")
  ),
  targetAudience: v.optional(v.string()),
  contactPerson: v.optional(v.string()),
  bannerUrl: v.optional(v.string()),
  description: v.optional(v.string()),
  status: v.optional(
    v.picklist(["UPCOMING", "COMPLETED"], "Status harus UPCOMING atau COMPLETED.")
  ),
});

export type AgendaUpdateInput = v.InferOutput<typeof AgendaUpdateSchema>;

export type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; errors: string[] };

/**
 * Pure synchronous validation helper for Agenda Creation
 */
export function validateAgendaInput(input: unknown): ValidationResult<AgendaInput> {
  const result = v.safeParse(AgendaInputSchema, input);

  if (!result.success) {
    const errorMessages = result.issues.map((issue) => issue.message);
    return { success: false, errors: errorMessages };
  }

  // Validate time order (endTime must be strictly after startTime)
  const [sH, sM] = result.output.startTime.split(":").map(Number);
  const [eH, eM] = result.output.endTime.split(":").map(Number);
  const startMinutes = sH * 60 + sM;
  const endMinutes = eH * 60 + eM;

  if (endMinutes <= startMinutes) {
    return {
      success: false,
      errors: ["Jam selesai kegiatan harus lebih akhir dari jam mulai."],
    };
  }

  return { success: true, data: result.output };
}

/**
 * Pure synchronous validation helper for Agenda Update
 */
export function validateAgendaUpdateInput(
  input: unknown
): ValidationResult<AgendaUpdateInput> {
  const result = v.safeParse(AgendaUpdateSchema, input);

  if (!result.success) {
    const errorMessages = result.issues.map((issue) => issue.message);
    return { success: false, errors: errorMessages };
  }

  // Validate time order (endTime must be strictly after startTime)
  const [sH, sM] = result.output.startTime.split(":").map(Number);
  const [eH, eM] = result.output.endTime.split(":").map(Number);
  const startMinutes = sH * 60 + sM;
  const endMinutes = eH * 60 + eM;

  if (endMinutes <= startMinutes) {
    return {
      success: false,
      errors: ["Jam selesai kegiatan harus lebih akhir dari jam mulai."],
    };
  }

  return { success: true, data: result.output };
}

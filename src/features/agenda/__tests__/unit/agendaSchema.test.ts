import { describe, it, expect } from "vitest";
import {
  validateAgendaInput,
  validateAgendaUpdateInput,
} from "../../schemas/agendaSchema";

describe("Agenda Schema Validation Tests (Valibot)", () => {
  describe("Bad Path Scenarios", () => {
    it("should reject input when title is shorter than 5 characters", () => {
      const result = validateAgendaInput({
        title: "Lari",
        eventDate: "2026-08-20",
        startTime: "08:00",
        endTime: "10:00",
        location: "Aula RPTRA",
        organizer: "PKK",
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors).toContain("Judul kegiatan minimal 5 karakter.");
      }
    });

    it("should reject invalid eventDate format", () => {
      const result = validateAgendaInput({
        title: "Senam Sehat Lansia",
        eventDate: "20-08-2026", // Invalid format (should be YYYY-MM-DD)
        startTime: "08:00",
        endTime: "10:00",
        location: "Aula RPTRA",
        organizer: "PKK",
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors).toContain(
          "Format tanggal tidak valid (harus YYYY-MM-DD)."
        );
      }
    });

    it("should reject invalid time format for startTime and endTime", () => {
      const result = validateAgendaInput({
        title: "Senam Sehat Lansia",
        eventDate: "2026-08-20",
        startTime: "8:00 AM", // Invalid format
        endTime: "10:00",
        location: "Aula RPTRA",
        organizer: "PKK",
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors).toContain(
          "Format jam mulai tidak valid (contoh: 08:00)."
        );
      }
    });

    it("should reject when endTime is earlier than or equal to startTime", () => {
      const result = validateAgendaInput({
        title: "Senam Sehat Lansia",
        eventDate: "2026-08-20",
        startTime: "10:00",
        endTime: "08:00", // Reversed time range
        location: "Aula RPTRA",
        organizer: "PKK",
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors).toContain(
          "Jam selesai kegiatan harus lebih akhir dari jam mulai."
        );
      }
    });

    it("should reject update when agenda ID is not a valid UUID", () => {
      const result = validateAgendaUpdateInput({
        id: "invalid-uuid-123",
        title: "Senam Sehat Lansia",
        eventDate: "2026-08-20",
        startTime: "08:00",
        endTime: "10:00",
        location: "Aula RPTRA",
        organizer: "PKK",
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors).toContain("Format ID agenda tidak valid.");
      }
    });
  });

  describe("Good Path Scenarios", () => {
    it("should successfully validate complete and correct agenda creation payload", () => {
      const payload = {
        title: "Senam Sehat Lansia & Posyandu",
        eventDate: "2026-08-20",
        startTime: "06:30",
        endTime: "09:00",
        location: "Lapangan Serbaguna RPTRA",
        organizer: "Puskesmas Cibubur",
        description: "Pemeriksaan gratis untuk warga.",
      };

      const result = validateAgendaInput(payload);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.title).toBe(payload.title);
        expect(result.data.eventDate).toBe(payload.eventDate);
        expect(result.data.startTime).toBe("06:30");
        expect(result.data.endTime).toBe("09:00");
      }
    });

    it("should successfully validate update payload with a valid UUIDv7", () => {
      const payload = {
        id: "019163e0-0000-7000-8000-000000000000",
        title: "Pelatihan Kerajinan Daur Ulang",
        eventDate: "2026-08-25",
        startTime: "09:00",
        endTime: "11:30",
        location: "Aula Utama",
        organizer: "Karang Taruna",
      };

      const result = validateAgendaUpdateInput(payload);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.id).toBe(payload.id);
        expect(result.data.title).toBe(payload.title);
      }
    });
  });
});

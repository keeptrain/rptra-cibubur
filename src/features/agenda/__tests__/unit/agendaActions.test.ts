import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock next/headers, next/cache, @/lib/supabase/server
vi.mock("next/headers", () => ({
  cookies: vi.fn().mockResolvedValue({}),
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
  revalidateTag: vi.fn(),
}));

const mockInsert = vi.fn();
const mockUpdate = vi.fn();
const mockGetUser = vi.fn();

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn().mockImplementation(() => ({
    auth: {
      getUser: mockGetUser,
    },
    from: vi.fn().mockImplementation(() => ({
      insert: mockInsert,
      update: mockUpdate.mockReturnValue({
        eq: vi.fn().mockResolvedValue({ error: null }),
      }),
    })),
  })),
}));

import { createAgendaAction } from "../../actions/createAgendaAction";
import { deleteAgendaAction } from "../../actions/deleteAgendaAction";

describe("Agenda Server Actions Unit Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Bad Path Scenarios", () => {
    it("should return validation error immediately without network call if inputs are invalid", async () => {
      const formData = new FormData();
      formData.set("title", "Lari"); // Too short
      formData.set("eventDate", "2026-08-20");

      const result = await createAgendaAction(null, formData);

      expect(result.success).toBe(false);
      expect(result.errors).toContain("Judul kegiatan minimal 5 karakter.");
      // Verify zero network/database overhead
      expect(mockGetUser).not.toHaveBeenCalled();
    });

    it("should reject action if user session is expired or invalid", async () => {
      mockGetUser.mockResolvedValueOnce({
        data: { user: null },
        error: new Error("Session expired"),
      });

      const formData = new FormData();
      formData.set("title", "Senam Sehat Lansia");
      formData.set("eventDate", "2026-08-20");
      formData.set("startTime", "08:00");
      formData.set("endTime", "10:00");
      formData.set("location", "Aula Utama RPTRA");
      formData.set("organizer", "Pengelola RPTRA");

      const result = await createAgendaAction(null, formData);

      expect(result.success).toBe(false);
      expect(result.errors).toContain(
        "Sesi otentikasi telah berakhir. Silakan login kembali."
      );
    });

    it("should reject action if non-admin user attempts mutation via app_metadata check", async () => {
      mockGetUser.mockResolvedValueOnce({
        data: {
          user: {
            id: "user-warga-123",
            app_metadata: { role: "warga" },
          },
        },
        error: null,
      });

      const formData = new FormData();
      formData.set("title", "Senam Sehat Lansia");
      formData.set("eventDate", "2026-08-20");
      formData.set("startTime", "08:00");
      formData.set("endTime", "10:00");
      formData.set("location", "Aula Utama RPTRA");
      formData.set("organizer", "Pengelola RPTRA");

      const result = await createAgendaAction(null, formData);

      expect(result.success).toBe(false);
      expect(result.errors).toContain(
        "Akses ditolak. Anda tidak memiliki wewenang administrator."
      );
    });

    it("should reject delete action if ID is invalid", async () => {
      const result = await deleteAgendaAction("");

      expect(result.success).toBe(false);
      expect(result.errors).toContain("ID agenda tidak valid.");
    });
  });

  describe("Good Path Scenarios", () => {
    it("should successfully create agenda for authenticated admin via app_metadata check", async () => {
      mockGetUser.mockResolvedValueOnce({
        data: {
          user: {
            id: "admin-uuid-123",
            app_metadata: { role: "admin" },
          },
        },
        error: null,
      });

      mockInsert.mockResolvedValueOnce({
        data: null,
        error: null,
      });

      const formData = new FormData();
      formData.set("title", "Senam Sehat Lansia & Posyandu");
      formData.set("eventDate", "2026-08-20");
      formData.set("startTime", "08:00");
      formData.set("endTime", "10:00");
      formData.set("location", "Aula Utama RPTRA");
      formData.set("organizer", "Pengelola RPTRA");

      const result = await createAgendaAction(null, formData);

      expect(result.success).toBe(true);
      expect(result.message).toBe("Agenda kegiatan baru berhasil disimpan!");
      expect(result.data?.id).toBeDefined();
    });
  });
});

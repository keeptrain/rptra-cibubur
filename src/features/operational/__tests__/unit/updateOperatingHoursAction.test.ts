import { describe, it, expect, vi, beforeEach } from "vitest";
import { updateOperatingHoursAction } from "../../actions/updateOperatingHoursAction";

// Mock next/headers
vi.mock("next/headers", () => ({
  cookies: vi.fn().mockResolvedValue({}),
}));

// Mock next/cache updateTag
vi.mock("next/cache", () => ({
  updateTag: vi.fn(),
}));

// Mocks for Supabase Client
const mockGetUser = vi.fn();
const mockUpdate = vi.fn();

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn().mockResolvedValue({
    auth: {
      getUser: () => mockGetUser(),
    },
    from: () => ({
      update: (...args: unknown[]) => ({
        eq: (...eqArgs: unknown[]) => mockUpdate(...args, ...eqArgs),
      }),
    }),
  }),
}));

describe("updateOperatingHoursAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const sampleInput = {
    dayOfWeek: 0,
    openTime: "06:00:00",
    closeTime: "18:00:00",
    isOpen: true,
  };

  /* BAD PATH TEST CASES */
  describe("Bad Path", () => {
    it("should reject early when input dayOfWeek or time parameters are invalid without calling cookies", async () => {
      const resInvalidDay = await updateOperatingHoursAction({
        ...sampleInput,
        dayOfWeek: 99,
      });
      expect(resInvalidDay.success).toBe(false);
      expect(resInvalidDay.message).toBe("Data input jadwal operasional tidak valid.");

      const resEmptyTime = await updateOperatingHoursAction({
        ...sampleInput,
        openTime: "",
      });
      expect(resEmptyTime.success).toBe(false);
      expect(resEmptyTime.message).toBe("Data input jadwal operasional tidak valid.");
    });

    it("should reject when user session is expired or null", async () => {
      mockGetUser.mockResolvedValueOnce({
        data: { user: null },
        error: { message: "No active session" },
      });

      const res = await updateOperatingHoursAction(sampleInput);
      expect(res.success).toBe(false);
      expect(res.message).toBe("Sesi telah berakhir. Silakan login kembali.");
    });

    it("should reject when user role is not admin", async () => {
      mockGetUser.mockResolvedValueOnce({
        data: {
          user: { id: "usr-01", app_metadata: { role: "warga" } },
        },
        error: null,
      });

      const res = await updateOperatingHoursAction(sampleInput);
      expect(res.success).toBe(false);
      expect(res.message).toBe("Akses ditolak. Memerlukan peran Administrator.");
    });

    it("should return error message when database update query fails", async () => {
      mockGetUser.mockResolvedValueOnce({
        data: {
          user: { id: "usr-admin", app_metadata: { role: "admin" } },
        },
        error: null,
      });
      mockUpdate.mockResolvedValueOnce({
        error: { message: "Permission denied for table park_operating_hours" },
      });

      const res = await updateOperatingHoursAction(sampleInput);
      expect(res.success).toBe(false);
      expect(res.message).toContain(
        "Gagal memperbarui: Permission denied for table park_operating_hours",
      );
    });
  });

  /* GOOD PATH TEST CASES */
  describe("Good Path", () => {
    it("should successfully update regular operating hour row when user is admin", async () => {
      mockGetUser.mockResolvedValueOnce({
        data: {
          user: { id: "usr-admin", app_metadata: { role: "admin" } },
        },
        error: null,
      });
      mockUpdate.mockResolvedValueOnce({ error: null });

      const res = await updateOperatingHoursAction(sampleInput);

      expect(res.success).toBe(true);
      expect(res.message).toBe("Jadwal reguler berhasil diperbarui!");
    });
  });
});

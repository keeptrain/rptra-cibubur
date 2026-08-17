import { describe, it, expect, vi, beforeEach } from "vitest";
import { createOverrideLogAction } from "../../actions/createOverrideLogAction";
import { validateOverrideInput } from "../../utils/validateOverrideInput";

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
const mockInsert = vi.fn();

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn().mockResolvedValue({
    auth: {
      getUser: () => mockGetUser(),
    },
    from: () => ({
      insert: (...args: unknown[]) => mockInsert(...args),
    }),
  }),
}));

describe("validateOverrideInput", () => {
  it("should reject when overrideDate is empty", () => {
    const res = validateOverrideInput({
      overrideDate: "",
      status: "CLOSED",
      reasonNotice: "Maintenance",
    });
    expect(res.isValid).toBe(false);
    expect(res.message).toBe("Tanggal override wajib diisi.");
  });

  it("should reject CLOSED status when reasonNotice is missing or empty spaces", () => {
    const res = validateOverrideInput({
      overrideDate: "2026-08-20",
      status: "CLOSED",
      reasonNotice: "   ",
    });
    expect(res.isValid).toBe(false);
    expect(res.message).toBe(
      "Alasan penutupan wajib diisi untuk status CLOSED.",
    );
  });

  it("should reject MODIFIED status when custom times are missing", () => {
    const res = validateOverrideInput({
      overrideDate: "2026-08-20",
      status: "MODIFIED",
      customOpenTime: null,
      customCloseTime: "12:00:00",
    });
    expect(res.isValid).toBe(false);
    expect(res.message).toBe(
      "Jam buka & jam tutup khusus wajib diisi untuk status MODIFIED.",
    );
  });

  it("should pass validation for valid input", () => {
    const res = validateOverrideInput({
      overrideDate: "2026-08-20",
      status: "CLOSED",
      reasonNotice: "Public event in park",
    });
    expect(res.isValid).toBe(true);
  });
});

describe("createOverrideLogAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /* BAD PATH TEST CASES */
  describe("Bad Path", () => {
    it("should reject when user is unauthenticated", async () => {
      mockGetUser.mockResolvedValueOnce({
        data: { user: null },
        error: { message: "No session" },
      });

      const res = await createOverrideLogAction({
        overrideDate: "2026-08-20",
        status: "CLOSED",
        reasonNotice: "Repair",
      });

      expect(res.success).toBe(false);
      expect(res.message).toBe("Sesi telah berakhir. Silakan login kembali.");
    });

    it("should reject when user role is not admin", async () => {
      mockGetUser.mockResolvedValueOnce({
        data: {
          user: { id: "usr-warga", app_metadata: { role: "warga" } },
        },
        error: null,
      });

      const res = await createOverrideLogAction({
        overrideDate: "2026-08-20",
        status: "CLOSED",
        reasonNotice: "Repair",
      });

      expect(res.success).toBe(false);
      expect(res.message).toBe(
        "Akses ditolak. Memerlukan peran Administrator.",
      );
    });

    it("should return database error message when insert query fails", async () => {
      mockGetUser.mockResolvedValueOnce({
        data: {
          user: { id: "usr-admin", app_metadata: { role: "admin" } },
        },
        error: null,
      });
      mockInsert.mockResolvedValueOnce({
        error: { message: "Foreign key violation" },
      });

      const res = await createOverrideLogAction({
        overrideDate: "2026-08-20",
        status: "CLOSED",
        reasonNotice: "Repair",
      });

      expect(res.success).toBe(false);
      expect(res.message).toContain("Gagal menyimpan: Foreign key violation");
    });
  });

  /* GOOD PATH TEST CASES */
  describe("Good Path", () => {
    it("should successfully create CLOSED override log", async () => {
      mockGetUser.mockResolvedValueOnce({
        data: {
          user: { id: "usr-admin", app_metadata: { role: "admin" } },
        },
        error: null,
      });
      mockInsert.mockResolvedValueOnce({ error: null });

      const res = await createOverrideLogAction({
        overrideDate: "2026-08-20",
        status: "CLOSED",
        reasonNotice: "Perbaikan fasilitas playground",
      });

      expect(res.success).toBe(true);
      expect(res.message).toBe(
        "Override jadwal operasional berhasil disimpan!",
      );
      expect(mockInsert).toHaveBeenCalledWith({
        override_date: "2026-08-20",
        status: "CLOSED",
        custom_open_time: null,
        custom_close_time: null,
        reason_notice: "Perbaikan fasilitas playground",
        admin_id: "usr-admin",
      });
    });

    it("should successfully create MODIFIED override log with custom hours", async () => {
      mockGetUser.mockResolvedValueOnce({
        data: {
          user: { id: "usr-admin", app_metadata: { role: "admin" } },
        },
        error: null,
      });
      mockInsert.mockResolvedValueOnce({ error: null });

      const res = await createOverrideLogAction({
        overrideDate: "2026-08-20",
        status: "MODIFIED",
        customOpenTime: "08:00:00",
        customCloseTime: "12:00:00",
      });

      expect(res.success).toBe(true);
      expect(mockInsert).toHaveBeenCalledWith({
        override_date: "2026-08-20",
        status: "MODIFIED",
        custom_open_time: "08:00:00",
        custom_close_time: "12:00:00",
        reason_notice: null,
        admin_id: "usr-admin",
      });
    });

    it("should successfully create OPEN override log", async () => {
      mockGetUser.mockResolvedValueOnce({
        data: {
          user: { id: "usr-admin", app_metadata: { role: "admin" } },
        },
        error: null,
      });
      mockInsert.mockResolvedValueOnce({ error: null });

      const res = await createOverrideLogAction({
        overrideDate: "2026-08-20",
        status: "OPEN",
      });

      expect(res.success).toBe(true);
    });
  });
});

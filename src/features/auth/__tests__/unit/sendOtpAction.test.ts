import { describe, it, expect, vi, beforeEach } from "vitest";
import { sendOtpAction } from "../../actions/login/sendOtpAction";

// Mock next/headers
vi.mock("next/headers", () => ({
  cookies: vi.fn().mockResolvedValue({}),
}));

// Mock @/lib/supabase/server
const mockRpc = vi.fn();
vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn().mockResolvedValue({
    rpc: (...args: unknown[]) => mockRpc(...args),
  }),
}));

describe("sendOtpAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /* BAD PATH TEST CASES */
  describe("Bad Path", () => {
    it("should reject an empty email string", async () => {
      const res = await sendOtpAction("");
      expect(res.success).toBe(false);
      expect(res.error).toBe("Saat ini hanya menerima email berdomain @gmail.com");
    });

    it("should reject non-gmail domain emails", async () => {
      const res = await sendOtpAction("user@yahoo.com");
      expect(res.success).toBe(false);
      expect(res.error).toBe("Saat ini hanya menerima email berdomain @gmail.com");
    });

    it("should return error message when request_otp_code RPC fails with rpcError", async () => {
      mockRpc.mockResolvedValueOnce({
        data: null,
        error: { message: "Database connection error" },
      });

      const res = await sendOtpAction("warga@gmail.com");
      expect(res.success).toBe(false);
      expect(res.error).toContain("Gagal membuat kode OTP (Database connection error)");
    });

    it("should return error message when request_otp_code RPC returns null otpCode", async () => {
      mockRpc.mockResolvedValueOnce({
        data: null,
        error: null,
      });

      const res = await sendOtpAction("warga@gmail.com");
      expect(res.success).toBe(false);
      expect(res.error).toContain("Gagal membuat kode OTP (RPC error)");
    });
  });

  /* GOOD PATH TEST CASES */
  describe("Good Path", () => {
    it("should successfully process valid @gmail.com email and return normalized email", async () => {
      mockRpc.mockResolvedValueOnce({
        data: "12345678",
        error: null,
      });

      const res = await sendOtpAction("Warga.Cibubur@gmail.com");

      expect(mockRpc).toHaveBeenCalledWith("request_otp_code", {
        p_email: "warga.cibubur@gmail.com",
      });
      expect(res.success).toBe(true);
      expect(res.email).toBe("warga.cibubur@gmail.com");
    });
  });
});

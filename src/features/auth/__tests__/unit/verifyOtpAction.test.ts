import { describe, it, expect, vi, beforeEach } from "vitest";
import { verifyOtpAction } from "../../actions/login/verifyOtpAction";
import * as silentLoginModule from "../../actions/login/silentLoginUsingMagicLinkAction";

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

describe("verifyOtpAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /* BAD PATH TEST CASES */
  describe("Bad Path", () => {
    it("should reject when email or OTP input is empty", async () => {
      const res = await verifyOtpAction("", "");
      expect(res.success).toBe(false);
      expect(res.error).toBe("Kode OTP harus berupa 6 digit angka.");
    });

    it("should reject when OTP length is not 6 digits", async () => {
      const resShort = await verifyOtpAction("warga@gmail.com", "12345");
      expect(resShort.success).toBe(false);
      expect(resShort.error).toBe("Kode OTP harus berupa 6 digit angka.");

      const resLong = await verifyOtpAction("warga@gmail.com", "1234567");
      expect(resLong.success).toBe(false);
      expect(resLong.error).toBe("Kode OTP harus berupa 6 digit angka.");
    });

    it("should return error message when verify_otp_code RPC fails with rpcError", async () => {
      mockRpc.mockResolvedValueOnce({
        data: null,
        error: { message: "Database timeout" },
      });

      const res = await verifyOtpAction("warga@gmail.com", "123456");
      expect(res.success).toBe(false);
      expect(res.error).toBe("Gagal verifikasi OTP (Database timeout).");
    });

    it("should return error message when OTP is invalid or expired", async () => {
      mockRpc.mockResolvedValueOnce({
        data: { success: false, error: "Kode OTP tidak valid atau sudah kadaluwarsa." },
        error: null,
      });

      const res = await verifyOtpAction("warga@gmail.com", "654321");
      expect(res.success).toBe(false);
      expect(res.error).toBe("Kode OTP tidak valid atau sudah kadaluwarsa.");
    });

    it("should return error message when silentLoginUsingMagicLinkAction fails", async () => {
      mockRpc.mockResolvedValueOnce({
        data: { success: true },
        error: null,
      });

      vi.spyOn(silentLoginModule, "silentLoginUsingMagicLinkAction").mockResolvedValueOnce({
        success: false,
        error: "Gagal membuat token autentikasi admin.",
      });

      const res = await verifyOtpAction("warga@gmail.com", "123456");
      expect(res.success).toBe(false);
      expect(res.error).toBe("Gagal membuat token autentikasi admin.");
    });
  });

  /* GOOD PATH TEST CASES */
  describe("Good Path", () => {
    it("should successfully verify OTP and return dashboard redirect path", async () => {
      mockRpc.mockResolvedValueOnce({
        data: { success: true },
        error: null,
      });

      vi.spyOn(silentLoginModule, "silentLoginUsingMagicLinkAction").mockResolvedValueOnce({
        success: true,
      });

      const res = await verifyOtpAction("warga@gmail.com", "123456");

      expect(mockRpc).toHaveBeenCalledWith("verify_otp_code", {
        p_email: "warga@gmail.com",
        p_otp: "123456",
      });
      expect(res.success).toBe(true);
      expect(res.redirectTo).toBe("/dashboard");
    });
  });
});

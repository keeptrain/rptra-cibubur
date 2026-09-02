import { describe, it, expect, vi, beforeEach } from "vitest";
import { sendOtp, verifyOtpAction } from "../../actions/loginActions";

// Mock next/headers
vi.mock("next/headers", () => ({
  cookies: vi.fn().mockResolvedValue({ getAll: () => [], set: () => {} }),
  headers: vi.fn().mockResolvedValue({ get: () => null }),
}));

// Mock turnstile
vi.mock("@/lib/turnstile", () => ({
  verifyTurnstile: vi.fn().mockResolvedValue({ success: true }),
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn((url: string) => {
    throw new Error(`NEXT_REDIRECT:${url}`);
  }),
}));

vi.mock("../../actions/service", () => ({
  sendingOtp: vi.fn().mockResolvedValue("OTP terkirim."),
  verifyOtp: vi.fn().mockResolvedValue("OTP berhasil diverifikasi."),
}));

import { verifyTurnstile } from "@/lib/turnstile";
import { sendingOtp } from "../../actions/service";

describe("sendOtp — email step", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should reject empty email", async () => {
    const fd = new FormData();
    fd.set("email", "");
    fd.set("cf-turnstile-response", "tok");
    const res = await sendOtp(null, fd);
    expect(res.success).toBe(false);
    expect(res.error).toMatch(/tidak boleh kosong|tidak valid/i);
  });

  it("should reject non-gmail", async () => {
    const fd = new FormData();
    fd.set("email", "user@yahoo.com");
    fd.set("cf-turnstile-response", "tok");
    const res = await sendOtp(null, fd);
    expect(res.success).toBe(false);
    expect(res.error).toMatch(/@gmail\.com/);
  });

  it("should accept valid gmail", async () => {
    const fd = new FormData();
    fd.set("email", "warga@gmail.com");
    fd.set("cf-turnstile-response", "tok");
    const res = await sendOtp(null, fd);
    expect(res.success).toBe(true);
    expect((res as { validEmail: string }).validEmail).toBe("warga@gmail.com");
  });

  it("should fail turnstile", async () => {
    vi.mocked(verifyTurnstile).mockResolvedValueOnce({ success: false });
    const fd = new FormData();
    fd.set("email", "warga@gmail.com");
    fd.set("cf-turnstile-response", "bad");
    const res = await sendOtp(null, fd);
    expect(res.success).toBe(false);
    expect(res.error).toMatch(/keamanan gagal/i);
  });
});

describe("verifyOtpAction — otp step 6-digit", () => {
  beforeEach(() => vi.clearAllMocks());

  it("should reject otp not 6 digits", async () => {
    const fd = new FormData();
    fd.set("email", "warga@gmail.com");
    fd.set("otp", "12345");
    fd.set("cf-turnstile-response", "tok");
    const res = await verifyOtpAction(null, fd);
    expect(res.success).toBe(false);
    expect(res.error).toMatch(/6 digit/);
  });

  it("should accept 6-digit otp", async () => {
    const { verifyOtp } = await import("../../actions/service");
    vi.mocked(verifyOtp).mockResolvedValueOnce("verified" as unknown as string);
    const fd = new FormData();
    fd.set("email", "warga@gmail.com");
    fd.set("otp", "123456");
    fd.set("cf-turnstile-response", "tok");
    const res = await verifyOtpAction(null, fd);
    expect(res.success).toBe(true);
  });
});

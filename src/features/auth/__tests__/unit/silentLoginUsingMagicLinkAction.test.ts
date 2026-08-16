import { describe, it, expect, vi, beforeEach } from "vitest";
import { silentLoginUsingMagicLinkAction } from "../../actions/login/silentLoginUsingMagicLinkAction";

// Mock next/headers
vi.mock("next/headers", () => ({
  cookies: vi.fn().mockResolvedValue({}),
}));

// Mocks for Supabase Clients
const mockCreateUser = vi.fn();
const mockListUsers = vi.fn();
const mockUpdateUserById = vi.fn();
const mockGenerateLink = vi.fn();
const mockVerifyOtp = vi.fn();

vi.mock("@/lib/supabase/admin", () => ({
  createAdminClient: () => ({
    auth: {
      admin: {
        createUser: (...args: unknown[]) => mockCreateUser(...args),
        listUsers: (...args: unknown[]) => mockListUsers(...args),
        updateUserById: (...args: unknown[]) => mockUpdateUserById(...args),
        generateLink: (...args: unknown[]) => mockGenerateLink(...args),
      },
    },
  }),
}));

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn().mockResolvedValue({
    auth: {
      verifyOtp: (...args: unknown[]) => mockVerifyOtp(...args),
    },
  }),
}));

describe("silentLoginUsingMagicLinkAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /* BAD PATH TEST CASES */
  describe("Bad Path", () => {
    it("should return error message when Supabase Admin generateLink fails", async () => {
      mockCreateUser.mockResolvedValueOnce({ error: null });
      mockGenerateLink.mockResolvedValueOnce({
        data: null,
        error: { message: "Admin role unauthorized" },
      });

      const res = await silentLoginUsingMagicLinkAction("warga@gmail.com");
      expect(res.success).toBe(false);
      expect(res.error).toBe("Gagal membuat link autentikasi: Admin role unauthorized");
    });

    it("should return error when token property is missing from link generator response", async () => {
      mockCreateUser.mockResolvedValueOnce({ error: null });
      mockGenerateLink.mockResolvedValueOnce({
        data: { properties: {} },
        error: null,
      });

      const res = await silentLoginUsingMagicLinkAction("warga@gmail.com");
      expect(res.success).toBe(false);
      expect(res.error).toBe("Properti token tidak ditemukan pada link generator Supabase.");
    });

    it("should return error when Supabase Server SDK token verification fails", async () => {
      mockCreateUser.mockResolvedValueOnce({ error: null });
      mockGenerateLink.mockResolvedValueOnce({
        data: { properties: { email_otp: "token-123" } },
        error: null,
      });

      // Magiclink fails and email fallback fails
      mockVerifyOtp
        .mockResolvedValueOnce({ error: { message: "Token expired" } })
        .mockResolvedValueOnce({ error: { message: "Token invalid fallback" } });

      const res = await silentLoginUsingMagicLinkAction("warga@gmail.com");
      expect(res.success).toBe(false);
      expect(res.error).toBe("Gagal menyimpan sesi login: Token expired");
    });
  });

  /* GOOD PATH TEST CASES */
  describe("Good Path", () => {
    it("should successfully create new user and establish session cookie when user does not exist", async () => {
      mockCreateUser.mockResolvedValueOnce({ error: null });
      mockGenerateLink.mockResolvedValueOnce({
        data: { properties: { email_otp: "valid-token-999" } },
        error: null,
      });
      mockVerifyOtp.mockResolvedValueOnce({ error: null });

      const res = await silentLoginUsingMagicLinkAction("newuser@gmail.com");
      expect(res.success).toBe(true);
      expect(mockCreateUser).toHaveBeenCalledWith({
        email: "newuser@gmail.com",
        email_confirm: true,
      });
    });

    it("should successfully confirm existing user email and establish session cookie when user already registered", async () => {
      mockCreateUser.mockResolvedValueOnce({
        error: { message: "User already registered" },
      });
      mockListUsers.mockResolvedValueOnce({
        data: {
          users: [{ id: "user-123", email: "existing@gmail.com", email_confirmed_at: null }],
        },
      });
      mockUpdateUserById.mockResolvedValueOnce({ error: null });
      mockGenerateLink.mockResolvedValueOnce({
        data: { properties: { hashed_token: "hashed-token-888" } },
        error: null,
      });
      mockVerifyOtp.mockResolvedValueOnce({ error: null });

      const res = await silentLoginUsingMagicLinkAction("existing@gmail.com");
      expect(res.success).toBe(true);
      expect(mockUpdateUserById).toHaveBeenCalledWith("user-123", {
        email_confirm: true,
      });
    });
  });
});

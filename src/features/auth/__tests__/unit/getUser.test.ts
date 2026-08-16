import { describe, it, expect, vi, beforeEach } from "vitest";
import { getCurrentUser } from "../../lib/getUser";

// Mock react cache
vi.mock("react", async () => {
  const actual = await vi.importActual<typeof import("react")>("react");
  return {
    ...actual,
    cache: (fn: unknown) => fn,
  };
});

// Mock next/headers
vi.mock("next/headers", () => ({
  cookies: vi.fn().mockResolvedValue({}),
}));

// Mock @/lib/supabase/server
const mockGetUser = vi.fn();
vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn().mockResolvedValue({
    auth: {
      getUser: () => mockGetUser(),
    },
  }),
}));

describe("getCurrentUser", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /* BAD PATH TEST CASES */
  describe("Bad Path", () => {
    it("should return null when Supabase returns an authentication error", async () => {
      mockGetUser.mockResolvedValueOnce({
        data: { user: null },
        error: { message: "Invalid session" },
      });

      const user = await getCurrentUser();
      expect(user).toBeNull();
    });

    it("should return null when user data is null", async () => {
      mockGetUser.mockResolvedValueOnce({
        data: { user: null },
        error: null,
      });

      const user = await getCurrentUser();
      expect(user).toBeNull();
    });

    it("should return null safely when an internal exception occurs", async () => {
      mockGetUser.mockRejectedValueOnce(new Error("Internal error"));

      const user = await getCurrentUser();
      expect(user).toBeNull();
    });
  });

  /* GOOD PATH TEST CASES */
  describe("Good Path", () => {
    it("should successfully return authenticated user object when session is active", async () => {
      const dummyUser = {
        id: "usr-001",
        email: "admin@gmail.com",
        app_metadata: { role: "admin" },
      };

      mockGetUser.mockResolvedValueOnce({
        data: { user: dummyUser },
        error: null,
      });

      const user = await getCurrentUser();
      expect(user).toEqual(dummyUser);
    });
  });
});

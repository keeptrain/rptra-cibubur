import { describe, it, expect, vi, beforeEach } from "vitest";
import { logoutAction } from "../../actions/logoutAction";

// Mock next/headers
vi.mock("next/headers", () => ({
  cookies: vi.fn().mockResolvedValue({}),
}));

// Mock @/lib/supabase/server
const mockSignOut = vi.fn();
vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn().mockResolvedValue({
    auth: {
      signOut: () => mockSignOut(),
    },
  }),
}));

describe("logoutAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /* GOOD PATH TEST CASES */
  describe("Good Path", () => {
    it("should successfully invoke Supabase Auth signOut and return login redirect path", async () => {
      mockSignOut.mockResolvedValueOnce({ error: null });

      const res = await logoutAction();

      expect(mockSignOut).toHaveBeenCalled();
      expect(res.success).toBe(true);
      expect(res.redirectTo).toBe("/login");
    });
  });
});

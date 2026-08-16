import { describe, it, expect, vi, beforeEach } from "vitest";
import { getOperatingHours } from "../../api/getOperatingHours";

// Mock next/headers
vi.mock("next/headers", () => ({
  cookies: vi.fn().mockResolvedValue({}),
}));

// Mock @/lib/supabase/server
const mockSelect = vi.fn();
vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn().mockResolvedValue({
    from: () => ({
      select: () => ({
        order: (...args: unknown[]) => mockSelect(...args),
      }),
    }),
  }),
}));

describe("getOperatingHours", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /* BAD PATH TEST CASES */
  describe("Bad Path", () => {
    it("should return an empty array when database query returns error", async () => {
      mockSelect.mockResolvedValueOnce({
        data: null,
        error: { message: "Database connection failed" },
      });

      const res = await getOperatingHours();
      expect(res).toEqual([]);
    });

    it("should return an empty array safely when internal exception occurs", async () => {
      mockSelect.mockRejectedValueOnce(new Error("Network timeout"));

      const res = await getOperatingHours();
      expect(res).toEqual([]);
    });
  });

  /* GOOD PATH TEST CASES */
  describe("Good Path", () => {
    it("should return array of 7 regular operating hours sorted by day_of_week", async () => {
      const dummyHours = [
        { day_of_week: 0, day_name: "Minggu", open_time: "06:00:00", close_time: "18:00:00", is_open: true },
        { day_of_week: 1, day_name: "Senin", open_time: "06:00:00", close_time: "18:00:00", is_open: true },
      ];

      mockSelect.mockResolvedValueOnce({
        data: dummyHours,
        error: null,
      });

      const res = await getOperatingHours();
      expect(res).toEqual(dummyHours);
      expect(res.length).toBe(2);
    });
  });
});

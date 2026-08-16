import { describe, it, expect, vi, beforeEach } from "vitest";
import { getOperationLogsAction } from "../../actions/getOperationLogsAction";

// Mock next/headers
vi.mock("next/headers", () => ({
  cookies: vi.fn().mockResolvedValue({}),
}));

// Mocks for Supabase Client
const mockRange = vi.fn();

vi.mock("@/lib/supabase/server", () => ({
  createClient: vi.fn().mockResolvedValue({
    from: () => ({
      select: () => ({
        order: () => ({
          range: (...args: unknown[]) => mockRange(...args),
        }),
      }),
    }),
  }),
}));

describe("getOperationLogsAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /* BAD PATH TEST CASES */
  describe("Bad Path", () => {
    it("should return default fallback object when database query returns error", async () => {
      mockRange.mockResolvedValueOnce({
        data: null,
        count: null,
        error: { message: "Database query failure" },
      });

      const res = await getOperationLogsAction(1, 10);
      expect(res.logs).toEqual([]);
      expect(res.totalCount).toBe(0);
      expect(res.totalPages).toBe(1);
      expect(res.currentPage).toBe(1);
    });

    it("should return default fallback object when internal exception is thrown", async () => {
      mockRange.mockRejectedValueOnce(new Error("Connection error"));

      const res = await getOperationLogsAction(1, 10);
      expect(res.logs).toEqual([]);
      expect(res.totalCount).toBe(0);
      expect(res.totalPages).toBe(1);
    });
  });

  /* GOOD PATH TEST CASES */
  describe("Good Path", () => {
    it("should correctly request offset range for page 1 with pageSize 10", async () => {
      const dummyLogs = [
        {
          id: "log-1",
          override_date: "2026-08-20",
          status: "CLOSED",
          custom_open_time: null,
          custom_close_time: null,
          reason_notice: "Maintenance",
          created_at: "2026-08-16T12:00:00Z",
        },
      ];

      mockRange.mockResolvedValueOnce({
        data: dummyLogs,
        count: 25,
        error: null,
      });

      const res = await getOperationLogsAction(1, 10);

      expect(mockRange).toHaveBeenCalledWith(0, 9);
      expect(res.logs).toEqual(dummyLogs);
      expect(res.totalCount).toBe(25);
      expect(res.totalPages).toBe(3); // Math.ceil(25 / 10) = 3
      expect(res.currentPage).toBe(1);
    });

    it("should correctly request offset range for page 2 with pageSize 10", async () => {
      mockRange.mockResolvedValueOnce({
        data: [],
        count: 25,
        error: null,
      });

      const res = await getOperationLogsAction(2, 10);

      expect(mockRange).toHaveBeenCalledWith(10, 19);
      expect(res.currentPage).toBe(2);
      expect(res.totalPages).toBe(3);
    });
  });
});

import { describe, it, expect, vi, beforeEach } from "vitest";
import { getLiveStatus } from "../../api/getLiveStatus";

// Mock next/cache unstable_cache
vi.mock("next/cache", () => ({
  unstable_cache: (fn: CallableFunction) => fn,
}));

// Mock @/lib/supabase/client
const mockMaybeSingleSchedule = vi.fn();
const mockMaybeSingleLog = vi.fn();

vi.mock("@/lib/supabase/client", () => ({
  createClient: () => ({
    from: (table: string) => {
      if (table === "park_operating_hours") {
        return {
          select: () => ({
            eq: () => ({
              maybeSingle: () => mockMaybeSingleSchedule(),
            }),
          }),
        };
      }
      if (table === "park_operation_logs") {
        return {
          select: () => ({
            eq: () => ({
              order: () => ({
                limit: () => ({
                  maybeSingle: () => mockMaybeSingleLog(),
                }),
              }),
            }),
          }),
        };
      }
      return {};
    },
  }),
}));

describe("getLiveStatus", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /* BAD PATH TEST CASES */
  describe("Bad Path", () => {
    it("should return default closed status when database queries fail or return null", async () => {
      mockMaybeSingleSchedule.mockResolvedValueOnce({
        data: null,
        error: new Error("DB Error"),
      });
      mockMaybeSingleLog.mockResolvedValueOnce({
        data: null,
        error: new Error("DB Error"),
      });

      const res = await getLiveStatus();
      expect(res.isOpen).toBe(false);
      expect(res.isEmergencyClosed).toBe(false);
      expect(res.statusLabel).toBe("Ditutup (Sesuai Jam Reguler)");
    });
  });

  /* GOOD PATH TEST CASES */
  describe("Good Path", () => {
    it("should return open status when current time is within regular schedule bounds", async () => {
      mockMaybeSingleSchedule.mockResolvedValueOnce({
        data: {
          is_open: true,
          open_time: "00:00:00",
          close_time: "23:59:00",
        },
      });
      mockMaybeSingleLog.mockResolvedValueOnce({ data: null });

      const res = await getLiveStatus();
      expect(res.isOpen).toBe(true);
      expect(res.statusLabel).toBe("Beroperasi");
    });

    it("should return closed status when current time is outside regular schedule bounds", async () => {
      mockMaybeSingleSchedule.mockResolvedValueOnce({
        data: {
          is_open: true,
          open_time: "01:00:00",
          close_time: "02:00:00",
        },
      });
      mockMaybeSingleLog.mockResolvedValueOnce({ data: null });

      const res = await getLiveStatus();
      expect(res.isOpen).toBe(false);
      expect(res.statusLabel).toBe("Ditutup (Sesuai Jam Reguler)");
    });

    it("should return emergency closed status when todayLog status is CLOSED", async () => {
      mockMaybeSingleSchedule.mockResolvedValueOnce({
        data: {
          is_open: true,
          open_time: "00:00:00",
          close_time: "23:59:00",
        },
      });
      mockMaybeSingleLog.mockResolvedValueOnce({
        data: {
          status: "CLOSED",
          reason_notice: "Emergency maintenance in progress",
        },
      });

      const res = await getLiveStatus();
      expect(res.isOpen).toBe(false);
      expect(res.isEmergencyClosed).toBe(true);
      expect(res.statusLabel).toBe("Ditutup Sementara (Penutupan Darurat)");
      expect(res.closeNotice.length).toBeGreaterThan(0);
      expect(res.closeNotice[0]).toBe("Emergency maintenance in progress");
    });
  });
});

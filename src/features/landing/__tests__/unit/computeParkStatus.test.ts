import { describe, it, expect } from "vitest";
import {
  parseTimeToMinutes,
  computeParkStatus,
} from "../../api/getLiveStatus";

describe("parseTimeToMinutes", () => {
  it("should return 0 for empty or invalid time string", () => {
    expect(parseTimeToMinutes("")).toBe(0);
    // @ts-expect-error testing null input
    expect(parseTimeToMinutes(null)).toBe(0);
  });

  it("should correctly parse HH:mm or HH:mm:ss to total minutes", () => {
    expect(parseTimeToMinutes("06:00")).toBe(360);
    expect(parseTimeToMinutes("06:30:00")).toBe(390);
    expect(parseTimeToMinutes("18:00:00")).toBe(1080);
    expect(parseTimeToMinutes("23:59:00")).toBe(1439);
  });
});

describe("computeParkStatus", () => {
  const regularSchedule = {
    is_open: true,
    open_time: "06:00:00",
    close_time: "18:00:00",
  };

  /* BAD PATH & EDGE CASES */
  describe("Bad Path & Edge Cases", () => {
    it("should return default closed status when schedule and todayLog are null", () => {
      const res = computeParkStatus(720, null, null);
      expect(res.isOpen).toBe(false);
      expect(res.isEmergencyClosed).toBe(false);
      expect(res.statusLabel).toBe("Ditutup (Sesuai Jam Reguler)");
    });

    it("should return closed status 1 minute before open time (05:59 WIB / 359 mins)", () => {
      const res = computeParkStatus(359, regularSchedule, null);
      expect(res.isOpen).toBe(false);
      expect(res.statusLabel).toBe("Ditutup (Sesuai Jam Reguler)");
    });

    it("should return closed status exactly at close time (18:00 WIB / 1080 mins)", () => {
      const res = computeParkStatus(1080, regularSchedule, null);
      expect(res.isOpen).toBe(false);
      expect(res.statusLabel).toBe("Ditutup (Sesuai Jam Reguler)");
    });

    it("should return closed status 1 minute after close time (18:01 WIB / 1081 mins)", () => {
      const res = computeParkStatus(1081, regularSchedule, null);
      expect(res.isOpen).toBe(false);
      expect(res.statusLabel).toBe("Ditutup (Sesuai Jam Reguler)");
    });
  });

  /* GOOD PATH TEST CASES */
  describe("Good Path", () => {
    it("should return open status exactly at open time (06:00 WIB / 360 mins)", () => {
      const res = computeParkStatus(360, regularSchedule, null);
      expect(res.isOpen).toBe(true);
      expect(res.statusLabel).toBe("Beroperasi");
    });

    it("should return open status 1 minute before close time (17:59 WIB / 1079 mins)", () => {
      const res = computeParkStatus(1079, regularSchedule, null);
      expect(res.isOpen).toBe(true);
      expect(res.statusLabel).toBe("Beroperasi");
    });

    it("should handle emergency closure log (status CLOSED) during regular open hours", () => {
      const emergencyLog = {
        status: "CLOSED",
        reason_notice: "Heavy rain and flooded playground",
      };

      const res = computeParkStatus(720, regularSchedule, emergencyLog);
      expect(res.isOpen).toBe(false);
      expect(res.isEmergencyClosed).toBe(true);
      expect(res.statusLabel).toBe("Ditutup Sementara (Penutupan Darurat)");
      expect(res.closeNotice[0]).toBe("Heavy rain and flooded playground");
    });

    it("should handle custom modified hours (status MODIFIED 08:00 - 12:00 WIB)", () => {
      const modifiedLog = {
        status: "MODIFIED",
        custom_open_time: "08:00:00",
        custom_close_time: "12:00:00",
        reason_notice: "Special morning event",
      };

      // 10:00 WIB (600 mins) -> Open
      const resOpen = computeParkStatus(600, regularSchedule, modifiedLog);
      expect(resOpen.isOpen).toBe(true);
      expect(resOpen.statusLabel).toBe("Beroperasi (Jadwal Khusus)");

      // 13:00 WIB (780 mins) -> Closed
      const resClosed = computeParkStatus(780, regularSchedule, modifiedLog);
      expect(resClosed.isOpen).toBe(false);
      expect(resClosed.statusLabel).toBe("Ditutup (Di Luar Jam Khusus)");
    });
  });
});

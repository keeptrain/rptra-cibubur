"use client";

import React from "react";
import { useClosePark } from "../hooks/useClosePark";
import { useReopenPark } from "../hooks/useReopenPark";

interface CloseParkFormProps {
  isOpen: boolean;
}

export default function CloseParkForm({ isOpen }: CloseParkFormProps) {
  const {
    isFormOpen,
    setIsFormOpen,
    reason,
    setReason,
    isLoading: isClosing,
    message: closeMessage,
    handleClosePark,
  } = useClosePark();

  const {
    isLoading: isReopening,
    message: reopenMessage,
    handleReopenPark,
  } = useReopenPark();

  const displayMessage = closeMessage || reopenMessage;
  const isLoading = isClosing || isReopening;

  return (
    <div>
      {displayMessage && (
        <p className="mb-2 text-xs font-bold text-emerald-900">
          {displayMessage}
        </p>
      )}

      {/* SINGLE DYNAMIC BUTTON BASED ON CURRENT PARK STATUS */}
      <div>
        {isOpen ? (
          <button
            type="button"
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="rounded border border-red-200 bg-red-50 px-3 py-1 text-xs font-bold text-red-700 hover:bg-red-100"
          >
            Tutup Sekarang
          </button>
        ) : (
          <button
            type="button"
            onClick={() => handleReopenPark(() => setIsFormOpen(false))}
            disabled={isLoading}
            className="rounded border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 hover:bg-emerald-100 disabled:opacity-50"
          >
            {isReopening ? "Memproses..." : "Buka Kembali"}
          </button>
        )}
      </div>

      {/* FORM FILL REASON (ONLY WHEN PARK IS OPEN & ADMIN WANTS TO CLOSE IT) */}
      {isOpen && isFormOpen && (
        <form onSubmit={handleClosePark} className="mt-3 space-y-2">
          <div>
            <label htmlFor="reason" className="block text-xs font-bold">
              Alasan Penutupan / Pengumuman Marquee:
            </label>
            <input
              type="text"
              id="reason"
              required
              placeholder="cth: Ditutup sementara karena perbaikan fasilitas..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="mt-1 w-full rounded border px-3 py-2 text-xs"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isLoading || !reason.trim()}
              className="rounded bg-red-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-red-700 disabled:opacity-50"
            >
              {isClosing ? "Menyimpan..." : "Konfirmasi Tutup Taman"}
            </button>
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="rounded border px-3 py-1.5 text-xs font-bold"
            >
              Batal
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

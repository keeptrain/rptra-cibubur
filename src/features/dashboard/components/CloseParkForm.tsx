"use client";

import { useClosePark } from "../hooks/useClosePark";
import { useReopenPark } from "../hooks/useReopenPark";
import { AlertCircle, Lock, Unlock, ArrowRight } from "lucide-react";

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
    <div className="space-y-4">
      {displayMessage && (
        <div
          className={`flex items-center gap-2 rounded-lg p-3 text-xs font-medium ${
            displayMessage.includes("Berhasil")
              ? "border border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border border-rose-200 bg-rose-50 text-rose-800"
          }`}
        >
          <AlertCircle className="size-4 shrink-0" />
          <span>{displayMessage}</span>
        </div>
      )}

      {/* SINGLE DYNAMIC BUTTON */}
      <div>
        {isOpen ? (
          <button
            type="button"
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-semibold shadow-xs transition-colors sm:w-auto"
          >
            <Lock className="size-3.5" />
            Tutup Taman Sekarang
          </button>
        ) : (
          <button
            type="button"
            onClick={() => handleReopenPark(() => setIsFormOpen(false))}
            disabled={isLoading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-emerald-700 disabled:opacity-50 sm:w-auto"
          >
            <Unlock className="size-3.5" />
            {isReopening ? "Memproses..." : "Buka Kembali Taman"}
          </button>
        )}
      </div>

      {/* REASON FORM DRAWER */}
      {isOpen && isFormOpen && (
        <form
          onSubmit={handleClosePark}
          className="space-y-3 rounded-xl border border-slate-200 bg-slate-50/80 p-4 text-left"
        >
          <div className="space-y-1">
            <label
              htmlFor="reason"
              className="block text-xs font-semibold text-slate-700"
            >
              Alasan Penutupan / Teks Pengumuman Marquee:
            </label>
            <input
              type="text"
              id="reason"
              required
              placeholder="cth: Ditutup sementara karena perbaikan fasilitas..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-normal text-slate-900 placeholder-slate-400 transition-colors outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isLoading || !reason.trim()}
              className="inline-flex items-center gap-1.5 rounded-lg bg-rose-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-rose-700 disabled:opacity-50"
            >
              {isClosing ? "Menyimpan..." : "Konfirmasi Tutup"}
              <ArrowRight className="size-3.5" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

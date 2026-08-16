"use client";

import Link from "next/link";
import {
  AlertCircle,
  Unlock,
  ArrowRight,
  SquareXIcon,
  Info,
} from "lucide-react";
import { useClosePark } from "../../hooks/useClosePark";
import { useReopenPark } from "../../hooks/useReopenPark";

interface CloseParkFormProps {
  isOpen: boolean;
  isEmergencyClosed?: boolean;
}

export default function CloseParkForm({
  isOpen,
  isEmergencyClosed = false,
}: CloseParkFormProps) {
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

      {/* DYNAMIC ACTION BUTTON / NOTICE */}
      <div>
        {isOpen ? (
          <button
            type="button"
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-xs font-semibold text-rose-800 shadow-xs transition-colors hover:bg-rose-100 sm:w-auto"
          >
            <SquareXIcon className="size-4" />
            Tutup Darurat (Insidental)
          </button>
        ) : isEmergencyClosed ? (
          <button
            type="button"
            onClick={() => handleReopenPark(() => setIsFormOpen(false))}
            disabled={isLoading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-emerald-700 disabled:opacity-50 sm:w-auto"
          >
            <Unlock className="size-3.5" />
            {isReopening
              ? "Memproses..."
              : "Buka Kembali (Batalkan Penutupan Darurat)"}
          </button>
        ) : (
          <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 p-2.5 px-3 text-xs font-medium text-slate-600">
            <Info className="size-4 shrink-0 text-slate-400" />
            <span>
              Taman saat ini tutup otomatis sesuai jam operasional harian.
            </span>
            <Link
              href="/jam-operasional"
              className="inline-flex items-center gap-1 font-bold text-emerald-600 underline hover:text-emerald-700"
            >
              Ubah Jam Operasional
              <ArrowRight className="size-3" />
            </Link>
          </div>
        )}
      </div>

      {/* REASON FORM DRAWER FOR EMERGENCY CLOSURE */}
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
              Alasan Penutupan Darurat / Teks Pengumuman Marquee:
            </label>
            <input
              type="text"
              id="reason"
              required
              placeholder="cth: Ditutup sementara karena perbaikan fasilitas / cuaca buruk..."
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
              {isClosing ? "Menyimpan..." : "Konfirmasi Tutup Darurat"}
              <ArrowRight className="size-3.5" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

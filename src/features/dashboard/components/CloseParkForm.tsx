"use client";

import React, { useState } from "react";
import { updateParkStatusAction } from "../actions/updateParkStatusAction";

export default function CloseParkForm() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleClosePark = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    const res = await updateParkStatusAction("CLOSED", reason);
    setIsLoading(false);

    if (res.success) {
      setMessage("Berhasil mencatat penutupan taman hari ini.");
      setReason("");
      setIsFormOpen(false);
    } else {
      setMessage(res.error || "Gagal mengubah status taman.");
    }
  };

  const handleReopenPark = async () => {
    setIsLoading(true);
    setMessage("");

    const res = await updateParkStatusAction("OPEN", "");
    setIsLoading(false);

    if (res.success) {
      setMessage(
        "Berhasil membuka kembali taman. Pengumuman penutupan dibersihkan.",
      );
      setIsFormOpen(false);
    } else {
      setMessage(res.error || "Gagal membuka kembali taman.");
    }
  };

  return (
    <div>
      {message && (
        <p className="mb-2 text-xs font-bold text-emerald-900">{message}</p>
      )}

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setIsFormOpen(true)}
          className="rounded border border-red-200 bg-red-50 px-3 py-1 text-xs font-bold text-red-700 hover:bg-red-100"
        >
          Tutup Sekarang
        </button>

        <button
          type="button"
          onClick={handleReopenPark}
          disabled={isLoading}
          className="rounded border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 hover:bg-emerald-100 disabled:opacity-50"
        >
          {isLoading ? "Memproses..." : "Buka Kembali"}
        </button>
      </div>

      {isFormOpen && (
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
              {isLoading ? "Menyimpan..." : "Konfirmasi Tutup Taman"}
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

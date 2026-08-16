"use client";

import { useState } from "react";
import { createOverrideLogAction } from "../actions/createOverrideLogAction";
import { Calendar, AlertCircle, CheckCircle2, X } from "lucide-react";

interface OverrideScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function OverrideScheduleModal({
  isOpen,
  onClose,
  onSuccess,
}: OverrideScheduleModalProps) {
  const [overrideDate, setOverrideDate] = useState("");
  const [status, setStatus] = useState<"CLOSED" | "MODIFIED" | "OPEN">("CLOSED");
  const [customOpenTime, setCustomOpenTime] = useState("08:00");
  const [customCloseTime, setCustomCloseTime] = useState("13:00");
  const [reasonNotice, setReasonNotice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    isError: boolean;
  } | null>(null);

  const handleTimeChange = (
    field: "customOpenTime" | "customCloseTime",
    value: string,
  ) => {
    let cleanVal = value.replace(/[^0-9:]/g, "");
    if (cleanVal.length === 2 && !cleanVal.includes(":")) {
      cleanVal = `${cleanVal}:`;
    }
    if (cleanVal.length > 5) {
      cleanVal = cleanVal.slice(0, 5);
    }

    if (field === "customOpenTime") setCustomOpenTime(cleanVal);
    if (field === "customCloseTime") setCustomCloseTime(cleanVal);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const openFormatted = customOpenTime.includes(":")
      ? customOpenTime.length === 5
        ? `${customOpenTime}:00`
        : customOpenTime
      : "08:00:00";

    const closeFormatted = customCloseTime.includes(":")
      ? customCloseTime.length === 5
        ? `${customCloseTime}:00`
        : customCloseTime
      : "13:00:00";

    const res = await createOverrideLogAction({
      overrideDate,
      status,
      customOpenTime: status === "MODIFIED" ? openFormatted : null,
      customCloseTime: status === "MODIFIED" ? closeFormatted : null,
      reasonNotice: reasonNotice.trim() || null,
    });

    setIsLoading(false);

    if (res.success) {
      setMessage({ text: res.message, isError: false });
      setReasonNotice("");
      setOverrideDate("");
      if (onSuccess) onSuccess();
      setTimeout(() => {
        onClose();
        setMessage(null);
      }, 1000);
    } else {
      setMessage({ text: res.message, isError: true });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-4 text-left">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <Calendar className="size-4.5 text-emerald-600" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
            FORM OVERRIDE JADWAL OPERASIONAL
          </h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700"
        >
          <X className="size-4" />
        </button>
      </div>

      {message && (
        <div
          className={`flex items-center gap-2 rounded-lg p-3 text-xs font-semibold ${
            message.isError
              ? "border border-rose-200 bg-rose-50 text-rose-800"
              : "border border-emerald-200 bg-emerald-50 text-emerald-800"
          }`}
        >
          {message.isError ? (
            <AlertCircle className="size-4 shrink-0" />
          ) : (
            <CheckCircle2 className="size-4 shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* TANGGAL OVERRIDE */}
        <div className="space-y-1">
          <label
            htmlFor="overrideDate"
            className="block text-xs font-bold text-slate-700"
          >
            Pilih Tanggal Pengecualian:
          </label>
          <input
            type="date"
            id="overrideDate"
            required
            value={overrideDate}
            onChange={(e) => setOverrideDate(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>

        {/* MODE OVERRIDE (3 RADIO CARDS) */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700">
            Pilih Mode Override:
          </label>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
            {/* MODE 1: CLOSED */}
            <label
              className={`flex cursor-pointer flex-col justify-between rounded-xl border p-3 text-left transition-all ${
                status === "CLOSED"
                  ? "border-rose-500 bg-rose-50/60 ring-2 ring-rose-500/20"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-700">
                  1. Full Closed
                </span>
                <input
                  type="radio"
                  name="status"
                  value="CLOSED"
                  checked={status === "CLOSED"}
                  onChange={() => setStatus("CLOSED")}
                  className="accent-rose-600"
                />
              </div>
              <p className="mt-1 text-[11px] font-medium text-slate-500">
                Taman ditutup total pada tanggal target.
              </p>
            </label>

            {/* MODE 2: MODIFIED */}
            <label
              className={`flex cursor-pointer flex-col justify-between rounded-xl border p-3 text-left transition-all ${
                status === "MODIFIED"
                  ? "border-amber-500 bg-amber-50/60 ring-2 ring-amber-500/20"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-800">
                  2. Custom Hours
                </span>
                <input
                  type="radio"
                  name="status"
                  value="MODIFIED"
                  checked={status === "MODIFIED"}
                  onChange={() => setStatus("MODIFIED")}
                  className="accent-amber-600"
                />
              </div>
              <p className="mt-1 text-[11px] font-medium text-slate-500">
                Buka dengan jam khusus (misal 08:00 - 13:00).
              </p>
            </label>

            {/* MODE 3: OPEN */}
            <label
              className={`flex cursor-pointer flex-col justify-between rounded-xl border p-3 text-left transition-all ${
                status === "OPEN"
                  ? "border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/20"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-800">
                  3. Force Open
                </span>
                <input
                  type="radio"
                  name="status"
                  value="OPEN"
                  checked={status === "OPEN"}
                  onChange={() => setStatus("OPEN")}
                  className="accent-emerald-600"
                />
              </div>
              <p className="mt-1 text-[11px] font-medium text-slate-500">
                Memaksa tetap buka pada hari libur reguler.
              </p>
            </label>
          </div>
        </div>

        {/* CUSTOM TIME INPUTS (ONLY FOR MODIFIED MODE) */}
        {status === "MODIFIED" && (
          <div className="flex flex-wrap items-center gap-3 rounded-xl border border-amber-200 bg-amber-50/40 p-3">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-amber-900">
                Jam Buka:
              </span>
              <input
                type="text"
                maxLength={5}
                placeholder="08:00"
                required
                value={customOpenTime}
                onChange={(e) =>
                  handleTimeChange("customOpenTime", e.target.value)
                }
                className="w-16 rounded-lg border border-amber-300 bg-white px-2.5 py-1 text-center text-xs font-bold text-slate-900 outline-none"
              />
            </div>

            <span className="text-xs font-bold text-amber-900">s/d</span>

            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-amber-900">
                Jam Tutup:
              </span>
              <input
                type="text"
                maxLength={5}
                placeholder="13:00"
                required
                value={customCloseTime}
                onChange={(e) =>
                  handleTimeChange("customCloseTime", e.target.value)
                }
                className="w-16 rounded-lg border border-amber-300 bg-white px-2.5 py-1 text-center text-xs font-bold text-slate-900 outline-none"
              />
            </div>

            <span className="text-xs font-bold text-amber-900">WIB</span>
          </div>
        )}

        {/* REASON NOTICE INPUT (MANDATORY FOR CLOSED, OPTIONAL FOR MODIFIED) */}
        {(status === "CLOSED" || status === "MODIFIED") && (
          <div className="space-y-1">
            <label
              htmlFor="reasonNotice"
              className="block text-xs font-bold text-slate-700"
            >
              Catatan / Teks Pengumuman Running Marquee:
              {status === "CLOSED" && (
                <span className="text-rose-500">* (Wajib)</span>
              )}
            </label>
            <input
              type="text"
              id="reasonNotice"
              required={status === "CLOSED"}
              placeholder={
                status === "CLOSED"
                  ? "cth: Ditutup karena perbaikan fasilitas playground..."
                  : "cth: Buka terbatas karena ada acara kerja bakti warga..."
              }
              value={reasonNotice}
              onChange={(e) => setReasonNotice(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-900 placeholder-slate-400 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
        )}

        {/* SUBMIT BUTTON */}
        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-xl bg-emerald-600 px-5 py-2 text-xs font-bold text-white transition-colors hover:bg-emerald-700 disabled:opacity-50"
          >
            {isLoading ? "Menyimpan..." : "Simpan Override"}
          </button>
        </div>
      </form>
    </div>
  );
}

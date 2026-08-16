"use client";

import { useState, useEffect, memo } from "react";
import { OperatingHourItem } from "../api/getOperatingHours";
import { updateOperatingHoursAction } from "../actions/updateOperatingHoursAction";
import {
  Clock,
  Check,
  AlertCircle,
  Save,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface RegularHoursEditorProps {
  initialHours: OperatingHourItem[];
}

const defaultDays: OperatingHourItem[] = [
  {
    day_of_week: 0,
    day_name: "Minggu",
    open_time: "06:00:00",
    close_time: "18:00:00",
    is_open: true,
    updated_at: "",
  },
  {
    day_of_week: 1,
    day_name: "Senin",
    open_time: "06:00:00",
    close_time: "18:00:00",
    is_open: true,
    updated_at: "",
  },
  {
    day_of_week: 2,
    day_name: "Selasa",
    open_time: "06:00:00",
    close_time: "18:00:00",
    is_open: true,
    updated_at: "",
  },
  {
    day_of_week: 3,
    day_name: "Rabu",
    open_time: "06:00:00",
    close_time: "18:00:00",
    is_open: true,
    updated_at: "",
  },
  {
    day_of_week: 4,
    day_name: "Kamis",
    open_time: "06:00:00",
    close_time: "18:00:00",
    is_open: true,
    updated_at: "",
  },
  {
    day_of_week: 5,
    day_name: "Jumat",
    open_time: "06:00:00",
    close_time: "18:00:00",
    is_open: true,
    updated_at: "",
  },
  {
    day_of_week: 6,
    day_name: "Sabtu",
    open_time: "06:00:00",
    close_time: "18:00:00",
    is_open: true,
    updated_at: "",
  },
];

export default function RegularHoursEditor({
  initialHours,
}: RegularHoursEditorProps) {
  const [hours, setHours] = useState<OperatingHourItem[]>(
    initialHours && initialHours.length > 0 ? initialHours : defaultDays,
  );
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  useEffect(() => {
    if (initialHours && initialHours.length > 0) {
      setHours(initialHours);
    }
  }, [initialHours]);

  const handleUpdateItem = (updatedItem: OperatingHourItem) => {
    setHours((prev) =>
      prev.map((item) =>
        item.day_of_week === updatedItem.day_of_week ? updatedItem : item,
      ),
    );
  };

  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 px-6 text-left shadow-xs">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-xs font-bold tracking-wider text-slate-900 uppercase">
            JADWAL REGULER MINGGUAN (7 HARI)
          </h3>
          <p className="text-xs font-medium text-slate-500">
            Klik kartu hari untuk membuka panel edit jam operasional.
          </p>
        </div>
      </div>

      {/* 7 DAYS ISOLATED CARDS GRID */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {hours.map((item) => (
          <DayCardItem
            key={item.day_of_week}
            item={item}
            isExpanded={expandedDay === item.day_of_week}
            onToggleExpand={() =>
              setExpandedDay(
                expandedDay === item.day_of_week ? null : item.day_of_week,
              )
            }
            onSaveSuccess={handleUpdateItem}
            onCloseExpand={() => setExpandedDay(null)}
          />
        ))}
      </div>
    </div>
  );
}

/* ISOLATED MEMOIZED DAY CARD ITEM COMPONENT (RE-RENDER ISOLATION) */
interface DayCardItemProps {
  item: OperatingHourItem;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onSaveSuccess: (updated: OperatingHourItem) => void;
  onCloseExpand: () => void;
}

const DayCardItem = memo(function DayCardItem({
  item,
  isExpanded,
  onToggleExpand,
  onSaveSuccess,
  onCloseExpand,
}: DayCardItemProps) {
  // Local state per card to prevent parent re-renders on keystroke
  const [localIsOpen, setLocalIsOpen] = useState(item.is_open);
  const [localOpenTime, setLocalOpenTime] = useState(
    item.open_time.slice(0, 5),
  );
  const [localCloseTime, setLocalCloseTime] = useState(
    item.close_time.slice(0, 5),
  );
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{
    msg: string;
    isError: boolean;
  } | null>(null);

  useEffect(() => {
    setLocalIsOpen(item.is_open);
    setLocalOpenTime(item.open_time.slice(0, 5));
    setLocalCloseTime(item.close_time.slice(0, 5));
  }, [item]);

  const handleTimeInput = (field: "open" | "close", val: string) => {
    let cleanVal = val.replace(/[^0-9:]/g, "");
    if (cleanVal.length === 2 && !cleanVal.includes(":")) {
      cleanVal = `${cleanVal}:`;
    }
    if (cleanVal.length > 5) {
      cleanVal = cleanVal.slice(0, 5);
    }

    if (field === "open") setLocalOpenTime(cleanVal);
    if (field === "close") setLocalCloseTime(cleanVal);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setFeedback(null);

    const openFormatted = localOpenTime.includes(":")
      ? localOpenTime.length === 5
        ? `${localOpenTime}:00`
        : localOpenTime
      : "06:00:00";

    const closeFormatted = localCloseTime.includes(":")
      ? localCloseTime.length === 5
        ? `${localCloseTime}:00`
        : localCloseTime
      : "18:00:00";

    const res = await updateOperatingHoursAction({
      dayOfWeek: item.day_of_week,
      openTime: openFormatted,
      closeTime: closeFormatted,
      isOpen: localIsOpen,
    });

    setIsSaving(false);

    if (res.success) {
      const updated: OperatingHourItem = {
        ...item,
        is_open: localIsOpen,
        open_time: openFormatted,
        close_time: closeFormatted,
      };
      onSaveSuccess(updated);
      setFeedback({ msg: res.message, isError: false });
      setTimeout(() => {
        onCloseExpand();
        setFeedback(null);
      }, 1000);
    } else {
      setFeedback({ msg: res.message, isError: true });
    }
  };

  return (
    <div
      className={`flex flex-col justify-between rounded-xl border transition-all duration-200 ${
        isExpanded
          ? "col-span-2 border-emerald-500 bg-emerald-50/30 p-4 shadow-md ring-2 ring-emerald-500/20 sm:col-span-2"
          : "border-slate-200/80 bg-slate-50/60 p-3.5 hover:border-slate-300 hover:bg-white hover:shadow-xs"
      }`}
    >
      {/* CARD HEADER TRIGGER */}
      <button
        type="button"
        onClick={onToggleExpand}
        className="flex w-full items-start justify-between text-left"
      >
        <div className="space-y-1">
          <span className="text-xs font-bold text-slate-900">
            {item.day_name}
          </span>

          <div className="flex items-center gap-1.5">
            <span
              className={`size-1.5 rounded-full ${
                localIsOpen ? "bg-emerald-600" : "bg-rose-600"
              }`}
            />
            <span
              className={`text-[11px] font-semibold ${
                localIsOpen ? "text-emerald-800" : "text-rose-800"
              }`}
            >
              {localIsOpen ? "Hari Buka" : "Hari Libur"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-slate-400">
          {isExpanded ? (
            <ChevronUp className="size-4 text-emerald-600" />
          ) : (
            <ChevronDown className="size-4" />
          )}
        </div>
      </button>

      {/* COLLAPSED TIME SUMMARY */}
      {!isExpanded && (
        <div className="mt-3 flex items-center gap-1 text-xs font-bold text-slate-700">
          <Clock className="size-3.5 shrink-0 text-slate-400" />
          <span>
            {localIsOpen
              ? `${localOpenTime} - ${localCloseTime}`
              : "Tutup (Libur)"}
          </span>
        </div>
      )}

      {/* INLINE EXPANDED EDIT FORM (ISOLATED) */}
      {isExpanded && (
        <div className="animate-in fade-in mt-3 space-y-3 border-t border-emerald-200/60 pt-3 text-left">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">
              Status Hari Ini:
            </span>
            <button
              type="button"
              onClick={() => setLocalIsOpen(!localIsOpen)}
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold transition-colors ${
                localIsOpen
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-rose-100 text-rose-800"
              }`}
            >
              <span
                className={`size-1.5 rounded-full ${
                  localIsOpen ? "bg-emerald-600" : "bg-rose-600"
                }`}
              />
              {localIsOpen ? "Hari Buka" : "Hari Libur"}
            </button>
          </div>

          {localIsOpen && (
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1">
                <Clock className="size-3 text-slate-400" />
                <input
                  type="text"
                  maxLength={5}
                  placeholder="06:00"
                  value={localOpenTime}
                  onChange={(e) => handleTimeInput("open", e.target.value)}
                  className="w-14 rounded-lg border border-slate-300 bg-white px-2 py-1 text-center text-xs font-bold text-slate-900 outline-none focus:border-emerald-500"
                />
              </div>

              <span className="text-xs font-semibold text-slate-400">s/d</span>

              <input
                type="text"
                maxLength={5}
                placeholder="18:00"
                value={localCloseTime}
                onChange={(e) => handleTimeInput("close", e.target.value)}
                className="w-14 rounded-lg border border-slate-300 bg-white px-2 py-1 text-center text-xs font-bold text-slate-900 outline-none focus:border-emerald-500"
              />

              <span className="text-xs font-bold text-slate-500">WIB</span>
            </div>
          )}

          {feedback && (
            <div
              className={`flex items-center gap-1.5 text-xs font-semibold ${
                feedback.isError ? "text-rose-600" : "text-emerald-600"
              }`}
            >
              {feedback.isError ? (
                <AlertCircle className="size-3.5 shrink-0" />
              ) : (
                <Check className="size-3.5 shrink-0" />
              )}
              <span>{feedback.msg}</span>
            </div>
          )}

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={onCloseExpand}
              className="rounded-lg border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Batal
            </button>
            <button
              type="button"
              disabled={isSaving}
              onClick={handleSave}
              className="inline-flex items-center gap-1 rounded-lg bg-slate-900 px-3.5 py-1 text-xs font-semibold text-white transition-colors hover:bg-slate-800 disabled:opacity-50"
            >
              <Save className="size-3" />
              {isSaving ? "Simpan..." : "Simpan"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

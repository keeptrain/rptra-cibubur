"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getOperationLogsAction,
  GetOperationLogsResponse,
} from "../actions/getOperationLogsAction";
import OverrideScheduleModal from "./OverrideScheduleModal";
import { History, ChevronLeft, ChevronRight, PlusIcon, X } from "lucide-react";

interface OperationLogsHistoryTableProps {
  refreshTrigger?: number;
}

export default function OperationLogsHistoryTable({
  refreshTrigger = 0,
}: OperationLogsHistoryTableProps) {
  const [data, setData] = useState<GetOperationLogsResponse>({
    logs: [],
    totalCount: 0,
    totalPages: 1,
    currentPage: 1,
  });
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showOverrideForm, setShowOverrideForm] = useState(false);

  const fetchLogs = useCallback(async (p: number) => {
    setIsLoading(true);
    const res = await getOperationLogsAction(p, 10);
    setData(res);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchLogs(page);
  }, [page, refreshTrigger, fetchLogs]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "CLOSED":
        return (
          <span className="rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-bold text-rose-800">
            FULL CLOSED
          </span>
        );
      case "MODIFIED":
        return (
          <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-800">
            CUSTOM HOURS
          </span>
        );
      case "OPEN":
        return (
          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
            FORCE OPEN
          </span>
        );
      default:
        return (
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-800">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-4 border border-slate-200 bg-white p-5 px-6 text-left shadow-xs">
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <History className="size-4.5" />
          <div>
            <h3 className="text-xs font-bold tracking-wider text-slate-900 uppercase">
              RIWAYAT LOG OPERASIONAL (OVERRIDE HISTORY)
            </h3>
            <p className="text-xs font-medium text-slate-500">
              Catatan riwayat penutupan &amp; perubahan jadwal operasional
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowOverrideForm(!showOverrideForm)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-emerald-700"
        >
          {showOverrideForm ? (
            <>
              <X className="size-4" />
              Tutup Form
            </>
          ) : (
            <>
              <PlusIcon className="size-4" />
              Schedule Override
            </>
          )}
        </button>
      </div>

      {/* INLINE OVERRIDE FORM (HIDE / UNHIDE) */}
      <OverrideScheduleModal
        isOpen={showOverrideForm}
        onClose={() => setShowOverrideForm(false)}
        onSuccess={() => {
          fetchLogs(1);
          setPage(1);
        }}
      />

      {/* TABLE LIST */}
      {data.logs.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/60 p-6 text-center">
          <p className="text-xs font-semibold text-slate-500">
            Belum ada riwayat catatan log operasional.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-500 uppercase">
                <th className="px-3 py-2.5">Tanggal Target</th>
                <th className="px-3 py-2.5">Mode Status</th>
                <th className="px-3 py-2.5">Jam Khusus</th>
                <th className="px-3 py-2.5">Catatan Pengumuman</th>
                <th className="px-3 py-2.5">Waktu Dibuat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/70">
                  <td className="px-3 py-3 font-bold whitespace-nowrap text-slate-900">
                    {log.override_date}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    {getStatusBadge(log.status)}
                  </td>
                  <td className="px-3 py-3 font-medium whitespace-nowrap text-slate-700">
                    {log.status === "MODIFIED" &&
                    log.custom_open_time &&
                    log.custom_close_time
                      ? `${log.custom_open_time.slice(0, 5)} - ${log.custom_close_time.slice(0, 5)} WIB`
                      : "-"}
                  </td>
                  <td className="px-3 py-3 font-medium text-slate-600">
                    {log.reason_notice || "-"}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-slate-400">
                    {new Date(log.created_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* PAGINATION FOOTER */}
      {data.totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
          <span className="font-semibold text-slate-500">
            Halaman {data.currentPage} dari {data.totalPages} ({data.totalCount}{" "}
            data)
          </span>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={page <= 1 || isLoading}
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40"
            >
              <ChevronLeft className="size-3.5" />
              Sebelumnya
            </button>

            <button
              type="button"
              disabled={page >= data.totalPages || isLoading}
              onClick={() =>
                setPage((prev) => Math.min(data.totalPages, prev + 1))
              }
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40"
            >
              Selanjutnya
              <ChevronRight className="size-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

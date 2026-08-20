"use client";

import { useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, Clock, Trash2, Edit } from "lucide-react";
import { toggleAgendaStatusAction } from "../actions/toggleAgendaStatusAction";
import { deleteAgendaAction } from "../actions/deleteAgendaAction";

interface DetailAgendaActionsProps {
  id: string;
  status: "UPCOMING" | "COMPLETED";
}

export default function DetailAgendaActions({
  id,
  status,
}: DetailAgendaActionsProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleToggleStatus = () => {
    const nextStatus = status === "COMPLETED" ? "UPCOMING" : "COMPLETED";
    startTransition(async () => {
      await toggleAgendaStatusAction(id, nextStatus);
    });
  };

  const handleDelete = () => {
    if (!confirm("Apakah Anda yakin ingin menghapus agenda kegiatan ini?")) {
      return;
    }

    startTransition(async () => {
      const res = await deleteAgendaAction(id);
      if (res?.success) {
        router.push("/manajemen-agenda");
      }
    });
  };

  const isCompleted = status === "COMPLETED";

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      {/* TOGGLE STATUS BUTTON */}
      <button
        type="button"
        disabled={isPending}
        onClick={handleToggleStatus}
        className={`flex cursor-pointer items-center gap-1.5 px-4 py-2 text-xs font-semibold shadow-2xs transition-colors disabled:opacity-50 ${
          isCompleted
            ? "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            : "bg-emerald-600 text-white hover:bg-emerald-700"
        }`}
      >
        {isCompleted ? (
          <>
            <Clock className="size-4" />
            <span>Tandai Sebagai Akan Datang</span>
          </>
        ) : (
          <>
            <CheckCircle2 className="size-4" />
            <span>Tandai Selesai / Terlaksana</span>
          </>
        )}
      </button>

      {/* EDIT & DELETE BUTTON GROUP */}
      <div className="flex items-center gap-2">
        <Link
          href={`/manajemen-agenda/form?id=${id}`}
          className="flex items-center gap-1.5 border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs transition-colors hover:bg-slate-50"
        >
          <Edit className="size-4 text-slate-500" />
          <span>Edit</span>
        </Link>

        <button
          type="button"
          disabled={isPending}
          onClick={handleDelete}
          className="flex cursor-pointer items-center gap-1.5 border border-rose-200 bg-rose-50 px-3.5 py-2 text-xs font-semibold text-rose-700 shadow-2xs transition-colors hover:bg-rose-100 disabled:opacity-50"
        >
          <Trash2 className="size-4 text-rose-600" />
          <span>Hapus</span>
        </button>
      </div>
    </div>
  );
}

"use client";

import { useActionState } from "react";
import PageHeader from "@/components/shared/PageHeader";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  FileText,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import { createAgendaAction, ActionResult } from "./actions/createAgendaAction";

export default function CreateAgendaPage() {
  const [state, formAction, isPending] = useActionState<ActionResult | null, FormData>(
    createAgendaAction,
    null
  );

  const isSuccess = state?.success === true;
  const errorList = state?.errors || [];

  return (
    <main className="flex-1">
      <div className="mx-auto min-h-screen max-w-4xl">
        {/* SHARED REUSABLE PAGE HEADER */}
        <PageHeader
          backHref="/manajemen-agenda"
          title="Tambah Agenda Kegiatan Baru"
          description="Isi rincian informasi agenda publik RPTRA yang akan datang"
        />

        <div className="p-4">
          {/* CARD CONTAINER (NO ROUNDED CORNERS) */}
          <div className="border border-slate-200 bg-white p-6 text-left shadow-2xs">
            {/* SUCCESS NOTIFICATION BANNER */}
            {isSuccess ? (
              <div className="mb-5 flex items-center justify-between border border-emerald-200 bg-emerald-50 p-4 text-xs font-semibold text-emerald-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                  <span>{state?.message || "Agenda kegiatan baru berhasil disimpan!"}</span>
                </div>
                <Link
                  href="/manajemen-agenda"
                  className="bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-700"
                >
                  Lihat Daftar Agenda
                </Link>
              </div>
            ) : null}

            {/* CONSOLIDATED VALIBOT ERROR LIST BANNER AT TOP OF FORM */}
            {errorList.length > 0 ? (
              <div className="mb-5 border border-rose-200 bg-rose-50/80 p-4 text-left">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="size-4 text-rose-600 shrink-0" />
                  <h4 className="text-xs font-bold text-rose-900 uppercase tracking-wider">
                    Terdapat kesalahan masukan formulir ({errorList.length})
                  </h4>
                </div>
                <ul className="list-disc list-inside space-y-1 text-xs font-medium text-rose-800 pl-1">
                  {errorList.map((err, idx) => (
                    <li key={idx}>{err}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            <form action={formAction} className="space-y-5">
              {/* TITLE */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Judul Kegiatan / Acara <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="Contoh: Senam Sehat Lansia & Posyandu Balita"
                  defaultValue=""
                  className="w-full border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs font-medium text-slate-900 outline-none transition-colors focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              {/* DATE & TIME GRID */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {/* EVENT DATE */}
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                    <Calendar className="size-3.5 text-slate-500" />
                    <span>Tanggal Pelaksanaan</span>
                  </label>
                  <input
                    type="date"
                    name="eventDate"
                    required
                    defaultValue={new Date().toISOString().split("T")[0]}
                    className="w-full border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs font-medium text-slate-900 outline-none focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                {/* START TIME */}
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                    <Clock className="size-3.5 text-slate-500" />
                    <span>Jam Mulai (WIB)</span>
                  </label>
                  <input
                    type="text"
                    name="startTime"
                    maxLength={5}
                    required
                    placeholder="08:00"
                    defaultValue="08:00"
                    className="w-full border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs font-medium text-slate-900 outline-none focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                {/* END TIME */}
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                    <Clock className="size-3.5 text-slate-500" />
                    <span>Jam Selesai (WIB)</span>
                  </label>
                  <input
                    type="text"
                    name="endTime"
                    maxLength={5}
                    required
                    placeholder="11:00"
                    defaultValue="11:00"
                    className="w-full border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs font-medium text-slate-900 outline-none focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* LOCATION & ORGANIZER GRID */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* LOCATION */}
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                    <MapPin className="size-3.5 text-slate-500" />
                    <span>Lokasi / Area RPTRA</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    required
                    placeholder="Contoh: Aula Utama RPTRA / Lapangan Futsal"
                    defaultValue="Aula Utama RPTRA"
                    className="w-full border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs font-medium text-slate-900 outline-none focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                {/* ORGANIZER */}
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                    <User className="size-3.5 text-slate-500" />
                    <span>Penyelenggara / Pengisi Acara</span>
                  </label>
                  <input
                    type="text"
                    name="organizer"
                    required
                    placeholder="Contoh: Pengelola RPTRA / PKK Kelurahan"
                    defaultValue="Pengelola RPTRA"
                    className="w-full border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs font-medium text-slate-900 outline-none focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* DESCRIPTION TEXTAREA */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                  <FileText className="size-3.5 text-slate-500" />
                  <span>Deskripsi & Rincian Informasi Kegiatan</span>
                </label>
                <textarea
                  name="description"
                  rows={5}
                  placeholder="Tuliskan rincian kegiatan, syarat pendaftaran, atau perlengkapan yang perlu dibawa warga..."
                  defaultValue=""
                  className="w-full border border-slate-200 bg-slate-50/50 p-3.5 text-xs font-medium text-slate-900 outline-none focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              {/* SUBMIT BUTTONS */}
              <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
                <Link
                  href="/manajemen-agenda"
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Batal
                </Link>
                <button
                  type="submit"
                  disabled={isPending}
                  className="bg-emerald-600 px-6 py-2.5 text-xs font-semibold text-white shadow-2xs transition-colors hover:bg-emerald-700 disabled:opacity-50"
                >
                  {isPending ? "Menyimpan Agenda..." : "Simpan Agenda Kegiatan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

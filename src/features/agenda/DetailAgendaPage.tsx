"use client";

import { useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/shared/PageHeader";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  CheckCircle2,
  Share2,
  Trash2,
  Edit,
  ArrowLeft,
  FileText,
  Building2,
  Info,
} from "lucide-react";

interface DetailAgendaPageProps {
  params?: { id?: string };
}

export default function DetailAgendaPage({ params }: DetailAgendaPageProps) {
  const agendaId = params?.id || "ag-01";
  const [isCompleted, setIsCompleted] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  // Sample agenda details data
  const agenda = {
    id: agendaId,
    title: "Senam Sehat Lansia & Pemeriksaan Kesehatan Gratis",
    eventDate: "2026-08-20",
    startTime: "06:30",
    endTime: "08:30",
    location: "Lapangan Serbaguna RPTRA Cibubur",
    organizer: "Puskesmas & Kader PKK Kelurahan Cibubur",
    targetAudience: "Warga Lansia & Pra-Lansia Cibubur",
    contactPerson: "0812-3456-7890 (Ibu Siti)",
    bannerUrl:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80",
    description: `Kegiatan rutin Senam Kebugaran Lansia bersama instruktur profesional RPTRA Cibubur.

Setelah senam bersama, peserta dapat mengikuti pemeriksaan kesehatan gratis meliputi:
• Cek Tekanan Darah (Tensi)
• Cek Gula Darah Sewaktu
• Konsultasi Gizi & Kesehatan Lansia

Dihimbau peserta membawa botol minum sendiri dan mengenakan pakaian olahraga yang nyaman.`,
  };

  if (isDeleted) {
    return (
      <main className="flex-1">
        <div className="mx-auto min-h-screen max-w-4xl p-6 text-center">
          <div className="border border-dashed border-slate-200 bg-slate-50 p-8">
            <p className="text-sm font-semibold text-slate-600 mb-4">
              Agenda kegiatan telah berhasil dihapus.
            </p>
            <Link
              href="/manajemen-agenda"
              className="inline-flex items-center gap-1.5 bg-emerald-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-emerald-700"
            >
              <ArrowLeft className="size-4" />
              Kembali ke Manajemen Agenda
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1">
      <div className="mx-auto min-h-screen max-w-4xl">
        {/* SHARED REUSABLE PAGE HEADER */}
        <PageHeader
          backHref="/manajemen-agenda"
          title="Detail Agenda Kegiatan"
          description="Informasi rincian acara dan status pelaksanaan kegiatan RPTRA"
        />

        <div className="p-4 space-y-5">
          {/* MAIN CONTAINER CARD (NO ROUNDED) */}
          <div className="border border-slate-200 bg-white text-left shadow-2xs">
            {/* HERO BANNER IMAGE */}
            <div className="relative aspect-21/9 w-full overflow-hidden bg-slate-100 border-b border-slate-200">
              <img
                src={agenda.bannerUrl}
                alt={agenda.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              
              {/* BADGE ON BANNER */}
              <div className="absolute bottom-3 left-4 flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-bold ${
                    isCompleted
                      ? "bg-sky-500 text-white"
                      : "bg-amber-500 text-white"
                  }`}
                >
                  {isCompleted ? (
                    <>
                      <CheckCircle2 className="size-3.5" />
                      Terlaksana
                    </>
                  ) : (
                    <>
                      <Clock className="size-3.5" />
                      Akan Datang
                    </>
                  )}
                </span>
              </div>
            </div>

            {/* CARD CONTENT BODY */}
            <div className="p-5 space-y-6">
              {/* TITLE & DATE TIME HEADER */}
              <div className="space-y-3 border-b border-slate-100 pb-4">
                <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-700">
                  <span className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-1 border border-emerald-200">
                    <Calendar className="size-4 text-emerald-600" />
                    {new Date(agenda.eventDate).toLocaleDateString("id-ID", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>

                  <span className="flex items-center gap-1.5 text-slate-700 bg-slate-100 px-2.5 py-1 border border-slate-200">
                    <Clock className="size-4 text-slate-500" />
                    {agenda.startTime} - {agenda.endTime} WIB
                  </span>
                </div>

                <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
                  {agenda.title}
                </h1>
              </div>

              {/* META INFO GRID */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 bg-slate-50/60 p-4 border border-slate-200/80">
                {/* LOCATION */}
                <div className="flex items-start gap-2.5">
                  <div className="flex size-8 shrink-0 items-center justify-center bg-white border border-slate-200 text-slate-600">
                    <MapPin className="size-4 text-emerald-600" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase text-slate-400">
                      Lokasi / Area
                    </span>
                    <p className="text-xs font-bold text-slate-800">
                      {agenda.location}
                    </p>
                  </div>
                </div>

                {/* ORGANIZER */}
                <div className="flex items-start gap-2.5">
                  <div className="flex size-8 shrink-0 items-center justify-center bg-white border border-slate-200 text-slate-600">
                    <User className="size-4 text-sky-600" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase text-slate-400">
                      Penyelenggara
                    </span>
                    <p className="text-xs font-bold text-slate-800">
                      {agenda.organizer}
                    </p>
                  </div>
                </div>

                {/* TARGET AUDIENCE */}
                <div className="flex items-start gap-2.5">
                  <div className="flex size-8 shrink-0 items-center justify-center bg-white border border-slate-200 text-slate-600">
                    <Building2 className="size-4 text-amber-600" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase text-slate-400">
                      Target Peserta
                    </span>
                    <p className="text-xs font-bold text-slate-800">
                      {agenda.targetAudience}
                    </p>
                  </div>
                </div>

                {/* CONTACT PERSON */}
                <div className="flex items-start gap-2.5">
                  <div className="flex size-8 shrink-0 items-center justify-center bg-white border border-slate-200 text-slate-600">
                    <Info className="size-4 text-indigo-600" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase text-slate-400">
                      Kontak Informasi
                    </span>
                    <p className="text-xs font-bold text-slate-800">
                      {agenda.contactPerson}
                    </p>
                  </div>
                </div>
              </div>

              {/* FULL DESCRIPTION SECTION */}
              <div className="space-y-2">
                <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900">
                  <FileText className="size-4 text-slate-500" />
                  Deskripsi & Rincian Kegiatan
                </h3>
                <div className="border border-slate-200 bg-slate-50/50 p-4 text-xs font-medium text-slate-700 leading-relaxed whitespace-pre-line">
                  {agenda.description}
                </div>
              </div>

              {/* ACTION BUTTONS FOOTER */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={() => setIsCompleted(!isCompleted)}
                  className={`inline-flex items-center gap-1.5 border px-4 py-2 text-xs font-bold transition-colors ${
                    isCompleted
                      ? "border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100"
                      : "border-emerald-200 bg-emerald-600 text-white hover:bg-emerald-700"
                  }`}
                >
                  <CheckCircle2 className="size-4" />
                  {isCompleted ? "Ubah ke Mendatang" : "Tandai Terlaksana"}
                </button>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/manajemen-agenda/form?edit=${agenda.id}`}
                    className="inline-flex items-center gap-1.5 border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    <Edit className="size-3.5 text-slate-500" />
                    Edit
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      if (confirm("Apakah Anda yakin ingin menghapus agenda kegiatan ini?")) {
                        setIsDeleted(true);
                      }
                    }}
                    className="inline-flex items-center gap-1.5 border border-rose-200 bg-rose-50 px-3.5 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-100"
                  >
                    <Trash2 className="size-3.5" />
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

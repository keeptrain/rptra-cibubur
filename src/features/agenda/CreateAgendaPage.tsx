"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/shared/PageHeader";
import { Calendar, Clock, MapPin, User, FileText, CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateAgendaPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    eventDate: new Date().toISOString().split("T")[0],
    startTime: "08:00",
    endTime: "11:00",
    location: "Aula Utama RPTRA",
    organizer: "Pengelola RPTRA",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage(null);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    setIsSubmitting(false);
    setSuccessMessage("Agenda kegiatan baru berhasil disimpan!");

    setTimeout(() => {
      router.push("/manajemen-agenda");
    }, 1200);
  };

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
            {/* SUCCESS NOTIFICATION */}
            {successMessage ? (
              <div className="mb-4 flex items-center gap-2 border border-emerald-200 bg-emerald-50 p-3.5 text-xs font-semibold text-emerald-800">
                <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                <span>{successMessage}</span>
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* TITLE */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Judul Kegiatan / Acara <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Senam Sehat Lansia & Posyandu Balita"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                    required
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
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
                    maxLength={5}
                    required
                    placeholder="08:00"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
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
                    maxLength={5}
                    required
                    placeholder="11:00"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
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
                    required
                    placeholder="Contoh: Aula Utama RPTRA / Lapangan Futsal"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
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
                    placeholder="Contoh: Pengelola RPTRA / PKK Kelurahan"
                    value={formData.organizer}
                    onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
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
                  rows={5}
                  placeholder="Tuliskan rincian kegiatan, syarat pendaftaran, atau perlengkapan yang perlu dibawa warga..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                  disabled={isSubmitting}
                  className="bg-emerald-600 px-6 py-2.5 text-xs font-semibold text-white shadow-2xs transition-colors hover:bg-emerald-700 disabled:opacity-50"
                >
                  {isSubmitting ? "Menyimpan Agenda..." : "Simpan Agenda Kegiatan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

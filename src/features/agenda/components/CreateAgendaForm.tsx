"use client";

import { useState } from "react";
import { PlusIcon, X, Calendar, Clock, MapPin, User, FileText, CheckCircle2 } from "lucide-react";

interface CreateAgendaFormProps {
  onSuccess?: () => void;
}

export default function CreateAgendaForm({ onSuccess }: CreateAgendaFormProps) {
  const [isOpen, setIsOpen] = useState(false);
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
    setSuccessMessage("Agenda kegiatan baru berhasil ditambahkan!");
    
    // Reset form fields
    setFormData({
      title: "",
      eventDate: new Date().toISOString().split("T")[0],
      startTime: "08:00",
      endTime: "11:00",
      location: "Aula Utama RPTRA",
      organizer: "Pengelola RPTRA",
      description: "",
    });

    if (onSuccess) onSuccess();

    setTimeout(() => {
      setSuccessMessage(null);
      setIsOpen(false);
    }, 1500);
  };

  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-2xs">
      {/* HEADER WITH TOGGLE BUTTON */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-slate-900">
            Tambah Agenda Kegiatan Baru
          </h3>
          <p className="text-xs font-medium text-slate-500">
            Publikasikan jadwal acara atau kegiatan publik RPTRA untuk warga
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-semibold text-white shadow-2xs transition-colors hover:bg-emerald-700"
        >
          {isOpen ? (
            <>
              <X className="size-4" />
              Tutup Form
            </>
          ) : (
            <>
              <PlusIcon className="size-4" />
              Buat Agenda
            </>
          )}
        </button>
      </div>

      {/* SUCCESS NOTIFICATION */}
      {successMessage ? (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs font-semibold text-emerald-800">
          <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      ) : null}

      {/* FORM BODY */}
      {isOpen ? (
        <form onSubmit={handleSubmit} className="space-y-4 border-t border-slate-100 pt-4">
          {/* TITLE */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">
              Judul Kegiatan <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Senam Sehat Lansia & Posyandu"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs font-medium text-slate-900 outline-none transition-colors focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          {/* DATE & TIME GRID */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {/* EVENT DATE */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1 text-xs font-bold text-slate-700">
                <Calendar className="size-3.5 text-slate-500" />
                <span>Tanggal Acara</span>
              </label>
              <input
                type="date"
                required
                value={formData.eventDate}
                onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs font-medium text-slate-900 outline-none focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            {/* START TIME */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1 text-xs font-bold text-slate-700">
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
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs font-medium text-slate-900 outline-none focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            {/* END TIME */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1 text-xs font-bold text-slate-700">
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
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs font-medium text-slate-900 outline-none focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* LOCATION & ORGANIZER GRID */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {/* LOCATION */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1 text-xs font-bold text-slate-700">
                <MapPin className="size-3.5 text-slate-500" />
                <span>Lokasi / Area RPTRA</span>
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Aula Utama RPTRA / Lapangan Futsal"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs font-medium text-slate-900 outline-none focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            {/* ORGANIZER */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1 text-xs font-bold text-slate-700">
                <User className="size-3.5 text-slate-500" />
                <span>Penyelenggara / Pengisi Acara</span>
              </label>
              <input
                type="text"
                placeholder="Contoh: PKK Kelurahan / Karang Taruna"
                value={formData.organizer}
                onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs font-medium text-slate-900 outline-none focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* DESCRIPTION TEXTAREA */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1 text-xs font-bold text-slate-700">
              <FileText className="size-3.5 text-slate-500" />
              <span>Deskripsi & Rincian Kegiatan</span>
            </label>
            <textarea
              rows={3}
              placeholder="Tuliskan rincian kegiatan, syarat pendaftaran, atau barang yang perlu dibawa warga..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-xs font-medium text-slate-900 outline-none focus:border-emerald-500 focus:bg-white focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          {/* SUBMIT BUTTON */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-emerald-600 px-5 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-emerald-700 disabled:opacity-50"
            >
              {isSubmitting ? "Menyimpan..." : "Simpan Agenda"}
            </button>
          </div>
        </form>
      ) : null}
    </div>
  );
}

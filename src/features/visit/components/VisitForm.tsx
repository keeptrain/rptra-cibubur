"use client";

import { useState } from "react";
import {
  Calendar,
  User,
  Mail,
  Phone,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  FileText,
} from "lucide-react";
import Link from "next/link";

export default function VisitForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    purposeNotes: "",
  });

  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Validate Gmail Domain
  const handleEmailChange = (val: string) => {
    setFormData((prev) => ({ ...prev, email: val }));
    if (val && !/^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(val.trim())) {
      setEmailError("Saat ini hanya menerima email berdomain @gmail.com");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailError || !formData.email) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 600);
  };

  if (isSubmitted) {
    return (
      <div className="rounded-3xl border border-emerald-200/80 bg-white p-6 shadow-xl shadow-emerald-950/5 sm:p-10">
        <div className="space-y-6 text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle2 className="size-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-black tracking-widest text-emerald-700 uppercase">
              Pengajuan Berhasil Dikirim
            </span>
            <h2 className="text-2xl font-black text-emerald-950 uppercase sm:text-3xl">
              TANDA TERIMA KUNJUNGAN
            </h2>
            <p className="text-xs font-medium text-emerald-800/80 sm:text-sm">
              Bukti pendaftaran telah dikirim ke{" "}
              <strong className="text-emerald-950">{formData.email}</strong>
            </p>
          </div>

          {/* E-Ticket Card Summary */}
          <div className="space-y-3 rounded-2xl border border-emerald-200/80 bg-[#F4FBF7] p-5 text-left text-xs text-emerald-950">
            <div className="flex items-center justify-between border-b border-emerald-200/60 pb-3">
              <span className="font-bold text-emerald-800/70">PEMOHON</span>
              <span className="font-extrabold uppercase">{formData.name}</span>
            </div>
            <div className="flex items-center justify-between border-b border-emerald-200/60 pb-3">
              <span className="font-bold text-emerald-800/70">WHATSAPP</span>
              <span className="font-extrabold">{formData.phone}</span>
            </div>
            <div className="flex items-center justify-between border-b border-emerald-200/60 pb-3">
              <span className="font-bold text-emerald-800/70">TANGGAL</span>
              <span className="font-extrabold">{formData.date}</span>
            </div>
            {formData.purposeNotes && (
              <div className="space-y-1 border-b border-emerald-200/60 pb-3">
                <span className="block font-bold text-emerald-800/70">
                  TUJUAN / CATATAN
                </span>
                <p className="leading-relaxed font-medium text-emerald-900">
                  {formData.purposeNotes}
                </p>
              </div>
            )}
            <div className="flex items-center justify-between pt-1">
              <span className="font-bold text-emerald-800/70">BIAYA</span>
              <span className="font-black text-emerald-600 uppercase">
                100% GRATIS
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={`https://wa.me/6281234567890?text=${encodeURIComponent(
                `Halo Pengelola RPTRA Cibubur, saya ${formData.name} ingin konfirmasi rencana kunjungan pada ${formData.date}.`,
              )}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3.5 text-xs font-black text-white uppercase shadow-md transition-all hover:bg-emerald-700"
            >
              KONFIRMASI WHATSAPP
              <ArrowRight className="size-4" />
            </a>

            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl border border-emerald-300 bg-emerald-50 px-6 py-3.5 text-xs font-bold text-emerald-950 uppercase transition-all hover:bg-emerald-100"
            >
              KEMBALI KE BERANDA
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-3xl border border-emerald-200/80 bg-white p-6 shadow-xl shadow-emerald-950/5 sm:p-10"
    >
      <div className="space-y-1 border-b border-emerald-100 pb-4 text-left">
        <h3 className="text-lg font-black text-emerald-950 uppercase sm:text-xl">
          FORMULIR RENCANA KUNJUNGAN
        </h3>
        <p className="text-xs font-medium text-emerald-800/80">
          Isi data kunjungan di bawah ini. Bebas biaya &amp; konfirmasi langsung
          via WhatsApp.
        </p>
      </div>

      <div className="space-y-5 text-left">
        {/* 1. Nama Pemohon */}
        <div className="space-y-2">
          <label className="block text-xs font-black tracking-wider text-emerald-950 uppercase">
            Nama Lengkap Pemohon *
          </label>
          <div className="relative">
            <User className="absolute top-3.5 left-3.5 size-4 text-emerald-600" />
            <input
              type="text"
              required
              placeholder="Contoh: Ibu Ani Wijaya"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full rounded-xl border border-emerald-200 bg-[#F4FBF7] py-3 pr-4 pl-10 text-xs font-semibold text-emerald-950 placeholder-emerald-800/40 transition-all outline-none focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20"
            />
          </div>
        </div>

        {/* 2 & 3. Email & WhatsApp (2 Columns) */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* Email (@gmail.com) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-black tracking-wider text-emerald-950 uppercase">
                Email (@gmail.com) *
              </label>
              <span className="text-[10px] font-bold text-emerald-600 uppercase">
                Khusus Gmail
              </span>
            </div>
            <div className="relative">
              <Mail className="absolute top-3.5 left-3.5 size-4 text-emerald-600" />
              <input
                type="email"
                required
                placeholder="nama@gmail.com"
                value={formData.email}
                onChange={(e) => handleEmailChange(e.target.value)}
                className={`w-full rounded-xl border ${
                  emailError
                    ? "border-rose-400 bg-rose-50/50"
                    : "border-emerald-200 bg-[#F4FBF7]"
                } py-3 pr-4 pl-10 text-xs font-semibold text-emerald-950 placeholder-emerald-800/40 transition-all outline-none focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20`}
              />
            </div>
            {emailError && (
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-600">
                <AlertCircle className="size-3.5 shrink-0" />
                <span>{emailError}</span>
              </div>
            )}
          </div>

          {/* WhatsApp */}
          <div className="space-y-2">
            <label className="block text-xs font-black tracking-wider text-emerald-950 uppercase">
              No. WhatsApp *
            </label>
            <div className="relative">
              <Phone className="absolute top-3.5 left-3.5 size-4 text-emerald-600" />
              <input
                type="tel"
                required
                placeholder="081234567890"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full rounded-xl border border-emerald-200 bg-[#F4FBF7] py-3 pr-4 pl-10 text-xs font-semibold text-emerald-950 placeholder-emerald-800/40 transition-all outline-none focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20"
              />
            </div>
          </div>
        </div>

        {/* 4. Rencana Tanggal Kunjungan */}
        <div className="space-y-2">
          <label className="block text-xs font-black tracking-wider text-emerald-950 uppercase">
            Rencana Tanggal Kunjungan *
          </label>
          <div className="relative">
            <Calendar className="absolute top-3.5 left-3.5 size-4 text-emerald-600" />
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="w-full rounded-xl border border-emerald-200 bg-[#F4FBF7] py-3 pr-4 pl-10 text-xs font-semibold text-emerald-950 transition-all outline-none focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20"
            />
          </div>
        </div>

        {/* 5. Tujuan Kunjungan (Textarea Bebas) */}
        <div className="space-y-2">
          <label className="block text-xs font-black tracking-wider text-emerald-950 uppercase">
            Tujuan Kunjungan / Catatan
          </label>
          <div className="relative">
            <FileText className="absolute top-3.5 left-3.5 size-4 text-emerald-600" />
            <textarea
              rows={3}
              placeholder="Tuliskan instansi, jumlah rombongan, atau keperluan kunjungan Anda di sini (opsional)..."
              value={formData.purposeNotes}
              onChange={(e) =>
                setFormData({ ...formData, purposeNotes: e.target.value })
              }
              className="w-full rounded-xl border border-emerald-200 bg-[#F4FBF7] py-3 pr-4 pl-10 text-xs font-semibold text-emerald-950 placeholder-emerald-800/40 transition-all outline-none focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-600/20"
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isLoading || !!emailError}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-4 text-xs font-black text-white uppercase shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-700 active:scale-[0.99] disabled:opacity-50"
        >
          {isLoading
            ? "MENGIRIM PENGAJUAN..."
            : "KIRIM RENCANA KUNJUNGAN (100% GRATIS)"}
          <ArrowRight className="size-4" />
        </button>
      </div>
    </form>
  );
}

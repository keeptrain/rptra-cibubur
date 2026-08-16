"use client";

import { useState } from "react";
import {
  User,
  LogOut,
  CalendarCheck,
  Clock,
  ShieldCheck,
  PlusCircle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logoutAction } from "@/features/auth/actions/logoutAction";

interface DashboardPageProps {
  userEmail: string;
}

export default function DashboardPage({ userEmail }: DashboardPageProps) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logoutAction();
    router.push("/login");
  };

  return (
    <main className="flex-1 bg-emerald-50 py-8 sm:py-12">
      <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
        {/* DASHBOARD HEADER CARD */}
        <div className="flex flex-col gap-6 rounded-3xl border border-emerald-200/80 bg-white p-6 shadow-xl shadow-emerald-950/5 sm:p-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md">
              <User className="size-7 text-[#A7F3D0]" />
            </div>
            <div className="space-y-1 text-left">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black tracking-widest text-emerald-700 uppercase">
                  PORTAL WARGA
                </span>
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-extrabold text-emerald-800 uppercase">
                  VERIFIED
                </span>
              </div>
              <h1 className="text-xl font-black text-emerald-950 uppercase sm:text-2xl">
                {userEmail}
              </h1>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-5 py-3 text-xs font-black text-rose-700 uppercase transition-all hover:bg-rose-100 disabled:opacity-50"
          >
            <LogOut className="size-4" />
            {isLoggingOut ? "KELUAR..." : "KELUAR AKUN"}
          </button>
        </div>

        {/* STATS & QUICK ACTIONS GRID */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {/* Card 1: Rencana Kunjungan */}
          <div className="flex flex-col justify-between space-y-4 rounded-2xl border border-emerald-200/80 bg-white p-6 text-left shadow-2xs">
            <div className="space-y-2">
              <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <CalendarCheck className="size-5" />
              </div>
              <h3 className="text-base font-black text-emerald-950 uppercase">
                RENCANA KUNJUNGAN
              </h3>
              <p className="text-xs font-medium text-emerald-800/80">
                Daftarkan kunjungan rombongan sekolah / komunitas Anda 100%
                gratis.
              </p>
            </div>
            <Link
              href="/rencana-kunjungan"
              className="inline-flex items-center justify-between rounded-xl bg-emerald-600 px-4 py-3 text-xs font-black text-white uppercase shadow-md transition-all hover:bg-emerald-700"
            >
              <span>BUAT PENGAJUAN</span>
              <PlusCircle className="size-4" />
            </Link>
          </div>

          {/* Card 2: Jam Operasional */}
          <div className="flex flex-col justify-between space-y-4 rounded-2xl border border-emerald-200/80 bg-white p-6 text-left shadow-2xs">
            <div className="space-y-2">
              <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <Clock className="size-5" />
              </div>
              <h3 className="text-base font-black text-emerald-950 uppercase">
                JAM OPERASIONAL
              </h3>
              <p className="text-xs font-medium text-emerald-800/80">
                Buka setiap hari jam 06:00 - 18:00 WIB untuk kegiatan warga.
              </p>
            </div>
            <div className="rounded-xl bg-emerald-50 px-4 py-3 text-xs font-black text-emerald-900 uppercase">
              STATUS: TAMAN BEROPERASI
            </div>
          </div>

          {/* Card 3: Layanan Bebas Biaya */}
          <div className="flex flex-col justify-between space-y-4 rounded-2xl border border-emerald-200/80 bg-white p-6 text-left shadow-2xs">
            <div className="space-y-2">
              <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <ShieldCheck className="size-5" />
              </div>
              <h3 className="text-base font-black text-emerald-950 uppercase">
                100% BEBAS BIAYA
              </h3>
              <p className="text-xs font-medium text-emerald-800/80">
                Seluruh area playground, lapangan, &amp; aula publik bebas
                biaya.
              </p>
            </div>
            <Link
              href="/agenda"
              className="inline-flex items-center justify-between rounded-xl border border-emerald-300 bg-[#F4FBF7] px-4 py-3 text-xs font-black text-emerald-950 uppercase transition-all hover:bg-emerald-100"
            >
              <span>JADWAL AGENDA</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        {/* RECENT VISITS TABLE */}
        <div className="space-y-4 rounded-3xl border border-emerald-200/80 bg-white p-6 text-left shadow-xl shadow-emerald-950/5 sm:p-8">
          <div className="flex items-center justify-between border-b border-emerald-100 pb-4">
            <div>
              <h3 className="text-lg font-black text-emerald-950 uppercase sm:text-xl">
                RIWAYAT PENGAJUAN KUNJUNGAN
              </h3>
              <p className="text-xs font-medium text-emerald-800/80">
                Daftar pengajuan rencana kunjungan rombongan yang pernah Anda
                buat.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-dashed border-emerald-300 bg-[#F4FBF7] p-8 text-center text-xs font-bold text-emerald-800">
            Belum ada riwayat pengajuan kunjungan rombongan. Silakan klik tombol
            di atas untuk membuat pengajuan baru.
          </div>
        </div>
      </div>
    </main>
  );
}

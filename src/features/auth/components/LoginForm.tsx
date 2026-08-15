"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface LoginFormProps {
  initialStep: "email" | "otp";
  initialEmail: string;
}

export default function LoginForm({
  initialStep,
  initialEmail,
}: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState(initialEmail);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Determine step from URL query params (Server Side step determination)
      router.push(`/login?step=otp&email=${encodeURIComponent(email)}`);
    }, 500);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 700);
  };

  const handleBackToEmail = () => {
    router.push(`/login?step=email&email=${encodeURIComponent(email)}`);
  };

  if (isSuccess) {
    return (
      <div className="p-8 text-center border-t-2 border-emerald-950">
        <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full border-2 border-emerald-950 bg-lime-400 text-emerald-950 shadow-[4px_4px_0px_0px_#064e3b]">
          <CheckCircle2 className="size-8" />
        </div>
        <h2 className="text-2xl font-black text-emerald-950 uppercase">
          BERHASIL MASUK!
        </h2>
        <p className="mt-2 text-xs font-semibold text-emerald-800">
          Selamat datang kembali di portal RPTRA Cibubur.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-emerald-950 bg-emerald-600 py-3.5 text-xs font-black uppercase tracking-wider text-white shadow-[4px_4px_0px_0px_#064e3b] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-emerald-700 hover:shadow-none"
          >
            MASUK KE BERANDA
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* STEP INDICATOR TABS (Determined from Server query params) */}
      <div className="grid grid-cols-2 border-y-2 border-emerald-950 text-xs font-black uppercase tracking-wider">
        {/* Tab 1: Email */}
        <button
          type="button"
          onClick={handleBackToEmail}
          className={`border-r-2 border-emerald-950 px-4 py-3 transition-colors ${
            initialStep === "email"
              ? "bg-lime-400 text-emerald-950"
              : "bg-emerald-50/70 text-emerald-800/70 hover:bg-emerald-100/60"
          }`}
        >
          01 / EMAIL
        </button>

        {/* Tab 2: OTP */}
        <button
          type="button"
          onClick={() =>
            email &&
            router.push(`/login?step=otp&email=${encodeURIComponent(email)}`)
          }
          disabled={!email}
          className={`px-4 py-3 transition-colors ${
            initialStep === "otp"
              ? "bg-lime-400 text-emerald-950"
              : "bg-emerald-50/70 text-emerald-800/40 disabled:cursor-not-allowed"
          }`}
        >
          02 / KODE OTP
        </button>
      </div>

      {/* FORM CONTENT BODY */}
      <div className="p-6 sm:p-8">
        {initialStep === "email" ? (
          /* STEP 1: EMAIL FORM */
          <form onSubmit={handleSendOtp} className="space-y-5">
            <div className="space-y-2 text-left">
              <label
                htmlFor="email"
                className="block text-xs font-black uppercase tracking-wider text-emerald-950"
              >
                EMAIL
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="nama@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border-2 border-emerald-950 bg-white px-4 py-3 text-sm font-semibold text-emerald-950 placeholder-emerald-800/40 outline-none transition-shadow focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-emerald-950 bg-emerald-600 py-3.5 text-xs font-black uppercase tracking-wider text-white shadow-[4px_4px_0px_0px_#064e3b] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-emerald-700 hover:shadow-none active:translate-x-1 active:translate-y-1 active:shadow-none disabled:opacity-75"
            >
              {isLoading ? "MENGIRIM KODE..." : "KIRIM KODE OTP"}
              <ArrowRight className="size-4" />
            </button>
          </form>
        ) : (
          /* STEP 2: OTP FORM */
          <form onSubmit={handleVerifyOtp} className="space-y-5">
            <div className="space-y-2 text-left">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="otp"
                  className="block text-xs font-black uppercase tracking-wider text-emerald-950"
                >
                  KODE OTP
                </label>
                <button
                  type="button"
                  onClick={handleBackToEmail}
                  className="text-[11px] font-bold text-emerald-700 underline hover:text-emerald-950"
                >
                  Ubah Email
                </button>
              </div>
              <input
                id="otp"
                type="text"
                required
                maxLength={6}
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full text-center tracking-widest rounded-xl border-2 border-emerald-950 bg-white px-4 py-3 text-base font-black text-emerald-950 placeholder-emerald-800/40 outline-none transition-shadow focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600"
              />
              <p className="pt-1 text-center text-[11px] font-medium text-emerald-800/80">
                Kode 6-digit dikirimkan ke{" "}
                <strong className="text-emerald-950">{email}</strong>
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-emerald-950 bg-emerald-600 py-3.5 text-xs font-black uppercase tracking-wider text-white shadow-[4px_4px_0px_0px_#064e3b] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-emerald-700 hover:shadow-none active:translate-x-1 active:translate-y-1 active:shadow-none disabled:opacity-75"
            >
              {isLoading ? "MEMVERIFIKASI..." : "VERIFIKASI & MASUK"}
              <ArrowRight className="size-4" />
            </button>
          </form>
        )}
      </div>
    </>
  );
}

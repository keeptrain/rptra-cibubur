"use client";

import { useState, useEffect } from "react";
import { ArrowRight, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { sendOtpAction } from "../actions/login/sendOtpAction";
import { verifyOtpAction } from "../actions/login/verifyOtpAction";

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
  const [errorMessage, setErrorMessage] = useState("");
  const [emailValidationError, setEmailValidationError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  // Cooldown timer effect for resending OTP
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  // Real-time Gmail validation
  const handleEmailChange = (val: string) => {
    setEmail(val);
    setErrorMessage("");
    if (val && !/^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(val.trim())) {
      setEmailValidationError(
        "Saat ini hanya menerima email berdomain @gmail.com",
      );
    } else {
      setEmailValidationError("");
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || emailValidationError) return;

    setIsLoading(true);
    setErrorMessage("");

    const res = await sendOtpAction(email);
    setIsLoading(false);

    if (res.success) {
      setCooldown(60);
      router.push(`/login?step=otp&email=${encodeURIComponent(email.trim())}`);
    } else {
      setErrorMessage(res.error || "Gagal mengirimkan kode OTP.");
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length !== 8) {
      setErrorMessage("Kode OTP harus berupa 8 digit angka.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    const res = await verifyOtpAction(email, otp);
    setIsLoading(false);

    if (res.success) {
      setIsSuccess(true);
      setTimeout(() => {
        router.push(res.redirectTo || "/dashboard");
      }, 1000);
    } else {
      setErrorMessage(
        res.error || "Verifikasi gagal. Silakan periksa kembali kode OTP.",
      );
    }
  };

  const handleResendOtp = async () => {
    if (cooldown > 0 || isLoading) return;
    setIsLoading(true);
    setErrorMessage("");

    const res = await sendOtpAction(email);
    setIsLoading(false);

    if (res.success) {
      setCooldown(60);
      setErrorMessage(
        "Kode OTP baru 8-digit berhasil dikirimkan ke email Anda.",
      );
    } else {
      setErrorMessage(res.error || "Gagal mengirimkan ulang kode OTP.");
    }
  };

  const handleBackToEmail = () => {
    setErrorMessage("");
    setOtp("");
    router.push(`/login?step=email&email=${encodeURIComponent(email)}`);
  };

  if (isSuccess) {
    return (
      <div className="border-t-2 border-emerald-950 p-8 text-center">
        <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full border-2 border-emerald-950 bg-[#A7F3D0] text-emerald-950 shadow-[4px_4px_0px_0px_#064e3b]">
          <CheckCircle2 className="size-8" />
        </div>
        <h2 className="text-2xl font-black text-emerald-950 uppercase">
          BERHASIL MASUK!
        </h2>
        <p className="mt-2 text-xs font-semibold text-emerald-800">
          Selamat datang kembali di portal RPTRA Cibubur. Mengalihkan ke
          dashboard...
        </p>
        <div className="mt-6">
          <Link
            href="/dashboard"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-emerald-950 bg-emerald-600 py-3.5 text-xs font-black tracking-wider text-white uppercase shadow-[4px_4px_0px_0px_#064e3b] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-emerald-700 hover:shadow-none"
          >
            MASUK KE DASHBOARD
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* STEP INDICATOR TABS */}
      <div className="grid grid-cols-2 border-y-2 border-emerald-950 text-xs font-black tracking-wider uppercase">
        {/* Tab 1: Email */}
        <button
          type="button"
          onClick={handleBackToEmail}
          className={`border-r-2 border-emerald-950 px-4 py-3 transition-colors ${
            initialStep === "email"
              ? "bg-[#A7F3D0] text-emerald-950"
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
            !emailValidationError &&
            router.push(`/login?step=otp&email=${encodeURIComponent(email)}`)
          }
          disabled={!email || !!emailValidationError}
          className={`px-4 py-3 transition-colors ${
            initialStep === "otp"
              ? "bg-[#A7F3D0] text-emerald-950"
              : "bg-emerald-50/70 text-emerald-800/40 disabled:cursor-not-allowed"
          }`}
        >
          02 / KODE OTP (8 DIGIT)
        </button>
      </div>

      {/* FORM CONTENT BODY */}
      <div className="p-6 sm:p-8">
        {/* Error Alert Message Box */}
        {errorMessage && (
          <div
            className={`mb-5 flex items-start gap-2.5 rounded-xl border-2 border-emerald-950 p-3.5 text-left text-xs font-bold ${
              errorMessage.includes("berhasil")
                ? "bg-[#A7F3D0] text-emerald-950"
                : "bg-rose-100 text-rose-950"
            }`}
          >
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
            <span className="leading-snug">{errorMessage}</span>
          </div>
        )}

        {initialStep === "email" ? (
          /* STEP 1: EMAIL FORM */
          <form onSubmit={handleSendOtp} className="space-y-5">
            <div className="space-y-2 text-left">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="email"
                  className="block text-xs font-black tracking-wider text-emerald-950 uppercase"
                >
                  EMAIL GMAIL *
                </label>
                <span className="text-[10px] font-extrabold text-emerald-700 uppercase">
                  Khusus @gmail.com
                </span>
              </div>
              <input
                id="email"
                type="email"
                required
                placeholder="nama@gmail.com"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                className={`w-full rounded-xl border-2 border-emerald-950 bg-white px-4 py-3 text-sm font-semibold text-emerald-950 placeholder-emerald-800/40 transition-shadow outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600 ${
                  emailValidationError ? "border-rose-500 bg-rose-50/30" : ""
                }`}
              />
              {emailValidationError && (
                <p className="text-[11px] font-extrabold text-rose-600">
                  {emailValidationError}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading || !!emailValidationError || !email}
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-emerald-950 bg-emerald-600 py-3.5 text-xs font-black tracking-wider text-white uppercase shadow-[4px_4px_0px_0px_#064e3b] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-emerald-700 hover:shadow-none active:translate-x-1 active:translate-y-1 active:shadow-none disabled:opacity-50"
            >
              {isLoading ? "MENGIRIM KODE OTP..." : "KIRIM KODE OTP 8-DIGIT"}
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
                  className="block text-xs font-black tracking-wider text-emerald-950 uppercase"
                >
                  KODE OTP 8-DIGIT *
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
                maxLength={8}
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="12345678"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                className="w-full rounded-xl border-2 border-emerald-950 bg-white px-4 py-3 text-center text-lg font-black tracking-widest text-emerald-950 placeholder-emerald-800/40 transition-shadow outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600"
              />
              <p className="pt-1 text-center text-[11px] font-medium text-emerald-800/80">
                Kode 8-digit dikirimkan ke{" "}
                <strong className="text-emerald-950">{email}</strong>
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading || otp.length !== 8}
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-emerald-950 bg-emerald-600 py-3.5 text-xs font-black tracking-wider text-white uppercase shadow-[4px_4px_0px_0px_#064e3b] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-emerald-700 hover:shadow-none active:translate-x-1 active:translate-y-1 active:shadow-none disabled:opacity-50"
            >
              {isLoading ? "MEMVERIFIKASI KODE..." : "VERIFIKASI & MASUK"}
              <ArrowRight className="size-4" />
            </button>

            {/* Resend OTP Button with 60s Cooldown */}
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={cooldown > 0 || isLoading}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 disabled:cursor-not-allowed disabled:text-emerald-800/40"
              >
                <RefreshCw
                  className={`size-3.5 ${isLoading ? "animate-spin" : ""}`}
                />
                {cooldown > 0
                  ? `Kirim Ulang Kode (${cooldown}s)`
                  : "Kirim Ulang Kode OTP"}
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}

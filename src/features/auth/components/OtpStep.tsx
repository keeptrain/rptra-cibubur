"use client";

import { useState, useEffect } from "react";
import { ArrowRight, AlertCircle, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { sendOtpAction } from "../actions/login/sendOtpAction";
import { verifyOtpAction } from "../actions/login/verifyOtpAction";

interface OtpStepProps {
  email: string;
  onBackToEmail: () => void;
}

export default function OtpStep({ email, onBackToEmail }: OtpStepProps) {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [cooldown, setCooldown] = useState(60);

  // Cooldown countdown timer effect
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleVerify = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!otp || otp.length !== 8) {
      setErrorMessage("Kode OTP harus berupa 8 digit angka.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    const res = await verifyOtpAction(email, otp);

    if (res.success) {
      router.push(res.redirectTo || "/dashboard");
    } else {
      setIsLoading(false);
      setErrorMessage(
        res.error || "Verifikasi gagal. Silakan periksa kembali kode OTP.",
      );
    }
  };

  const handleResend = async () => {
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

  return (
    <form onSubmit={handleVerify} className="space-y-5">
      {/* Error / Notification Alert Box */}
      {errorMessage && (
        <div
          className={`flex items-start gap-2.5 rounded-xl border-2 border-emerald-950 p-3.5 text-left text-xs font-bold ${
            errorMessage.includes("berhasil")
              ? "bg-[#A7F3D0] text-emerald-950"
              : "bg-rose-100 text-rose-950"
          }`}
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          <span className="leading-snug">{errorMessage}</span>
        </div>
      )}

      {/* Disabled Email Field with "Ubah Email" Button at top right */}
      <div className="space-y-2 text-left">
        <div className="flex items-center justify-between">
          <label
            htmlFor="disabled-email"
            className="block text-xs font-black tracking-wider text-emerald-950 uppercase"
          >
            EMAIL TUJUAN *
          </label>
          <button
            type="button"
            onClick={onBackToEmail}
            className="text-[11px] font-bold text-emerald-700 underline hover:text-emerald-950"
          >
            Ubah Email
          </button>
        </div>
        <input
          id="disabled-email"
          type="email"
          disabled
          value={email || "nama@gmail.com"}
          className="w-full cursor-not-allowed rounded-xl border-2 border-emerald-950/30 bg-emerald-50/60 px-4 py-3 text-sm font-bold text-emerald-950 opacity-80"
        />
      </div>

      {/* OTP Field */}
      <div className="space-y-2 text-left">
        <label
          htmlFor="otp"
          className="block text-xs font-black tracking-wider text-emerald-950 uppercase"
        >
          KODE OTP 8-DIGIT *
        </label>
        <input
          id="otp"
          type="text"
          required
          maxLength={8}
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="12345678"
          value={otp}
          onChange={(e) => {
            setOtp(e.target.value.replace(/\D/g, ""));
            setErrorMessage("");
          }}
          className="w-full rounded-xl border-2 border-emerald-950 bg-white px-4 py-3 text-center text-lg font-black tracking-widest text-emerald-950 placeholder-emerald-800/40 transition-shadow outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600"
        />
        <p className="pt-1 text-center text-[11px] font-medium text-emerald-800/80">
          Kode 8-digit dikirimkan ke inbox email Anda di atas.
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

      {/* Resend OTP Button with Countdown */}
      <div className="pt-2 text-center">
        <button
          type="button"
          onClick={handleResend}
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
  );
}

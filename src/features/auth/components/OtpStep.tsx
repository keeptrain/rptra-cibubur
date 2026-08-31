"use client";

import { useState, useEffect } from "react";
import { ArrowRight, AlertCircle, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
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
          className={`flex items-start gap-2.5 rounded-xl border p-3.5 text-left text-xs font-medium ${
            errorMessage.includes("berhasil")
              ? "border-lime-200 bg-lime-50 text-lime-800"
              : "border-rose-200 bg-rose-50 text-rose-700"
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
            className="block text-xs font-semibold text-zinc-700"
          >
            Email tujuan <span className="text-rose-500">*</span>
          </label>
          <Button
            type="button"
            variant="link"
            size="sm"
            onClick={onBackToEmail}
            className="h-auto p-0 text-xs"
          >
            Ubah email
          </Button>
        </div>
        <input
          id="disabled-email"
          type="email"
          disabled
          value={email || "nama@gmail.com"}
          className="w-full cursor-not-allowed rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-700"
        />
      </div>

      {/* OTP Field */}
      <div className="space-y-2 text-left">
        <label
          htmlFor="otp"
          className="block text-xs font-semibold text-zinc-700"
        >
          Kode OTP 8-digit <span className="text-rose-500">*</span>
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
          className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-center text-lg font-semibold tracking-widest text-zinc-900 placeholder-zinc-400 outline-none transition-colors focus:border-lime-400 focus:ring-2 focus:ring-lime-200"
        />
        <p className="pt-1 text-center text-xs text-zinc-500">
          Kode 8-digit dikirimkan ke inbox email Anda di atas.
        </p>
      </div>

      <Button
        type="submit"
        disabled={isLoading || otp.length !== 8}
        className="mt-2 w-full gap-2 py-6"
      >
        {isLoading ? "Memverifikasi kode..." : "Verifikasi & masuk"}
        <ArrowRight className="size-4" />
      </Button>

      {/* Resend OTP Button with Countdown */}
      <div className="pt-2 text-center">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleResend}
          disabled={cooldown > 0 || isLoading}
          className="gap-1.5 text-xs"
        >
          <RefreshCw
            className={`size-3.5 ${isLoading ? "animate-spin" : ""}`}
          />
          {cooldown > 0
            ? `Kirim ulang kode (${cooldown}s)`
            : "Kirim ulang kode OTP"}
        </Button>
      </div>
    </form>
  );
}

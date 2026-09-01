"use client";

import { useActionState, useEffect, useState } from "react";
import { ArrowRight, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { loginAction, verifyOtpAction } from "../actions/loginAction";
import { Input } from "@/components/ui/input";
import { REGEXP_ONLY_DIGITS } from "input-otp";

interface OtpStepProps {
  email: string;
  onBackToEmail: () => void;
}

export default function OtpStep({ email, onBackToEmail }: OtpStepProps) {
  const [otp, setOtp] = useState("");
  const [cooldown, setCooldown] = useState(60);
  const [verifyState, verifyFormAction, verifyPending] = useActionState(
    verifyOtpAction,
    null,
  );

  const [resendState, resendFormAction, resendPending] = useActionState(
    async (_prevState: unknown, formData: FormData) => {
      const res = (await loginAction(null, formData)) as {
        success: boolean;
        error?: string;
      };
      if (res?.success) {
        setCooldown(60);
        return {
          success: true,
          error: "Kode OTP 6-digit berhasil dikirim ulang ke email Anda.",
        };
      }
      return res;
    },
    null,
  );

  // Cooldown countdown timer effect
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const errorMessage = verifyState?.error || resendState?.error || "";
  const isLoading = verifyPending || resendPending;

  return (
    <div className="space-y-5">
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
          <label htmlFor="disabled-email" className="text-xs font-semibold">
            Email tujuan
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
        <Input aria-disabled disabled type="email" value={email} />
      </div>

      {/* OTP Field */}
      <form action={verifyFormAction} className="space-y-5">
        <input type="hidden" name="email" value={email} />
        <input type="hidden" name="otp" value={otp} />

        <div className="space-y-2 text-left">
          <label className="block text-xs font-semibold">
            Kode OTP 6-digit <span className="text-rose-500">*</span>
          </label>
          <div className="flex justify-center py-2">
            <InputOTP
              disabled={isLoading}
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS}
              value={otp}
              onChange={(value) => setOtp(value)}
            >
              <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <p className="text-foreground/70 pt-1 text-center text-xs">
            Kode 6-digit dikirimkan ke inbox email Anda. Jika tidak ada di
            inbox, silakan cek folder spam/junk.
          </p>
        </div>

        <Button
          size="lg"
          type="submit"
          disabled={isLoading || otp.length !== 6}
          className="mt-2 w-full gap-2"
        >
          {verifyPending ? "Memverifikasi kode..." : "Verifikasi & masuk"}
          <ArrowRight className="size-4" />
        </Button>
      </form>

      {/* Resend OTP Button with Countdown */}
      <form action={resendFormAction} className="pt-2 text-center">
        <input type="hidden" name="email" value={email} />
        <Button
          type="submit"
          variant="ghost"
          size="sm"
          disabled={cooldown > 0 || isLoading}
          className="gap-1.5 text-xs"
        >
          <RefreshCw
            className={`size-3.5 ${resendPending ? "animate-spin" : ""}`}
          />
          {cooldown > 0
            ? `Kirim ulang kode (${cooldown}s)`
            : "Kirim ulang kode OTP"}
        </Button>
      </form>
    </div>
  );
}

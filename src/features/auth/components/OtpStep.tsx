"use client";

import { useActionState, useEffect, useState } from "react";
import { ArrowRight, RefreshCw, AlertCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { resendOtpAction, verifyOtpAction } from "../actions/loginActions";
import { Input } from "@/components/ui/input";
import TurnstileWidget from "@/components/TurnstileWidget";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface OtpStepProps {
  email: string;
  onBackToEmail: () => void;
}

export default function OtpStep({ email, onBackToEmail }: OtpStepProps) {
  const [globalError, setGlobalError] = useState<string | null>(null);
  const isSuccess = globalError?.includes("berhasil");

  return (
    <div className="space-y-5">
      {globalError && (
        <Alert
          variant={isSuccess ? "default" : "destructive"}
          className="max-w-full"
        >
          <AlertCircleIcon />
          <AlertTitle>
            {isSuccess ? "Berhasil" : "Terjadi kesalahan"}
          </AlertTitle>
          <AlertDescription>{globalError}</AlertDescription>
        </Alert>
      )}

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
        <Input aria-disabled disabled type="email" name="email" value={email} />
      </div>

      <OtpVerifyForm email={email} onError={setGlobalError} />
      <ResendForm email={email} onError={setGlobalError} />
    </div>
  );
}

function OtpVerifyForm({
  email,
  onError,
}: {
  email: string;
  onError: (msg: string | null) => void;
}) {
  const [otp, setOtp] = useState("");
  const [state, formAction, isPending] = useActionState(verifyOtpAction, null);
  const isLoading = isPending;

  useEffect(() => {
    if (state?.error) onError(state.error);
    else if (state?.success) onError(null);
  }, [state, onError]);

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="email" value={email} />
      <div className="space-y-2 text-left">
        <label className="block text-xs font-semibold">
          Kode OTP 6-digit <span className="text-rose-500">*</span>
        </label>
        <div className="flex justify-center py-2">
          <InputOTP
            disabled={isLoading}
            name="otp"
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS}
            value={otp}
            onChange={(v) => setOtp(v)}
            required
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
          Kode 6-digit dikirimkan ke inbox email Anda. Jika tidak ada di inbox,
          silakan cek folder spam/junk.
        </p>
      </div>
      <TurnstileWidget action="verify-otp" resetKey={state?.error} hidden />
      <Button
        size="lg"
        type="submit"
        disabled={isLoading || otp.length !== 6}
        className="mt-2 w-full gap-2"
      >
        {isPending ? "Memverifikasi kode..." : "Verifikasi & masuk"}
        <ArrowRight className="size-4" />
      </Button>
    </form>
  );
}

function ResendForm({
  email,
  onError,
}: {
  email: string;
  onError: (msg: string | null) => void;
}) {
  const [cooldown, setCooldown] = useState(60);
  const [state, formAction, isPending] = useActionState(
    async (_prevState: unknown, formData: FormData) => {
      const res = (await resendOtpAction(null, formData)) as {
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

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  useEffect(() => {
    if (state?.error) onError(state.error);
  }, [state, onError]);

  return (
    <form action={formAction} className="pt-2 text-center">
      <input type="hidden" name="email" value={email} />
      <Button
        type="submit"
        variant="ghost"
        size="sm"
        disabled={cooldown > 0 || isPending}
        className="gap-1.5 text-xs"
      >
        <RefreshCw className={`size-3.5 ${isPending ? "animate-spin" : ""}`} />
        {cooldown > 0
          ? `Kirim ulang kode (${cooldown}s)`
          : "Kirim ulang kode OTP"}
      </Button>
    </form>
  );
}

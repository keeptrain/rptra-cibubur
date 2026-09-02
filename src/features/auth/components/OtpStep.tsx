"use client";

import { useActionState, useEffect, useId, useState } from "react";
import { ArrowRight, RefreshCw, AlertCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { sendOtp, verifyOtpAction } from "../actions/loginActions";
import { Input } from "@/components/ui/input";
import TurnstileWidget from "@/components/TurnstileWidget";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface OtpStepProps {
  email: string;
  onBackToEmail: () => void;
}

async function otpFormAction(_prevState: unknown, formData: FormData) {
  const intent = formData.get("intent");
  if (intent === "resend") {
    formData.set("mode", "resend");
    return sendOtp(_prevState, formData);
  }
  return verifyOtpAction(_prevState, formData);
}

type OtpFormState = {
  success: boolean;
  error?: string;
  message?: string;
  validEmail?: string;
} | null;

export default function OtpStep({ email, onBackToEmail }: OtpStepProps) {
  const id = useId();
  const [state, formAction, isPending] = useActionState<OtpFormState, FormData>(
    otpFormAction,
    null,
  );

  const globalMessage =
    state?.error ||
    (state?.success
      ? state.message === "SUCCESS_RESEND_OTP"
        ? "OTP berhasil dikirim ulang ke email Anda."
        : state.message
      : null);
  const isSuccess = state?.success === true;

  const turnstileResetKey = state?.error ?? state?.message;

  return (
    <div className="space-y-5">
      {globalMessage && (
        <Alert
          variant={isSuccess ? "default" : "destructive"}
          className="max-w-full"
        >
          <AlertCircleIcon />
          <AlertTitle>
            {isSuccess ? "Berhasil" : "Terjadi kesalahan"}
          </AlertTitle>
          <AlertDescription>{globalMessage}</AlertDescription>
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

      <form id={id} action={formAction}>
        <input type="hidden" name="email" value={email} />
        <TurnstileWidget
          hidden
          action="otp-step"
          resetKey={turnstileResetKey}
        />
        <OtpVerifyForm isPending={isPending} />
      </form>

      <ResendButton formId={id} isPending={isPending} state={state} />
    </div>
  );
}

function OtpVerifyForm({ isPending }: { isPending: boolean }) {
  const [otp, setOtp] = useState("");

  return (
    <>
      <div className="space-y-2 text-left">
        <label className="block text-xs font-semibold">
          Kode OTP 6-digit <span className="text-rose-500">*</span>
        </label>
        <div className="flex justify-center py-2">
          <InputOTP
            disabled={isPending}
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
      <Button
        size="lg"
        type="submit"
        disabled={isPending || otp.length !== 6}
        className="mt-2 w-full gap-2"
      >
        {isPending ? "Memverifikasi kode..." : "Verifikasi & masuk"}
        <ArrowRight className="size-4" />
      </Button>
    </>
  );
}

function ResendButton({
  formId,
  isPending,
  state,
}: {
  formId: string;
  isPending: boolean;
  state: OtpFormState;
}) {
  const [cooldown, setCooldown] = useState(0);
  const [lastProcessedState, setLastProcessedState] = useState<unknown>(null);

  // Memicu cooldown hanya saat state berubah DAN bernilai sukses resend (aman dari linter & tanpa efek samping sinkron luar)
  if (state !== lastProcessedState) {
    setLastProcessedState(state);
    if (state?.success && state?.message === "SUCCESS_RESEND_OTP") {
      setCooldown(60);
    }
  }

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  return (
    <div className="pt-2 text-center">
      {/* name/value pada button ikut terkirim di FormData saat button ini yang submit */}
      <Button
        type="submit"
        form={formId}
        formNoValidate
        name="intent"
        value="resend"
        variant="ghost"
        size="sm"
        disabled={cooldown > 0 || isPending}
        className="gap-2 text-xs"
      >
        <RefreshCw className={`size-3.5 ${isPending ? "animate-spin" : ""}`} />
        {cooldown > 0
          ? `Kirim ulang kode (${cooldown}s)`
          : "Kirim ulang kode OTP"}
      </Button>
    </div>
  );
}

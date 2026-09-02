"use client";

import { useActionState, useEffect } from "react";
import { AlertCircleIcon, ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TurnstileWidget from "@/components/TurnstileWidget";
import { sendOtp } from "../actions/loginActions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface EmailStepProps {
  defaultEmail?: string;
  onSuccessNext: (link: string) => void;
}

export default function EmailStep({
  defaultEmail = "",
  onSuccessNext,
}: EmailStepProps) {
  const [state, formAction, isPending] = useActionState(sendOtp, null);

  useEffect(() => {
    if (state?.success && state.validEmail) {
      onSuccessNext(state.validEmail);
    }
  }, [state, onSuccessNext]);

  const errorMessage = state?.error;

  return (
    <form action={formAction} className="space-y-5">
      {/* Error Alert Box */}
      {errorMessage && (
        <Alert variant="destructive" className="max-w-full">
          <AlertCircleIcon />
          <AlertTitle>Terjadi kesalahan</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-xs font-semibold text-zinc-700"
        >
          Email <span className="text-rose-500">*</span>
        </label>

        <Input
          disabled={isPending}
          id="email"
          name="email"
          type="email"
          required
          pattern="[A-Za-z0-9._+\-']+@gmail\.com"
          defaultValue={defaultEmail}
          placeholder="example@gmail.com"
        />
      </div>

      <TurnstileWidget action="login" resetKey={state?.error} />

      <Button
        type="submit"
        size="lg"
        disabled={isPending}
        className="w-full gap-2"
      >
        {isPending ? "Mengirim kode OTP..." : "Kirim kode OTP"}
        <ArrowRightIcon className="size-4" />
      </Button>
    </form>
  );
}

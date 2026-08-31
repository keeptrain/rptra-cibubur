"use client";

import { useActionState, useEffect } from "react";
import { AlertCircleIcon, ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginAction } from "../actions/loginAction";

interface EmailStepProps {
  defaultEmail?: string;
  onSuccessNext: (link: string) => void;
}

export default function EmailStep({
  defaultEmail = "",
  onSuccessNext,
}: EmailStepProps) {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  useEffect(() => {
    if (state?.success && state.validEmail) {
      onSuccessNext(state.validEmail);
    }
  }, [state?.success, state?.validEmail, onSuccessNext]);

  const errorMessage = state?.error;

  return (
    <form action={formAction} className="space-y-5">
      {/* Error Alert Box */}
      {errorMessage && (
        <div className="flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-left text-xs font-medium text-rose-700">
          <AlertCircleIcon className="mt-0.5 size-4 shrink-0" />
          <span className="leading-snug">{errorMessage}</span>
        </div>
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
          defaultValue={defaultEmail}
          pattern="^[a-zA-Z0-9._%+\-]+@gmail\.com$"
          placeholder="example@gmail.com"
        />
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={isPending}
        className="mt-2 w-full gap-2"
      >
        {isPending ? "Mengirim kode OTP..." : "Kirim kode OTP"}
        <ArrowRightIcon className="size-4" />
      </Button>
    </form>
  );
}

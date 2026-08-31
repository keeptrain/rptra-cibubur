"use client";

import { useRef, useState } from "react";
import { AlertCircle, AlertCircleIcon, ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sendOtpAction } from "../actions/login/sendOtpAction";

interface EmailStepProps {
  defaultEmail?: string;
  onSuccessNext: (email: string) => void;
}

export default function EmailStep({
  defaultEmail = "",
  onSuccessNext,
}: EmailStepProps) {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    const emailVal = emailInputRef.current?.value?.trim();
    if (!emailVal) return;

    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(emailVal)) {
      setErrorMessage("Saat ini hanya menerima email berdomain @gmail.com");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    const res = await sendOtpAction(emailVal);
    setIsLoading(false);

    if (res.success) {
      onSuccessNext(emailVal.toLowerCase());
    } else {
      setErrorMessage(res.error || "Gagal mengirimkan kode OTP.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
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
          ref={emailInputRef}
          type="email"
          required
          defaultValue={defaultEmail}
          pattern="^[a-zA-Z0-9._%+-]+@gmail\.com$"
          placeholder="example@gmail.com"
          onChange={() => setErrorMessage("")}
        />
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={isLoading}
        className="mt-2 w-full gap-2"
      >
        {isLoading ? "Mengirim kode OTP..." : "Kirim kode OTP"}
        <ArrowRightIcon className="size-4" />
      </Button>
    </form>
  );
}

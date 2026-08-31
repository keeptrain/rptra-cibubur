"use client";

import { useRef, useState } from "react";
import { ArrowRight, AlertCircle } from "lucide-react";
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
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          <span className="leading-snug">{errorMessage}</span>
        </div>
      )}

      <div className="space-y-2 text-left">
        <label htmlFor="email" className="block text-xs font-semibold text-zinc-700">
          Email <span className="text-rose-500">*</span>
        </label>

        <input
          ref={emailInputRef}
          id="email"
          type="email"
          required
          defaultValue={defaultEmail}
          pattern="^[a-zA-Z0-9._%+-]+@gmail\.com$"
          title="Alamat email harus berdomain @gmail.com (contoh: nama@gmail.com)"
          placeholder="nama@gmail.com"
          onChange={() => setErrorMessage("")}
          className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-900 placeholder-zinc-400 outline-none transition-colors focus:border-lime-400 focus:ring-2 focus:ring-lime-200"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-lime-500 py-3.5 text-sm font-semibold text-zinc-900 shadow-2xs transition-colors hover:bg-lime-600 disabled:opacity-50"
      >
        {isLoading ? "Mengirim kode OTP..." : "Kirim kode OTP"}
        <ArrowRight className="size-4" />
      </button>
    </form>
  );
}

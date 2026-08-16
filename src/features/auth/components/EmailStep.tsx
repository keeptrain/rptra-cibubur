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
        <div className="flex items-start gap-2.5 rounded-xl border-2 border-emerald-950 bg-rose-100 p-3.5 text-left text-xs font-bold text-rose-950">
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          <span className="leading-snug">{errorMessage}</span>
        </div>
      )}

      <div className="space-y-2 text-left">
        <label htmlFor="email" className="block text-xs font-black uppercase">
          Email *
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
          className="w-full rounded-xl border-2 border-emerald-950 bg-white px-4 py-3 text-sm font-semibold text-emerald-950 placeholder-emerald-800/40 transition-shadow outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-emerald-950 bg-emerald-600 py-3.5 text-xs font-black tracking-wider text-white uppercase shadow-[4px_4px_0px_0px_#064e3b] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-emerald-700 hover:shadow-none active:translate-x-1 active:translate-y-1 active:shadow-none disabled:opacity-50"
      >
        {isLoading ? "MENGIRIM KODE OTP..." : "KIRIM KODE OTP"}
        <ArrowRight className="size-4" />
      </button>
    </form>
  );
}

"use client";

import { useState } from "react";
import EmailStep from "./EmailStep";
import OtpStep from "./OtpStep";

export default function LoginForm() {
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");

  const handleEmailSuccessNext = (submittedEmail: string) => {
    setEmail(submittedEmail);
    setStep("otp");
  };

  const handleBackToEmail = () => {
    setStep("email");
  };

  return (
    <>
      {/* STEP INDICATOR TABS */}
      <div className="mx-6 rounded-xl bg-zinc-100 p-1">
        <div className="grid grid-cols-2 gap-1 text-xs font-semibold">
          {/* Tab 1: Email */}
          <button
            type="button"
            onClick={handleBackToEmail}
            disabled={step === "otp"}
            className={`rounded-lg px-4 py-2.5 transition-all ${
              step === "email"
                ? "bg-lime-200 text-zinc-900 shadow-2xs"
                : "text-zinc-500 hover:text-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
            }`}
          >
            01 — Email
          </button>

          {/* Tab 2: OTP */}
          <button
            type="button"
            onClick={() => email && setStep("otp")}
            disabled={!email}
            className={`rounded-lg px-4 py-2.5 transition-all ${
              step === "otp"
                ? "bg-lime-200 text-zinc-900 shadow-2xs"
                : "text-zinc-400 disabled:cursor-not-allowed"
            }`}
          >
            02 — Kode OTP
          </button>
        </div>
      </div>

      {/* FORM STEP CONTENT BODY */}
      <div className="p-6 sm:p-8">
        {step === "email" ? (
          <EmailStep
            defaultEmail={email}
            onSuccessNext={handleEmailSuccessNext}
          />
        ) : (
          <OtpStep email={email} onBackToEmail={handleBackToEmail} />
        )}
      </div>
    </>
  );
}

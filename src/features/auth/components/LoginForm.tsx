"use client";

import { useState } from "react";
import EmailStep from "./EmailStep";
import OtpStep from "./OtpStep";

export default function LoginForm() {
  const [step, setStep] = useState<"email" | "otp">("otp");
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
      <div className="grid grid-cols-2 border-y-2 border-emerald-950 text-xs font-black tracking-wider uppercase">
        {/* Tab 1: Email */}
        <button
          type="button"
          onClick={handleBackToEmail}
          disabled={step === "otp"}
          className={`border-r-2 border-emerald-950 px-4 py-3 transition-colors ${
            step === "email"
              ? "bg-[#A7F3D0] text-emerald-950"
              : "bg-emerald-50/70 text-emerald-800/70 hover:bg-emerald-100/60 disabled:cursor-not-allowed disabled:opacity-50"
          }`}
        >
          01 / EMAIL
        </button>

        {/* Tab 2: OTP */}
        <button
          type="button"
          onClick={() => email && setStep("otp")}
          disabled={!email}
          className={`px-4 py-3 transition-colors ${
            step === "otp"
              ? "bg-[#A7F3D0] text-emerald-950"
              : "bg-emerald-50/70 text-emerald-800/40 disabled:cursor-not-allowed"
          }`}
        >
          02 / KODE OTP
        </button>
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

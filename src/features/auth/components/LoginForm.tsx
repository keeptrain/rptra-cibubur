"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import EmailStep from "./EmailStep";
import OtpStep from "./OtpStep";

export default function LoginForm() {
  const [step, setStep] = useState<"email" | "otp">("otp");
  const [email, setEmail] = useState("remajamesjid1945@gmail.com");

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
      <div className="mx-6 rounded-xl bg-zinc-100 p-1 sm:mx-8">
        <div className="grid grid-cols-2 gap-1">
          {/* Tab 1: Email */}
          <Button
            type="button"
            variant={step === "email" ? "outline" : "ghost"}
            size="sm"
            onClick={handleBackToEmail}
            disabled={step === "otp"}
            className="w-full"
          >
            01 — Email
          </Button>

          {/* Tab 2: OTP */}
          <Button
            type="button"
            variant={step === "otp" ? "outline" : "ghost"}
            size="sm"
            onClick={() => email && setStep("otp")}
            disabled={!email}
            className="w-full"
          >
            02 — Kode OTP
          </Button>
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

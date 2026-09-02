"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import EmailStep from "./EmailStep";
import OtpStep from "./OtpStep";

const isProduction = process.env.NODE_ENV === "production";

export default function LoginForm() {
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState(
    isProduction ? "" : "remajamesjid1945@gmail.com",
  );

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
          <>
            <EmailStep
              defaultEmail={email}
              onSuccessNext={handleEmailSuccessNext}
            />
            {!isProduction && (
              <Button
                variant="outline"
                onClick={() => {
                  setEmail("admin@gmail.com");
                }}
                className="mt-4 w-full"
              >
                Login sebagai admin
              </Button>
            )}
          </>
        ) : (
          <OtpStep email={email} onBackToEmail={handleBackToEmail} />
        )}
      </div>
    </>
  );
}

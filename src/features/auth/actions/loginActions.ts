"use server";

import * as v from "valibot";
import { sendingOtp, verifyOtp } from "./service";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getTurnstileFormData, verifyTurnstile } from "@/lib/turnstile";

const EmailSchema = v.pipe(
  v.string("Email harus diisi dan berupa teks."),
  v.trim(),
  v.nonEmpty("Email tidak boleh kosong."),
  v.email("Format email tidak valid."),
  v.regex(
    /^[a-zA-Z0-9._%+-]+@gmail\.com$/i,
    "Saat ini hanya menerima email dengan domain @gmail.com.",
  ),
  v.maxLength(255, "Email maksimal 255 karakter."),
);

const VerifyOtpSchema = v.object({
  email: EmailSchema,
  otp: v.pipe(
    v.string("Kode OTP harus diisi dan berupa teks."),
    v.trim(),
    v.nonEmpty("Kode OTP tidak boleh kosong."),
    v.regex(/^\d{6}$/, "Kode OTP harus berupa 6 digit angka."),
    v.length(6, "Kode OTP harus 6 digit."),
  ),
});

export async function verifyOtpAction(_prevState: unknown, formData: FormData) {
  // 1. Validation step
  const validationResult = v.safeParse(VerifyOtpSchema, {
    email: formData.get("email"),
    otp: formData.get("otp"),
  });

  if (!validationResult.success) {
    return {
      success: false,
      error: validationResult.issues[0]?.message || "Kode OTP tidak valid.",
    };
  }

  // 2. Turnstile verification step
  const { token, ip: remoteIp } = await getTurnstileFormData(formData);
  const check = await verifyTurnstile({
    token,
    expectedAction: "otp-step",
    remoteIp,
  });
  if (!check.success) {
    return {
      success: false,
      error: "Verifikasi keamanan gagal. Silakan coba lagi.",
    };
  }

  const { email: validEmail, otp } = validationResult.output;

  try {
    const cookieStore = await cookies();
    const result = await verifyOtp({ email: validEmail, otp }, cookieStore);

    if (result === "OTP berhasil diverifikasi.") {
      redirect("/dashboard");
    }

    return {
      success: true,
      message: result,
    };
  } catch (err: unknown) {
    if (err instanceof Error && err.message.includes("NEXT_REDIRECT")) {
      throw err;
    }

    return {
      success: false,
      error:
        err instanceof Error
          ? err.message
          : "Gagal memverifikasi kode OTP. Silakan coba lagi.",
    };
  }
}

const SendOtpSchema = v.object({
  email: EmailSchema,
  mode: v.enum(
    { send: "send", resend: "resend" },
    "Mode harus 'send' atau 'resend'.",
  ),
});

export async function sendOtp(_prevState: unknown, formData: FormData) {
  // 1. Validation step
  const validationResult = v.safeParse(SendOtpSchema, {
    email: formData.get("email"),
    mode: formData.get("mode"),
  });

  if (!validationResult.success) {
    return {
      success: false,
      error: validationResult.issues[0]?.message || "Email tidak valid.",
    };
  }

  const { email: validEmail, mode } = validationResult.output;

  // 2. Turnstile verification step
  const { token, ip: remoteIp } = await getTurnstileFormData(formData);
  const check = await verifyTurnstile({
    token,
    expectedAction: mode === "send" ? "sending-otp" : "otp-step",
    remoteIp,
  });

  if (!check.success) {
    return {
      success: false,
      error: "Verifikasi keamanan gagal. Silakan coba lagi.",
    };
  }

  try {
    const cookieStore =
      validEmail === "admin@gmail.com" ? await cookies() : null;

    const result = await sendingOtp(validEmail, cookieStore);

    // only on development mode, bypass OTP verification
    if (result === "SUCCESS_BYPASS") {
      redirect("/dashboard");
    }

    return {
      success: true,
      validEmail,
      message: mode === "resend" ? "SUCCESS_RESEND_OTP" : undefined,
    };
  } catch (err: unknown) {
    if (err instanceof Error && err.message.includes("NEXT_REDIRECT")) {
      throw err;
    }

    return {
      success: false,
      error:
        err instanceof Error
          ? err.message
          : "Gagal mengirimkan kode OTP ke email. Silakan coba lagi.",
    };
  }
}

export type SendOtpActionReturn = Awaited<ReturnType<typeof sendOtp>>;

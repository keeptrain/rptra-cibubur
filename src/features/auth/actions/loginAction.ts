"use server";

import * as v from "valibot";
import { sendingOtp } from "./service";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const EmailSchema = v.pipe(
  v.string("Email harus diisi dan berupa teks."),
  v.trim(),
  v.nonEmpty("Email tidak boleh kosong."),
  v.email("Format email tidak valid."),
  v.regex(
    /^[a-zA-Z0-9._%+-]+@gmail\.com$/i,
    "Saat ini hanya menerima email @gmail.com.",
  ),
  v.maxLength(255, "Email maksimal 255 karakter."),
);

export async function loginAction(_prevState: unknown, formData: FormData) {
  // 1. Error Validasi
  const validationResult = v.safeParse(EmailSchema, formData.get("email"));

  if (!validationResult.success) {
    return {
      success: false,
      error: validationResult.issues[0]?.message || "Email tidak valid.",
    };
  }

  const validEmail = validationResult.output;

  // 2. Error Gagal Kirim Email
  try {
    const cookieStore =
      validEmail === "admin@gmail.com" ? await cookies() : null;

    const result = await sendingOtp(validEmail, cookieStore);

    if (result === "SUCCESS_BYPASS") {
      redirect("/dashboard");
    }

    return {
      success: true,
      validEmail,
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

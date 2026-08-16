"use server";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { silentLoginUsingMagicLinkAction } from "./silentLoginUsingMagicLinkAction";

export async function verifyOtpAction(email: string, otpInput: string) {
  const trimmedEmail = email.trim().toLowerCase();
  const trimmedOtp = otpInput.trim();

  if (!trimmedEmail || !trimmedOtp || trimmedOtp.length !== 8) {
    return {
      success: false,
      error: "Kode OTP harus berupa 8 digit angka.",
    };
  }

  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);

  try {
    // 1. Call Stored RPC Procedure to verify 8-digit OTP in database
    const { data: res, error: rpcError } = await supabase.rpc(
      "verify_otp_code",
      {
        p_email: trimmedEmail,
        p_otp: trimmedOtp,
      },
    );

    if (rpcError) {
      return {
        success: false,
        error: `Gagal verifikasi OTP (${rpcError.message}).`,
      };
    }

    if (!res?.success) {
      return {
        success: false,
        error: res?.error || "Verifikasi OTP gagal.",
      };
    }

    // 2. OTP Valid: Call server-only silent login to establish Supabase Auth session cookie
    const loginRes = await silentLoginUsingMagicLinkAction(trimmedEmail);

    if (!loginRes.success) {
      return {
        success: false,
        error: loginRes.error || "Gagal membuat sesi login.",
      };
    }

    return {
      success: true,
      redirectTo: "/dashboard",
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Terjadi kesalahan sistem saat verifikasi OTP.",
    };
  }
}

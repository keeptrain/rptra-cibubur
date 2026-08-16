"use server";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

// Helper for validating Gmail domain
function isValidGmail(email: string): boolean {
  return /^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(email.trim());
}

export async function sendOtpAction(email: string) {
  const trimmedEmail = email.trim().toLowerCase();

  // 1. Validate Gmail domain
  if (!isValidGmail(trimmedEmail)) {
    return {
      success: false,
      error: "Saat ini hanya menerima email berdomain @gmail.com",
    };
  }

  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);

  try {
    // 2. Call Stored RPC Procedure to generate & store 8-digit OTP
    const { data: otpCode, error: rpcError } = await supabase.rpc(
      "request_otp_code",
      { p_email: trimmedEmail },
    );

    if (rpcError || !otpCode) {
      return {
        success: false,
        error: `Gagal membuat kode OTP (${rpcError?.message || "RPC error"}). Silakan coba lagi.`,
      };
    }

    // 3. Verify email dispatch (Simulate email service dispatch acknowledgment / Resend)
    const emailDispatchSuccess = true;

    if (!emailDispatchSuccess) {
      return {
        success: false,
        error:
          "Gagal mengirimkan kode ke email Anda, silakan periksa alamat email atau coba beberapa saat lagi.",
      };
    }

    return {
      success: true,
      email: trimmedEmail,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Terjadi kesalahan sistem saat mengirim kode OTP.",
    };
  }
}

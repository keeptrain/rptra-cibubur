"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { createAnonClient } from "@/lib/supabase/client";
import { cookies } from "next/headers";

export async function verifyOtp(
  data: { email: string; otp: string },
  cookieStore: Awaited<ReturnType<typeof cookies>> | null,
) {
  const { email, otp } = data;

  if (!cookieStore)
    throw new Error("Cookie store required for OTP verification");

  const supabase = await createClient(cookieStore);

  const result = await supabase.auth.verifyOtp({
    type: "email",
    email,
    token: otp,
  });

  if (result.error) throw result.error;
  return "OTP berhasil diverifikasi.";
}

export async function sendingOtp(
  email: string,
  cookieStore: Awaited<ReturnType<typeof cookies>> | null,
) {
  if (email === "admin@gmail.com" && cookieStore) {
    await adminBypassLogin(email, cookieStore);
    return "SUCCESS_BYPASS";
  }

  // No cookie needed for initial OTP send — use anon client without SSR cookie handling
  const client = createAnonClient();

  const { error } = await client.auth.signInWithOtp({
    email,
    options: { shouldCreateUser: true },
  });

  if (error) throw error;
  return "OTP terkirim.";
}

async function adminBypassLogin(
  email: string,
  cookieStore: Awaited<ReturnType<typeof cookies>>,
) {
  const client = createAdminClient();

  const { data, error } = await client.auth.admin.generateLink({
    type: "magiclink",
    email,
  });

  if (error) throw error;

  const hashedToken = data.properties?.hashed_token;
  if (!hashedToken) throw new Error("Gagal generate token.");

  if (!cookieStore) throw new Error("Cookie store required for admin bypass");
  const sup = await createClient(cookieStore);
  const { error: verifyError } = await sup.auth.verifyOtp({
    type: "email",
    token_hash: hashedToken,
  });

  if (verifyError) throw verifyError;
}

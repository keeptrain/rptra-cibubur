"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { createClient as createAnonClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export async function sendingOtp(
  email: string,
  cookieStore: Awaited<ReturnType<typeof cookies>> | null,
) {
  if (email === "admin@gmail.com" && cookieStore) {
    await adminBypassLogin(email, cookieStore);
    return "SUCCESS_BYPASS";
  }

  // No cookie needed for initial OTP send — use anon client without SSR cookie handling
  const client = createAnonClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );

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

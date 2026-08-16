import "server-only";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";

export async function silentLoginUsingMagicLinkAction(email: string) {
  const supabaseAdmin = createAdminClient();

  try {
    // 1. Ensure user is created with email_confirm: true (Instant Verification)
    const { error: createError } = await supabaseAdmin.auth.admin.createUser({
      email,
      email_confirm: true,
    });

    // If user already exists in auth.users, update email_confirm to true
    if (createError && createError.message.includes("already registered")) {
      const { data: usersData } = await supabaseAdmin.auth.admin.listUsers();
      const existingUser = usersData?.users?.find(
        (u) => u.email?.toLowerCase() === email,
      );
      if (existingUser && !existingUser.email_confirmed_at) {
        await supabaseAdmin.auth.admin.updateUserById(existingUser.id, {
          email_confirm: true,
        });
      }
    }

    // 2. Generate magiclink token via Admin Client
    const { data: linkData, error: linkError } =
      await supabaseAdmin.auth.admin.generateLink({
        type: "magiclink",
        email: email,
      });

    if (linkError) {
      return {
        success: false,
        error: `Gagal membuat link autentikasi: ${linkError.message}`,
      };
    }

    const token =
      linkData?.properties?.email_otp || linkData?.properties?.hashed_token;

    if (!token) {
      return {
        success: false,
        error: "Properti token tidak ditemukan pada link generator Supabase.",
      };
    }

    const result = await verifyOtpUsingSupabaseSDK(email, token);

    if (!result.success) {
      return {
        success: false,
        error: result.error,
      };
    }

    return { success: true };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Terjadi kesalahan sistem saat membuat sesi login.",
    };
  }
}

async function verifyOtpUsingSupabaseSDK(email: string, token: string) {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);

  // 3. Verify token on server Supabase client to automatically establish session cookies
  const { error: sessionError } = await supabase.auth.verifyOtp({
    email: email,
    token: token,
    type: "magiclink",
  });

  if (sessionError) {
    // Fallback with type: "email"
    const { error: fallbackError } = await supabase.auth.verifyOtp({
      email: email,
      token: token,
      type: "email",
    });

    if (fallbackError) {
      return {
        success: false,
        error: `Gagal menyimpan sesi login: ${sessionError.message}`,
      };
    }
  }

  return { success: true };
}

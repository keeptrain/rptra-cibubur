"use server";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export async function logoutAction() {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);
  await supabase.auth.signOut();
  return { success: true, redirectTo: "/login" };
}

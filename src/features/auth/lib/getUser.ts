import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

/**
 * Cached helper to fetch current authenticated user.
 * Uses React `cache()` to deduplicate calls within a single request tree.
 */
export const getCurrentUser = cache(async () => {
  try {
    const cookieStore = await cookies();
    const supabase = await createClient(cookieStore);
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return null;
    }

    return user;
  } catch (err) {
    return null;
  }
});

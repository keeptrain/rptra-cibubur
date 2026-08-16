import "server-only";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

export const createAdminClient = () => {
  const supabaseRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return createClient(supabaseUrl!, supabaseRoleKey!, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
};

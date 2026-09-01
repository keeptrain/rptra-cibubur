import { createBrowserClient } from "@supabase/ssr";
import { createClient as anonClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const createAnonClient = () => anonClient(supabaseUrl!, supabaseKey!);

export type SupabaseAnonClient = ReturnType<typeof createAnonClient>;

export const createClient = () =>
  createBrowserClient(supabaseUrl!, supabaseKey!);

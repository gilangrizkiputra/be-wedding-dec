import { createClient } from "@supabase/supabase-js";
import { appEnv } from "./env.js";

export const supabase = createClient(
  appEnv.SUPABASE_URL,
  appEnv.SUPABASE_SERVICE_ROLE_KEY
);

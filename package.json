import { createClient } from "@supabase/supabase-js";

// These two values are safe to be public — they're meant to live in
// client-side code. Your actual data stays protected by the Row Level
// Security rules from 01_schema.sql, not by keeping this key secret.
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://iiyuagxdeafkxrtixktr.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "sb_publishable_Pi_xwdcFxTdJZ7qSMYbWcg_-_xSmGNF";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// The one demo team ID seeded by 02_seed.sql
export const DEMO_TEAM_ID = "00000000-0000-0000-0000-000000000001";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://epixlwrqtyxgmskjgypc.supabase.co/";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwaXhsd3JxdHl4Z21za2pneXBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMjUwNjAsImV4cCI6MjA1OTgwMTA2MH0.3siE31ZrMLWqL7_kbPhHp-UrwvRWDIFaGqyoz9l3RuU";

export const supabase = createClient(supabaseUrl, supabaseKey);

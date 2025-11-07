import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dpcdkpodnbtmwamkpqwv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwY2RrcG9kbmJ0bXdhbWtwcXd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3MzEzMzksImV4cCI6MjA3NDMwNzMzOX0.j_d0d6JQVErkG3WuDsCYBvskXRan5qdHUOreSW3_wbw";

export const supabase = createClient(supabaseUrl, supabaseKey);

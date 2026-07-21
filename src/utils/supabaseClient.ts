import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Instantiate Supabase client. Fallback to dummy client if keys are not set yet.
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

if (!supabase) {
  console.warn(
    'Supabase environment variables (VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY) are not set. ' +
    'The portfolio is running in offline/localStorage mode. Configure these keys in a .env file to enable the real database.'
  );
}

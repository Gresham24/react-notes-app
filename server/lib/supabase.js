import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

// Ensure environment variables are defined
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(
  supabaseUrl,
  supabaseKey,
  { auth: { persistSession: false } }
);

export default supabase;
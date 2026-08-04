/* ==========================================================================
   SUPABASE CLIENT CONFIGURATION
   ========================================================================== */

const SUPABASE_URL = 'https://lfuzqcznemwhjsvdpwml.supabase.co';
const SUPABASE_KEY = 'sb_publishable__ek2Ri_yHuAdqgOxlX3E-w_LzBE8wX2';

// Safely initialize Supabase client (file:// and Brave Shields compatible)
var supabaseClient = null;
try {
  if (typeof window !== 'undefined' && window.supabase && typeof window.supabase.createClient === 'function') {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  }
} catch (e) {
  console.warn('Supabase initialization notice:', e);
}


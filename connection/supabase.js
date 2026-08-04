/* ==========================================================================
   SUPABASE CLIENT CONFIGURATION
   ========================================================================== */

const SUPABASE_URL = 'https://lfuzqcznemwhjsvdpwml.supabase.co';
const SUPABASE_KEY = 'sb_publishable__ek2Ri_yHuAdqgOxlX3E-w_LzBE8wX2';

// Initialize Supabase client (supabase-js loaded via CDN in HTML)
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);


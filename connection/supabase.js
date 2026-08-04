import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://lfuzqcznemwhjsvdpwml.supabase.co';
const SUPABASE_KEY = 'sb_publishable__ek2Ri_yHuAdqgOxlX3E-w_LzBE8wX2';

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);


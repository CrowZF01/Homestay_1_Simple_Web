import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://lfuzqcznemwhjsvdpwml.supabase.co'
const supabaseKey = 'sb_publishable__ek2Ri_yHuAdqgOxlX3E-w_LzBE8wX2'

export const supabaseClient = createClient(supabaseUrl, supabaseKey)

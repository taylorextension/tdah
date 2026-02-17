import { createClient } from '@supabase/supabase-js';

let cachedClient = null;

export function getSupabaseClient() {
    if (cachedClient) {
        return cachedClient;
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
        throw new Error('Supabase URL and Service Role Key are required.');
    }

    cachedClient = createClient(supabaseUrl, supabaseKey);
    return cachedClient;
}

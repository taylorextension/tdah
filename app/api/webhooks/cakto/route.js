import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(req) {
    try {
        const payload = await req.json();
        const { secret, event, data } = payload;

        // 1. Validate Secret
        if (secret !== process.env.CAKTO_SECRET) {
            if (process.env.CAKTO_SECRET === 'CHANGE_ME_PLEASE') {
                console.warn('CAKTO_SECRET is not set in env variables. Skipping validation for testing.');
            } else {
                return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
            }
        }

        // 2. Only process 'purchase_approved'
        if (event !== 'purchase_approved') {
            return NextResponse.json({ message: 'Event ignored' });
        }

        // 3. Extract Data
        const { id: purchase_id, customer, product } = data;
        const email = customer.email;
        const product_id = product?.id || 'unknown';

        // 4. Save to Database (Upsert: Create or Update)
        const { error } = await supabase
            .from('users')
            .upsert({
                email,
                purchase_id,
                product_id,
                status: 'active',
                updated_at: new Date().toISOString()
            }, { onConflict: 'email' });

        if (error) {
            console.error('Supabase Error:', error);
            return NextResponse.json({ error: 'Database error' }, { status: 500 });
        }

        return NextResponse.json({ success: true });

    } catch (err) {
        console.error('Webhook Error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

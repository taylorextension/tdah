import { NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/supabaseClient';
import { createSessionBundle, setSessionCookies } from '@/lib/sessionTokens';

export async function POST(req) {
    try {
        const supabase = getSupabaseClient();
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ error: 'Email é obrigatório' }, { status: 400 });
        }

        // 1. Check if user exists and is active
        const { data: user, error } = await supabase
            .from('users')
            .select('id, email, status')
            .eq('email', email)
            .single();

        if (error || !user) {
            return NextResponse.json({
                error: 'Email não encontrado ou compra não identificada.'
            }, { status: 401 });
        }

        if (user.status !== 'active') {
            return NextResponse.json({
                error: 'Acesso revogado ou expirado.'
            }, { status: 403 });
        }

        // 2. Create access + refresh session tokens.
        const { accessToken, refreshToken } = await createSessionBundle(user);

        // 3. Set secure session cookies.
        const response = NextResponse.json({ success: true });
        return setSessionCookies(response, { accessToken, refreshToken });

    } catch (err) {
        console.error('Login Error:', err);
        return NextResponse.json({ error: 'Erro interno no servidor' }, { status: 500 });
    }
}

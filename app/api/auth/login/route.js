import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { SignJWT } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function POST(req) {
    try {
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

        // 2. Create Session Token (JWT)
        const token = await new SignJWT({
            userId: user.id,
            email: user.email,
            role: 'reader'
        })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('30d') // 30 days login persistence
            .sign(JWT_SECRET);

        // 3. Set Cookie
        const response = NextResponse.json({ success: true });

        // Set httpOnly cookie for security
        response.cookies.set({
            name: 'tdah_session',
            value: token,
            httpOnly: true,
            path: '/',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 30, // 30 days
            sameSite: 'lax',
        });

        return response;

    } catch (err) {
        console.error('Login Error:', err);
        return NextResponse.json({ error: 'Erro interno no servidor' }, { status: 500 });
    }
}

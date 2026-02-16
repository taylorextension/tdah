import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const secret = process.env.JWT_SECRET;
const JWT_SECRET = secret ? new TextEncoder().encode(secret) : null;

export async function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.cookies.get('tdah_session')?.value;

    // If session is valid and user hits /login, send to dashboard.
    if (pathname === '/login' && token && JWT_SECRET) {
        try {
            await jwtVerify(token, JWT_SECRET);
            return NextResponse.redirect(new URL('/dashboard', req.url));
        } catch {
            // invalid token: keep user on login
        }
    }

    // Protect member routes and private content APIs.
    if (pathname.startsWith('/dashboard') || pathname.startsWith('/api/content')) {
        if (!token || !JWT_SECRET) {
            if (pathname.startsWith('/api/')) {
                return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
            }
            return NextResponse.redirect(new URL('/login', req.url));
        }
        try {
            await jwtVerify(token, JWT_SECRET);
            return NextResponse.next();
        } catch {
            if (pathname.startsWith('/api/')) {
                return NextResponse.json({ error: 'Session expired' }, { status: 401 });
            }
            return NextResponse.redirect(new URL('/login', req.url));
        }
    }

    // Allow all other routes.
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/login',
        '/dashboard/:path*',
        '/api/content/:path*',
    ],
};

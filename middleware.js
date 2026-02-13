import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req) {
    const { pathname } = req.nextUrl;

    // 1. Protect ONLY chapter content and private API routes
    if (pathname.startsWith('/chapters/') || pathname.startsWith('/api/user')) {

        // 2. Get Cookie
        const token = req.cookies.get('tdah_session')?.value;

        if (!token) {
            // Redirect to login if user tries to access protected content directly
            // Or return 401 for API/JSON requests
            if (pathname.startsWith('/api/') || pathname.endsWith('.json')) {
                return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
            }
            return NextResponse.redirect(new URL('/login', req.url));
        }

        try {
            // 3. Verify Token
            const { payload } = await jwtVerify(token, JWT_SECRET);

            // OPTIONAL: Check specific claims like role or expiration (handled by jwtVerify)

            // 4. Proceed
            return NextResponse.next();

        } catch (err) {
            // Token invalid or expired
            if (pathname.startsWith('/api/') || pathname.endsWith('.json')) {
                return NextResponse.json({ error: 'Session expired' }, { status: 401 });
            }
            return NextResponse.redirect(new URL('/login', req.url));
        }
    }

    // Allow all other routes (Cover, Login page, public assets)
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/chapters/:path*',  // Protect chapter JSONs
        '/api/user/:path*',  // Protect user info API
    ],
};

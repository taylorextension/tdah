import { NextResponse } from 'next/server';
import {
  createSessionBundle,
  getSessionCookieNames,
  verifyAccessToken,
  verifyRefreshToken,
  shouldRenewAccessToken,
  rotateAccessCookie,
  setSessionCookies,
  clearSessionCookies,
} from '@/lib/sessionTokens';

function isApiPath(pathname) {
  return pathname.startsWith('/api/');
}

function unauthorizedResponse(req) {
  if (isApiPath(req.nextUrl.pathname)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.redirect(new URL('/login', req.url));
}

async function resolveSession(req, baseResponse) {
  const { ACCESS_COOKIE, REFRESH_COOKIE } = getSessionCookieNames();
  const accessToken = req.cookies.get(ACCESS_COOKIE)?.value;
  const refreshToken = req.cookies.get(REFRESH_COOKIE)?.value;

  const accessPayload = await verifyAccessToken(accessToken);

  // Valid access token. Rotate when close to expiration to keep session alive.
  if (accessPayload?.userId && accessPayload?.email) {
    if (shouldRenewAccessToken(accessPayload)) {
      const { accessToken: renewedAccess } = await createSessionBundle({
        id: accessPayload.userId,
        email: accessPayload.email,
      });
      rotateAccessCookie(baseResponse, renewedAccess);
    }
    return { ok: true, response: baseResponse };
  }

  // Access missing/expired: try refresh token.
  const refreshPayload = await verifyRefreshToken(refreshToken);
  if (!refreshPayload?.userId || !refreshPayload?.email) {
    return { ok: false, response: clearSessionCookies(baseResponse) };
  }

  const { accessToken: renewedAccess, refreshToken: renewedRefresh } = await createSessionBundle({
    id: refreshPayload.userId,
    email: refreshPayload.email,
  });

  setSessionCookies(baseResponse, {
    accessToken: renewedAccess,
    refreshToken: renewedRefresh,
  });

  return { ok: true, response: baseResponse };
}

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Require auth on protected pages and protected content APIs.
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/api/content')) {
    const next = NextResponse.next();
    const session = await resolveSession(req, next);

    if (!session.ok) {
      const unauthorized = unauthorizedResponse(req);
      clearSessionCookies(unauthorized);
      return unauthorized;
    }

    return session.response;
  }

  // Keep authenticated users away from /login.
  if (pathname === '/login') {
    const next = NextResponse.next();
    const session = await resolveSession(req, next);

    if (session.ok) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    return clearSessionCookies(next);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/login',
    '/dashboard/:path*',
    '/api/content/:path*',
  ],
};

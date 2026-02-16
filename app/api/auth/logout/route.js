import { NextResponse } from 'next/server';

function clearSessionCookie(response) {
  response.cookies.set({
    name: 'tdah_session',
    value: '',
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: new Date(0),
    maxAge: 0,
  });
  return response;
}

export async function GET(req) {
  const response = NextResponse.redirect(new URL('/login', req.url), { status: 303 });
  return clearSessionCookie(response);
}

export async function POST(req) {
  const response = NextResponse.redirect(new URL('/login', req.url), { status: 303 });
  return clearSessionCookie(response);
}

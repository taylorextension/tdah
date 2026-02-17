import { NextResponse } from 'next/server';
import { clearSessionCookies } from '@/lib/sessionTokens';

export async function GET(req) {
  const response = NextResponse.redirect(new URL('/login', req.url), { status: 303 });
  return clearSessionCookies(response);
}

export async function POST(req) {
  const response = NextResponse.redirect(new URL('/login', req.url), { status: 303 });
  return clearSessionCookies(response);
}

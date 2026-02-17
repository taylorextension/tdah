import { NextResponse } from 'next/server';
import {
  createSessionBundle,
  getSessionCookieNames,
  verifyRefreshToken,
  clearSessionCookies,
  setSessionCookies,
} from '@/lib/sessionTokens';

export async function POST(req) {
  const { REFRESH_COOKIE } = getSessionCookieNames();
  const refreshToken = req.cookies.get(REFRESH_COOKIE)?.value;
  const refreshPayload = await verifyRefreshToken(refreshToken);

  if (!refreshPayload?.userId || !refreshPayload?.email) {
    const unauthorized = NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    return clearSessionCookies(unauthorized);
  }

  const { accessToken, refreshToken: newRefreshToken } = await createSessionBundle({
    id: refreshPayload.userId,
    email: refreshPayload.email,
  });

  const response = NextResponse.json({ success: true });
  return setSessionCookies(response, { accessToken, refreshToken: newRefreshToken });
}

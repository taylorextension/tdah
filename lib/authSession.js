import { getSessionCookieNames, verifyAccessToken, verifyRefreshToken } from '@/lib/sessionTokens';

export async function verifySessionToken(req) {
  const { ACCESS_COOKIE, REFRESH_COOKIE } = getSessionCookieNames();
  const accessToken = req.cookies.get(ACCESS_COOKIE)?.value;
  const accessPayload = await verifyAccessToken(accessToken);

  if (accessPayload?.userId && accessPayload?.email) {
    return accessPayload;
  }

  const refreshToken = req.cookies.get(REFRESH_COOKIE)?.value;
  const refreshPayload = await verifyRefreshToken(refreshToken);

  if (refreshPayload?.userId && refreshPayload?.email) {
    return refreshPayload;
  }

  return null;
}

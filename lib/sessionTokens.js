import { SignJWT, jwtVerify } from 'jose';

const secret = process.env.JWT_SECRET;
const JWT_SECRET = secret ? new TextEncoder().encode(secret) : null;

const ACCESS_COOKIE = 'tdah_session';
const REFRESH_COOKIE = 'tdah_refresh';

const ACCESS_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days
const REFRESH_MAX_AGE_SECONDS = 60 * 60 * 24 * 365 * 5; // 5 years
const ACCESS_RENEW_THRESHOLD_SECONDS = 60 * 60 * 24 * 7; // 7 days

function hasSecret() {
  return Boolean(JWT_SECRET);
}

function assertSecret() {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is required to sign/verify session tokens.');
  }
}

function toCookieOptions(maxAge) {
  return {
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge,
  };
}

function clearCookieOptions() {
  return {
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: new Date(0),
    maxAge: 0,
  };
}

function basePayloadFromUser(user) {
  return {
    userId: user.id,
    email: user.email,
    role: 'reader',
  };
}

export async function signAccessToken(payload) {
  assertSecret();

  return new SignJWT({ ...payload, tokenType: 'access' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${ACCESS_MAX_AGE_SECONDS}s`)
    .sign(JWT_SECRET);
}

export async function signRefreshToken(payload) {
  assertSecret();

  return new SignJWT({ ...payload, tokenType: 'refresh' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${REFRESH_MAX_AGE_SECONDS}s`)
    .sign(JWT_SECRET);
}

export async function createSessionBundle(user) {
  const payload = basePayloadFromUser(user);
  const accessToken = await signAccessToken(payload);
  const refreshToken = await signRefreshToken(payload);
  return { accessToken, refreshToken, payload };
}

export async function verifyAccessToken(token) {
  if (!token || !hasSecret()) return null;

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    if (payload.tokenType !== 'access') return null;
    return payload;
  } catch {
    return null;
  }
}

export async function verifyRefreshToken(token) {
  if (!token || !hasSecret()) return null;

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    if (payload.tokenType !== 'refresh') return null;
    return payload;
  } catch {
    return null;
  }
}

export function shouldRenewAccessToken(payload) {
  if (!payload?.exp) return true;
  const nowSeconds = Math.floor(Date.now() / 1000);
  return payload.exp - nowSeconds <= ACCESS_RENEW_THRESHOLD_SECONDS;
}

export function setSessionCookies(response, { accessToken, refreshToken }) {
  response.cookies.set({
    name: ACCESS_COOKIE,
    value: accessToken,
    ...toCookieOptions(ACCESS_MAX_AGE_SECONDS),
  });

  response.cookies.set({
    name: REFRESH_COOKIE,
    value: refreshToken,
    ...toCookieOptions(REFRESH_MAX_AGE_SECONDS),
  });

  return response;
}

export function rotateAccessCookie(response, accessToken) {
  response.cookies.set({
    name: ACCESS_COOKIE,
    value: accessToken,
    ...toCookieOptions(ACCESS_MAX_AGE_SECONDS),
  });

  return response;
}

export function clearSessionCookies(response) {
  response.cookies.set({
    name: ACCESS_COOKIE,
    value: '',
    ...clearCookieOptions(),
  });

  response.cookies.set({
    name: REFRESH_COOKIE,
    value: '',
    ...clearCookieOptions(),
  });

  return response;
}

export function getSessionCookieNames() {
  return {
    ACCESS_COOKIE,
    REFRESH_COOKIE,
  };
}

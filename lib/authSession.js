import { jwtVerify } from 'jose';

const secret = process.env.JWT_SECRET;
const JWT_SECRET = secret ? new TextEncoder().encode(secret) : null;

export async function verifySessionToken(token) {
  if (!token || !JWT_SECRET) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch {
    return null;
  }
}

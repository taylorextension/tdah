import { verifyAccessToken } from '@/lib/sessionTokens';

export async function verifySessionToken(token) {
  return verifyAccessToken(token);
}

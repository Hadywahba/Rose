import { cookies } from 'next/headers';
import { decode } from 'next-auth/jwt';

export async function getAccessToken() {
  const cookieStore = cookies();

  const cookieName =
    process.env.NODE_ENV === 'production'
      ? '__Secure-next-auth.session-token'
      : 'next-auth.session-token';

  const tokenCookie = cookieStore.get(cookieName);

  if (!tokenCookie) return null;

  const decoded = await decode({
    token: tokenCookie.value,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  return decoded?.accessToken || null;
}

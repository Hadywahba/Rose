'use server';

import { decode, encode, JWT } from 'next-auth/jwt';
import { cookies } from 'next/headers';
const cookieName =
  process.env.NODE_ENV === 'production'
    ? '__Secure-next-auth.session-token'
    : 'next-auth.session-token';
export async function getToken() {
  const tokenCookie = cookies().get(cookieName)?.value;

  if (!tokenCookie) return null;

  try {
    const jwt = await decode({
      token: tokenCookie,
      secret: process.env.NEXTAUTH_SECRET!,
    });

    return jwt;
  } catch (error) {
    console.error('Error decoding token', error);

    return null;
  }
}

export async function setToken(jwt: JWT) {
  const encodedToken = await encode({
    token: jwt,
    secret: process.env.NEXTAUTH_SECRET!,
    maxAge: 7 * 24 * 60 * 60, // 7 days,
  });

  cookies().set(cookieName, encodedToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: '/',
    sameSite: 'lax',
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });
}

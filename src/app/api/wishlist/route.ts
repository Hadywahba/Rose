import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { JSON_HEADER } from '@/lib/constants/api.constant';

export async function GET(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === 'production',
  });

  if (!token?.accessToken) {
    return NextResponse.json(
      { message: 'Unauthorized', code: 401 },
      { status: 401 },
    );
  }

  const resp = await fetch(`${process.env.API_URL}/wishlist`, {
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token.accessToken}`,
    },
    cache: 'no-store',
  });

  const payload = await resp.json();

  return NextResponse.json(payload);
}

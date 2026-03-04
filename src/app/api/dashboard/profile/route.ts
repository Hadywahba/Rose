import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function GET(request: NextRequest) {
  // get token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === 'production',
  });

  const accessToken = token?.accessToken;

  // Guard
  if (!accessToken) {
    return Response.json({
      message: 'No Access Token Available ,Login First',
      code: 401,
    });
  }

  // fetch
  const resp = await fetch(`${process.env.API_URL}/auth/profile-data`, {
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
    },
    cache: 'no-store',
  });

  const payload = await resp.json();

  if (!resp.ok) {
    return NextResponse.json({
      message: payload?.message || 'Failed to check user data',
    });
  }

  return NextResponse.json(payload);
}

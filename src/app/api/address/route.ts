import { JSON_HEADER } from '@/lib/constants/api.constant';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { searchParams } = new URL(req.url);
    const limit = searchParams.get('limit');
    const API_URL = `https://flower.elevateegy.com/api/v1/addresses?limit=${limit}`;
    const response = await fetch(API_URL, {
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token.accessToken}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        error: 'Failed to fetch addresses',
      }));

      return NextResponse.json(errorData, { status: response.status });
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    void error;

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

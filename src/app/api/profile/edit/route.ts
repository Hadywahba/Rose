import { NextResponse } from 'next/server';
import { getAccessToken } from '@/lib/server/get-access-token';

const API_BASE = 'https://flower.elevateegy.com/api/v1/auth';

export async function PUT(request: Request) {
  try {
    const accessToken = await getAccessToken();
    console.log('session', accessToken);

    if (!accessToken) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const payload = {
      name: `${body.firstName} ${body.lastName}`,
    };

    const res = await fetch(`${API_BASE}/editProfile`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      return NextResponse.json(
        { message: 'Update failed' },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Something went wrong' },
      { status: 500 },
    );
  }
}

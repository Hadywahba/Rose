// app/api/change-password/route.ts
import { NextResponse } from 'next/server';
import { getAccessToken } from '@/lib/server/get-access-token';

const API_BASE = 'https://flower.elevateegy.com/api/v1/auth';

export async function PATCH(request: Request) {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();

  const res = await fetch(`${API_BASE}/change-password`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorData = await res.json();
    return NextResponse.json({ message: errorData.message || 'Change password failed' }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
}

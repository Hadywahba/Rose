import { NextResponse } from 'next/server';
import { getAccessToken } from '@/lib/server/get-access-token';

const API_BASE = 'https://flower.elevateegy.com/api/v1/auth';

export async function DELETE() {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const res = await fetch(`${API_BASE}/deleteMe`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    return NextResponse.json({ message: 'Delete failed' }, { status: res.status });
  }

  return NextResponse.json({ success: true });
}

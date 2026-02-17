import { NextResponse } from 'next/server';
import { getAccessToken } from '@/lib/server/get-access-token';

const API_BASE = 'https://flower.elevateegy.com/api/v1/auth';

export async function PUT(req: Request) {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const formData = await req.formData();

  const res = await fetch(`${API_BASE}/upload-photo`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(
      { message: data.message || 'Upload failed' },
      { status: res.status }
    );
  }

  return NextResponse.json(data);
}

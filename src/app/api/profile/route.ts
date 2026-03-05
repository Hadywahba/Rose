// import { NextResponse } from 'next/server';
// import { getAccessToken } from '@/lib/server/get-access-token';

// const API_BASE = 'https://flower.elevateegy.com/api/v1/auth';

// export async function GET() {
//   const accessToken = await getAccessToken();

//   if (!accessToken) {
//     return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
//   }

//   const res = await fetch(`${API_BASE}/profile-data`, {
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//     cache: 'no-store',
//   });

//   if (!res.ok) {
//     return NextResponse.json({ message: 'Failed' }, { status: res.status });
//   }

//   const data = await res.json();
//   return NextResponse.json(data);
// }

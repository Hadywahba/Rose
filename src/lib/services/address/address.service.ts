import { AddressesPayload } from '@/lib/types/address/address';
import { cookies } from 'next/headers';
export const getAddress = async () => {
  const cookieStore = cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join('; ');
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/address`, {
    cache: 'no-store',
    headers: {
      Cookie: cookieHeader,
    },
  });
  if (!response.ok) {
    return { status: false, message: response.statusText, payload: null } as unknown as ApiResponse<AddressesPayload>;
  }

  const payload: ApiResponse<AddressesPayload> = await response.json();
  return payload;
};

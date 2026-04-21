import { AddressesPayload } from '@/lib/types/address/address';
import { cookies } from 'next/headers';
export const getAddress = async () => {
  const cookieStore = cookies();
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/address`, {
    cache: 'no-store',
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch address: ${response.statusText}`);
  }

  const payload: ApiResponse<AddressesPayload> = await response.json();
  return payload;
};

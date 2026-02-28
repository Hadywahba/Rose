import { AddressesResponse } from '@/lib/types/address/address';

export const getAddress = async (limit: number) => {
  const response = await fetch(`/api/address?limit=${limit}`, {
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch address: ${response.statusText}`);
  }

  const payload: ApiResponse<AddressesResponse> = await response.json();
  return payload;
};

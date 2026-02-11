import { AddressesResponse } from '@/lib/types/address/address';

export const getAddress = async (limit: number, page: number) => {
  const response = await fetch(`/api/address?limit=${limit}&page=${page}`, {
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch address: ${response.statusText}`);
  }

  const payload: ApiResponse<AddressesResponse> = await response.json();
  return payload;
};

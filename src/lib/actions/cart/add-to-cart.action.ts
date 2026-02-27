'use server';

import { JSON_HEADER } from '@/lib/constants/api.constant';
import { getToken } from '@/lib/utility/manage-token';
import type { AddToCartPayload, AddToCartResponse } from '@/lib/types/cart';

export async function addToCartAction(
  data: AddToCartPayload,
  clientToken?: string,
): Promise<ApiResponse<AddToCartResponse> | { guest: true }> {
  const jwt = await getToken();
  const token = (jwt?.accessToken as string | undefined) ?? clientToken;

  // Case 3: guest
  if (!token) {
    return { guest: true };
  }

  const response = await fetch(`${process.env.API_URL}/cart`, {
    method: 'POST',
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const payload: ApiResponse<AddToCartResponse> = await response.json();
  return payload;
}

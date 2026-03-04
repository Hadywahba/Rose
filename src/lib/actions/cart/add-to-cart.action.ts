'use server';

import { JSON_HEADER } from '@/lib/constants/api.constant';
import { getToken } from '@/lib/utility/manage-token';
import type { AddToCartPayload, AddToCartResponse } from '@/lib/types/cart';

export async function addToCartAction(
  data: AddToCartPayload,
  clientToken?: string,
): Promise<ApiResponse<AddToCartResponse> | { guest: true }> {
  // Token — prefer cookie (remember me / case 1), fallback to sessionStorage (case 2)
  const jwt = await getToken();
  const token = (jwt?.accessToken as string | undefined) ?? clientToken;

  // Case 3: guest — no token found anywhere
  if (!token) {
    return { guest: true };
  }

  // Request
  const response = await fetch(`${process.env.API_URL}/cart`, {
    method: 'POST',
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  // Response
  const payload: ApiResponse<AddToCartResponse> = await response.json();
  return payload;
}

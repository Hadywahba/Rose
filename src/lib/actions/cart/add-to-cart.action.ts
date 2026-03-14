'use server';

import { JSON_HEADER } from '@/lib/constants/api.constant';
import {
  AddToCartPayload,
  AddToCartProps,
  AddToCartResponse,
} from '@/lib/types/cart';
import { getToken } from '@/lib/utility/manage-token';

export async function addToCartAction(
  data: AddToCartPayload | AddToCartProps,
  clientToken?: string,
): Promise<ApiResponse<AddToCartResponse> | { guest: true }> {
  // Token
  const jwt = await getToken();
  const token = (jwt?.accessToken as string | undefined) ?? clientToken;

  const product = 'product' in data ? data.product : data.productId;
  const quantity = data.quantity;

  // Guard
  // New flow can fallback to guest mode when no token exists.
  // Legacy flow keeps throwing for non-authenticated users.
  if (!token) {
    if ('product' in data) {
      return { guest: true };
    }
    throw new Error('you must login first');
  }

  // Request
  const response = await fetch(`${process.env.API_URL}/cart`, {
    method: 'POST',
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ product, quantity }),
  });

  // Response
  const payload: ApiResponse<AddToCartResponse> = await response.json();
  return payload;
}

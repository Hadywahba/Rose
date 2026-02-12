'use server';

import { JSON_HEADER } from '@/lib/constants/api.constant';
import { AddToCartProps } from '@/lib/types/cart';
import { getToken } from '@/lib/utility/manage-token';

export async function updateCartAction({
  productId,
  quantity,
}: AddToCartProps) {
  // get-token
  const token = await getToken();

  // guard-class

  if (!token) {
    throw new Error('you must login first');
  }

  const resp = await fetch(`${process.env.API_URL}/cart/${productId}`, {
    method: 'PUT',
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token.accessToken}`,
    },
    body: JSON.stringify({ quantity }),
  });

  const payload = await resp.json();
  return payload;
}

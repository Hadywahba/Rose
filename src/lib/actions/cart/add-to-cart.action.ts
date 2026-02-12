'use server';

import { JSON_HEADER } from '@/lib/constants/api.constant';
import { AddToCartProps } from '@/lib/types/cart';
import { getToken } from '@/lib/utility/manage-token';

export async function addToCartAction({ productId, quantity }: AddToCartProps) {
  // get-token

  const token = await getToken();

  // guard-class

  if (!token) {
    throw new Error('you must login first');
  }

  const resp = await fetch(`${process.env.API_URL}/cart`, {
    method: 'POST',
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token.accessToken}`,
    },
    body: JSON.stringify({ product: productId, quantity }),
  });

  const payload = await resp.json();
  return payload;
}

'use server';

import { JSON_HEADER } from '@/lib/constants/api.constant';
import { getToken } from '@/lib/utility/manage-token';
import { revalidateTag } from 'next/cache';

const API = (productId: string) => `/wishlist/${productId}`;

export async function removeFromWhishlistAction(productId: string) {
  // get-token
  const token = await getToken();

  // guard-class
  if (!token) {
    throw new Error('you must login first');
  }

  const resp = await fetch(`${process.env.API_URL}${API(productId)}`, {
    method: 'DELETE',
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token.accessToken}`,
    },
  });

  const payload = await resp.json();

  //To refetch Check Product Function Again
  revalidateTag('check-whishlist');
  return payload;
}

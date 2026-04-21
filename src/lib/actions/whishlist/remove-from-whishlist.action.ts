'use server';

import { JSON_HEADER } from '@/lib/constants/api.constant';
import { ApiWishlistResponseResponse } from '@/lib/types/wishlist/wishlist';
import { getToken } from '@/lib/utility/manage-token';
import { revalidateTag } from 'next/cache';

const API = (id: string) => `/wishlist/${id}`;

export async function removeFromWhishlistAction(id: string) {
  // get-token
  const token = await getToken();

  // guard-class
  if (!token) {
    throw new Error('you must login first');
  }

  const resp = await fetch(`${process.env.API_URL}${API(id)}`, {
    method: 'DELETE',
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token.accessToken}`,
    },
  });

  const payload: ApiWishlistResponseResponse = await resp.json();

  //To refetch Check Product Function Again
  revalidateTag('check-whishlist');
  return payload;
}

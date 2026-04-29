'use server';

import { JSON_HEADER } from '@/lib/constants/api.constant';
import { getToken } from '@/lib/utility/manage-token';
// import { getToken } from "@/lib/utility/manage-token";
import { revalidateTag } from 'next/cache';

export async function addToWhishlistAction(productId: string) {
  // Token
  const token = await getToken();

  if (!token) {
    throw new Error('you must login first');
  }

  const resp = await fetch(`${process.env.API_URL}/wishlist`, {
    method: 'POST',
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token.accessToken}`,
    },
    body: JSON.stringify({ productId }),
  });

  const payload: ApiResponse<AddToWishlistResponse> = await resp.json();

  //To refetch Check Product Function Again
  revalidateTag('check-whishlist');

  return payload;
}

'use server';

import { JSON_HEADER } from '@/lib/constants/api.constant';
import { getToken } from '@/lib/utility/manage-token';
import { revalidatePath } from 'next/cache';
export async function deleteProductFromCartAction(productId: string) {
  // get-token
  const token = await getToken();

  // guard-class

  if (!token) {
    throw new Error('you must login first');
  }

  const resp = await fetch(`${process.env.API_URL}/cart/${productId}`, {
    method: 'DELETE',
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token.accessToken}`,
    },
  });

  const payload: DeleteApiResponse = await resp.json();
  revalidatePath(`/cart`);
  return payload;
}

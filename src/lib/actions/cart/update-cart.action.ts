'use server';

import { JSON_HEADER } from '@/lib/constants/api.constant';
import {  UpdateCartPayload, UpdateCartProps } from '@/lib/types/cart/cart';
import { getToken } from '@/lib/utility/manage-token';
import { revalidatePath } from 'next/cache';
export async function updateCartAction({
  cartItemId,
  quantity,
}: UpdateCartProps) {
  // get-token
  const token = await getToken();

  // guard-class

  if (!token) {
    throw new Error('you must login first');
  }

  const resp = await fetch(`${process.env.API_URL}/cart/${cartItemId}`, {
    method: 'PATCH',
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token.accessToken}`,
    },
    body: JSON.stringify({ quantity }),
  });

  const payload:ApiResponse<UpdateCartPayload> = await resp.json();
   revalidatePath(`/cart`);
  return payload;
}

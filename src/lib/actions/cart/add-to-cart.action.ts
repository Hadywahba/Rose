'use server';

import { JSON_HEADER } from '@/lib/constants/api.constant';
import { AddToCartProps, AddToCartResponse } from '@/lib/types/cart/cart';
import { getToken } from '@/lib/utility/manage-token';
import { revalidatePath } from 'next/cache';
export const addToCartAction = async (data: AddToCartProps) => {
  const productId = data.productId;
  const quantity = data.quantity;
  const token = await getToken();

  // Request
  const response = await fetch(`${process.env.API_URL}/cart`, {
    method: 'POST',
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token?.accessToken}`,
    },
    body: JSON.stringify({ productId, quantity }),
  });

  // Response
  const payload: ApiResponse<AddToCartResponse> = await response.json();
  revalidatePath(`/cart`);
  return payload;
};

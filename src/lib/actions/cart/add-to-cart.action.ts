'use server';

import { JSON_HEADER } from '@/lib/constants/api.constant';
import { AddToCartProps, AddToCartResponse } from '@/lib/types/cart';
import { getToken } from '@/lib/utility/manage-token';

export const addToCartAction = async (data: AddToCartProps) => {
  const product = data.productId;
  const quantity = data.quantity;
  const token = await getToken();

  // Request
  const response = await fetch(`${process.env.API_URL}/cart`, {
    method: 'POST',
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token?.accessToken}`,
    },
    body: JSON.stringify({ product, quantity }),
  });

  // Response
  const payload: ApiResponse<AddToCartResponse> = await response.json();
  return payload;
};

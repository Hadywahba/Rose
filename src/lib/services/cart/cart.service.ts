import { JSON_HEADER } from '@/lib/constants/api.constant';
import type { AddToCartPayload, AddToCartResponse } from '@/lib/types/cart';

export const addToCart = async (data: AddToCartPayload) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/cart`, {
    method: 'POST',
    headers: {
      ...JSON_HEADER,
    },
    body: JSON.stringify(data),
  });

  const payload: ApiResponse<AddToCartResponse> = await response.json();
  return payload;
};

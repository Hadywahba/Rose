import { JSON_HEADER } from '@/lib/constants/api.constant';
import {
  AddToCartPayload,
  AddToCartResponse,
  CartPayload,
} from '@/lib/types/cart/cart';
import { getToken } from '@/lib/utility/manage-token';

// Add To Cart
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

export const getCart = async () => {
  const token = await getToken();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/cart`, {
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token?.accessToken}`,
    },
  });

  const payload: ApiResponse<CartPayload> = await response.json();

  return payload;
};

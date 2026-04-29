'use server';

import { JSON_HEADER } from '@/lib/constants/api.constant';
import { OrderFormSchema } from '@/lib/schema/order/order-schema';
import { AddOrderResponse } from '@/lib/types/order/order';
import { getToken } from '@/lib/utility/manage-token';
import { revalidatePath } from 'next/cache';
export async function AddNewOrder(data: OrderFormSchema) {
  // Auth — retrieve the current user token
  const token = await getToken();

  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/orders`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token?.accessToken}`,
    },
    cache: 'no-store',
  });

  // Response — parse and return the JSON payload
  const payload: ApiResponse<AddOrderResponse> = await response.json();
  revalidatePath(`/cart`);
  return payload;
}

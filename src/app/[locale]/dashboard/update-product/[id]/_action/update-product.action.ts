'use server';

import { getToken } from '@/lib/utility/manage-token';
import { UpdateProductResponse } from '@/lib/types/products/product';

export async function updateProductAction(
  id: string,
  data: Record<string, unknown>,
) {
  // Token
  const token = await getToken();

  // Request
  const response = await fetch(`${process.env.API_URL}/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token?.accessToken}`,
    },
    body: JSON.stringify(data),
  });

  // Response
  const payload: ApiResponse<UpdateProductResponse> = await response.json();
  return payload;
}

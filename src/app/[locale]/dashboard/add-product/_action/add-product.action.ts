'use server';

import { getToken } from '@/lib/utility/manage-token';
import { AddProductResponse } from '@/lib/types/products/product';

export async function addProductAction(formData: FormData) {
  // Token
  const token = await getToken();

  // Request
  const response = await fetch(`${process.env.API_URL}/products`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token?.accessToken}`,
    },
    body: formData,
  });

  // Response
  const payload: ApiResponse<AddProductResponse> = await response.json();
  return payload;
}

'use server';

import { getToken } from '@/lib/utility/manage-token';
import { AddProductResponse } from '@/lib/types/product/product';

export async function addProductAction(formData: FormData) {
  const token = await getToken();

  const response = await fetch(`${process.env.API_URL}/products`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token?.accessToken}`,
    },
    body: formData,
  });

  const payload: ApiResponse<AddProductResponse> = await response.json();
  return payload;
}

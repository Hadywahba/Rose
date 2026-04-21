'use server';

import { JSON_HEADER } from '@/lib/constants/api.constant';
import { RatingFormSchema } from '@/lib/schema/add-review';
import { AddReviewResponse } from '@/lib/types/products/reviews/reviews-response';
import { getToken } from '@/lib/utility/manage-token';
import { revalidatePath } from 'next/cache';
export const AddReviewAction = async (
  data: RatingFormSchema,
  productId: string,
) => {
  const token = await getToken();

  const response = await fetch(`${process.env.API_URL}/reviews`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token?.accessToken}`,
      ...JSON_HEADER,
    },
    body: JSON.stringify(data),
  });

  const payload: ApiResponse<AddReviewResponse> = await response.json();
  revalidatePath(`/products/${productId}`);
  return payload;
};

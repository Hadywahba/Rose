"use server";

import { JSON_HEADER } from '@/lib/constants/api.constant';
import { RatingFormSchema } from '@/lib/schema/add-review';
import { getToken } from '@/lib/utility/manage-token';

export const AddReviewAction = async (data: RatingFormSchema) => {
  const token = await getToken();

  if (!token) {
    throw new Error('UNAUTHORIZED');
  }

  const response = await fetch(`${process.env.API_URL}/reviews`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token?.accessToken}`,
      ...JSON_HEADER,
    },
    body: JSON.stringify(data),
  });

  const payload = await response.json();  

  return payload;
};

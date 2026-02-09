"use server";

import { JSON_HEADER } from '@/lib/constants/api.constant';
import { RatingFormSchema } from '@/lib/schemas/add-review';

export const AddReviewAction = async (data: RatingFormSchema) => {
  const response = await fetch(`${process.env.API_URL}/reviews`, {
    method: 'POST',
    headers: {
      // Todo get token
      Authorization: `Bearer ${process.env.API_TOKEN}`,
      ...JSON_HEADER,
    },
    body: JSON.stringify(data),
  });

  const payload = await response.json();
  return payload;
}
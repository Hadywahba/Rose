'use server';

import { JSON_HEADER } from '@/lib/constants/api.constant';
import { TestimonialFormFields } from '@/lib/schema/testimonial/testimonial.schema';
import { getToken } from '@/lib/utility/manage-token';
import { revalidatePath } from 'next/cache';
export const addTestimonialAction = async (data: TestimonialFormFields) => {
  const token = await getToken();

  // Request
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/testimonials`, {
    method: 'POST',
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token?.accessToken}`,
    },
    body: JSON.stringify(data),
  });

  // Response
  const payload: ApiResponse<AddTestimonialResponse> = await response.json();
  revalidatePath(`/testimonials`);
  return payload;
};

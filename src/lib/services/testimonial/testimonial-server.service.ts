
import { getToken } from '@/lib/utility/manage-token';
import { JSON_HEADER } from '@/lib/constants/api.constant';

export const getTestimonial = async () => {
  const token = await getToken();
  const response = await fetch(`${process.env.API_URL}/testimonials`, {
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token?.accessToken}`,
    },
  });

  const payload: ApiResponse<TestimonialsData> = await response.json();
  return payload;
};

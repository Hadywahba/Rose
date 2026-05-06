import { getTestimonial } from '@/lib/services/testimonial/testimonial-server.service';

export const displayTestimonials = async () => {
  try {
    const data = await getTestimonial();

    if (data.status === false) {
      return {
        error: new Error(data?.message),
        data: [],
      };
    }

    return {
      error: null,
      data: data.payload?.data ?? [],
    };
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error
          : new Error('Failed to fetch Testimonials'),
      data: [],
    };
  }
};

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { TestimonialFormFields } from '@/lib/schema/testimonial/testimonial.schema';
import { addTestimonialAction } from '@/lib/actions/testimonial/add-testimonial.action';

export default function useAddTestimonial() {
  // Translation
  const t = useTranslations('testimonial');

  // Navigation
  const router = useRouter();

  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: TestimonialFormFields) => {
      const payload = await addTestimonialAction(fields);
      if (payload.status === false) {
        throw new Error(payload.message);
      }
      return payload;
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },

    onSuccess: () => {
      toast.success(t('success'));
      router.push('/');
    },
  });

  return { isPending, error, addTestimonial: mutate };
}

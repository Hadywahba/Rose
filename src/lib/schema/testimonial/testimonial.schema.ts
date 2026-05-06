import { Translations } from '@/lib/types/global';
import { z } from 'zod';

export const testimonialSchema = (t: Translations) =>
  z.object({
    name: z
      .string()
      .trim()
      .nonempty(t('validation.username-required'))
      .regex(
        /^[A-Za-z\u0600-\u06FF]+(?:\s[A-Za-z\u0600-\u06FF]+){0,2}$/,
        t('validation.username-regex-required'),
      ),

    rating: z.number(),
    email: z.email({
      error: (issue) =>
        issue.input
          ? t('validation.email-invalid')
          : t('validation.email-required'),
    }),
    content: z.string().nonempty(t('validation.message-required')),
    image: z.string().optional(),
  });

export type TestimonialFormFields = z.infer<
  ReturnType<typeof testimonialSchema>
>;

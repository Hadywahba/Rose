import { Translations } from '@/lib/types/global';
import { z } from 'zod';

export const testimonialSchema = (t: Translations) =>
  z.object({
    name: z
      .string()
      .min(3, t('validation.username-min-required'))
      .nonempty(t('validation.username-required'))
      .regex(
        /^[\p{L}]+(?:\s[\p{L}]+){0,2}$/u,
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

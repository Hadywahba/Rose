import { Translations } from '@/lib/types/global';
import z from 'zod';

// Validation occasion Schema
export const occasionSchema = (t: Translations) =>
  z.object({
    name: z
      .string()
      .nonempty(t('edit-occasion-name'))
      .min(1, { message: t('occasion-min-name') }),
  });

export type OccasionFormFields = z.infer<ReturnType<typeof occasionSchema>>;

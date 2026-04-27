import { Translations } from '@/lib/types/global';
import { z } from 'zod';

export const profileSchema = (t: Translations) =>
  z.object({
    firstName: z.string().nonempty(t('first-name-required')).optional(),

    lastName: z.string().nonempty(t('last-name-required')).optional(),

    phone: z.string().nonempty(t('phone-required')).min(10, t('phone-invalid')),

    photo: z.string().nullable().optional(),
  });

export type ProfileFormFields = z.infer<ReturnType<typeof profileSchema>>;

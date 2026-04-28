import { z } from 'zod';
import { passwordSchema } from '../password.schema';
import { Translations } from '@/lib/types/global';

export const changeSchema = (t: Translations) =>
  z
    .object({
      currentPassword: passwordSchema(t),
      newPassword: passwordSchema(t),
      confirmPassword: passwordSchema(t),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: t('password.match'),
      path: ['confirmPassword'],
    });

export type ChangePasswordFormFields = z.infer<ReturnType<typeof changeSchema>>;

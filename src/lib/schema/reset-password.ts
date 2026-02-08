import z from 'zod';
import { Translations } from '../types/global';

export const resetSchema = (t: Translations) =>
  z
    .object({
      password: z
        .string()
        .nonempty(t('reset-password.form.schema.password-required'))
        .min(8, { message: t('reset-password.form.schema.password-min') })
        .refine((password) => /[A-Z]/.test(password), {
          message: t('reset-password.form.schema.password-uppercase'),
        })
        .refine((password) => /[a-z]/.test(password), {
          message: t('reset-password.form.schema.password-lowercase'),
        })
        .refine((password) => /[0-9]/.test(password), {
          message: t('reset-password.form.schema.password-number'),
        })
        .refine((password) => /[!@#$%^&*]/.test(password), {
          message: t('reset-password.form.schema.password-character'),
        }),
      newPassword: z
        .string()
        .nonempty(t('reset-password.form.schema.confirmpassword-required')),
    })
    .refine((data) => data.password === data.newPassword, {
      message: t('reset-password.form.schema.password-match'),
      path: ['newPassword'],
    });

export type ResetPasswordFormFields = z.infer<ReturnType<typeof resetSchema>>;

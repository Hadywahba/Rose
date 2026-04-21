import { z } from 'zod';
import { Translations } from '../types/global';

export const loginSchema = (t: Translations) =>
  z.object({
    username: z
      .string()
      .min(3, t('login.username-min-required'))
      .nonempty(t('login.username-required'))
      .regex(
        /^[A-Za-z]+(?:\s[A-Za-z]+){0,2}$/,
        (t('login.username-regex-required')),
      ),
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
    rememberMe: z.boolean().optional(),
  });

export type LoginFormFields = z.infer<ReturnType<typeof loginSchema>>;

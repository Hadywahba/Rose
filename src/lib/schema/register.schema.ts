import { z } from 'zod';
import { Translations } from '../types/global';

export const getRegisterSchema = (t: Translations) =>
  z
    .object({
      firstName: z
        .string()
        .nonempty(t('auth.register.validation.first-name-required')),
      lastName: z
        .string()
        .nonempty(t('auth.register.validation.last-name-required')),
      email: z.email({
        error: (issue) =>
          issue.input
            ? t('auth.register.validation.email-invalid')
            : t('auth.register.validation.email-required'),
      }),
      phone: z
        .string()
        .nonempty(t('auth.register.validation.phone-required'))
        .min(10, t('auth.register.validation.phone-invalid')),
      gender: z
        .string()
        .nonempty(t('auth.register.validation.gender-required')),
      password: z
        .string()
        .nonempty(t('auth.register.validation.password-required'))
        .min(8, { message: t('auth.register.validation.password-min-length') })
        .refine((password) => /[A-Z]/.test(password), {
          message: t('auth.register.schema.password-uppercase'),
        })
        .refine((password) => /[a-z]/.test(password), {
          message: t('auth.register.schema.password-lowercase'),
        })
        .refine((password) => /[0-9]/.test(password), {
          message: t('auth.register.schema.password-number'),
        })
        .refine((password) => /[!@#$%^&*#?]/.test(password), {
          message: t('auth.register.schema.password-character'),
        }),
      rePassword: z
        .string()
        .nonempty(t('auth.register.validation.confirm-password-required')),
    })
    .refine((data) => data.password === data.rePassword, {
      message: t('auth.register.validation.passwords-not-match'),
      path: ['rePassword'],
    });

// Type inference
export type RegisterFormFields = z.infer<ReturnType<typeof getRegisterSchema>>;

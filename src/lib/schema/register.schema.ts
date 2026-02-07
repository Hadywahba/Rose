import { z } from 'zod';
import { Translations } from '../types/global';

export const getRegisterSchema = (t: Translations) =>
  z
    .object({
      firstName: z
        .string()
        .nonempty(t('auth.register.validation.firstNameRequired')),
      lastName: z
        .string()
        .nonempty(t('auth.register.validation.lastNameRequired')),
      email: z.email({
        error: (issue) =>
          issue.input
            ? t('auth.register.validation.emailInvalid')
            : t('auth.register.validation.emailRequired'),
      }),
      phone: z
        .string()
        .nonempty(t('auth.register.validation.phoneRequired'))
        .min(10, t('auth.register.validation.phoneInvalid')),
      gender: z.string().nonempty(t('auth.register.validation.genderRequired')),
      password: z
        .string()
        .nonempty(t('auth.register.validation.passwordRequired'))
        .min(8, { message: t('auth.register.validation.passwordMinLength') })
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
        .nonempty(t('auth.register.validation.confirmPasswordRequired')),
    })
    .refine((data) => data.password === data.rePassword, {
      message: t('auth.register.validation.passwordsNotMatch'),
      path: ['rePassword'],
    });

// Type inference
export type RegisterFormFields = z.infer<ReturnType<typeof getRegisterSchema>>;

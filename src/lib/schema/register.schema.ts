import { z } from 'zod';
import { Translations } from '../types/global';

export const getRegisterSchema = (t: Translations) =>
  z
    .object({
      username: z
        .string()
        .min(3, t('login.username-min-required'))
        .nonempty(t('login.username-required'))
        .regex(
          /^[A-Za-z]+(?:\s[A-Za-z]+){0,2}$/,
          t('login.username-regex-required'),
        ),
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
      confirmPassword: z
        .string()
        .nonempty(t('auth.register.validation.confirm-password-required')),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('auth.register.validation.passwords-not-match'),
      path: ['confirmPassword'],
    });

// Type inference
export type RegisterFormFields = z.infer<ReturnType<typeof getRegisterSchema>>;

export const registeremailschema = (t: Translations) =>
  z.object({
    email: z.email({
      error: (issue) =>
        issue.input
          ? t('auth.register.validation.email-invalid')
          : t('auth.register.validation.email-required'),
    }),
  });

// Verify Password Form Fields
export type RegisterEmailFormFields = z.infer<
  ReturnType<typeof registeremailschema>
>;

export const registerverifyschema = (t: Translations) =>
  z.object({
    code: z.string(t('register-code')),
  });

// Verify Password Form Fields
export type RegisterVerifyFormFields = z.infer<
  ReturnType<typeof registerverifyschema>
>;

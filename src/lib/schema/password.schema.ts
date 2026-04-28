import { z } from 'zod';
import { Translations } from '../types/global';

export const passwordSchema = (t: Translations) =>
  z
    .string()
    .nonempty({ message: t('validation.password.required') })
    .min(8, { message: t('validation.password.min', { count: 8 }) })
    .refine((password) => /[A-Z]/.test(password), {
      message: t('validation.password.uppercase'),
    })
    .refine((password) => /[a-z]/.test(password), {
      message: t('validation.password.lowercase'),
    })
    .refine((password) => /[0-9]/.test(password), {
      message: t('validation.password.number'),
    })
    .refine((password) => /[!@#$%^&*]/.test(password), {
      message: t('validation.password.special'),
    });

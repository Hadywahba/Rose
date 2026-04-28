import { z } from 'zod';
import { Translations } from '../types/global';

export const passwordSchema = (t: Translations) =>
  z
    .string()
    .nonempty({ message: t('password.required') })
    .min(8, { message: t('password.min', { count: 8 }) })
    .refine((password) => /[A-Z]/.test(password), {
      message: t('password.uppercase'),
    })
    .refine((password) => /[a-z]/.test(password), {
      message: t('password.lowercase'),
    })
    .refine((password) => /[0-9]/.test(password), {
      message: t('password.number'),
    })
    .refine((password) => /[!@#$%^&*]/.test(password), {
      message: t('password.special'),
    });

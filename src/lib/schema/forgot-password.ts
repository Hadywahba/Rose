import z from 'zod';
import { Translations } from '../types/global';

// Validation Forgot Schema
export const forgotSchema = (t: Translations) =>
  z.object({
    email: z.email({
      error: (issue) =>
        issue.input
          ? t('forget-password.form.schema.email-invalid')
          : t('forget-password.form.schema.email-required'),
    }),
  });

export type ForgotPasswordFormFields = z.infer<ReturnType<typeof forgotSchema>>;

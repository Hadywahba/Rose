import { z } from 'zod';

export const getRegisterSchema = (t: (key: string) => string) =>
  z
    .object({
      firstName: z
        .string()
        .min(1, t('auth.register.validation.first-name-required')),
      lastName: z
        .string()
        .min(1, t('auth.register.validation.last-name-required')),
      email: z
        .string()
        .email(t('auth.register.validation.email-invalid'))
        .min(1, t('auth.register.validation.email-required')),
      phone: z
        .string()
        .min(1, t('auth.register.validation.phone-required'))
        .min(10, t('auth.register.validation.phone-invalid')),
      gender: z.string().min(1, t('auth.register.validation.gender-required')),
      password: z
        .string()
        .min(1, t('auth.register.validation.password-required'))
        .min(8, t('auth.register.validation.password-min-length'))
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          t('auth.register.validation.password-pattern'),
        ),
      rePassword: z
        .string()
        .min(1, t('auth.register.validation.confirm-password-required')),
    })
    .refine((data) => data.password === data.rePassword, {
      message: t('auth.register.validation.passwords-not-match'),
      path: ['rePassword'],
    });

// Fallback schema for backward compatibility
export const registerSchema = z
  .object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z
      .string()
      .email('Please enter a valid email address')
      .min(1, 'Email is required'),
    phone: z
      .string()
      .min(1, 'Phone number is required')
      .min(10, 'Phone number must be at least 10 digits'),
    gender: z.string().min(1, 'Please select your gender'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        'Password must contain uppercase, lowercase, number, and special character',
      ),
    rePassword: z.string().min(1, 'Confirm password is required'),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords don't match",
    path: ['rePassword'],
  });

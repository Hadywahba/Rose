import { z } from 'zod';

export const getRegisterSchema = (t: (key: string) => string) =>
  z
    .object({
      firstName: z
        .string()
        .min(1, t('auth.register.validation.firstNameRequired')),
      lastName: z
        .string()
        .min(1, t('auth.register.validation.lastNameRequired')),
      email: z
        .string()
        .email(t('auth.register.validation.emailInvalid'))
        .min(1, t('auth.register.validation.emailRequired')),
      phone: z
        .string()
        .min(1, t('auth.register.validation.phoneRequired'))
        .min(10, t('auth.register.validation.phoneInvalid')),
      gender: z.string().min(1, t('auth.register.validation.genderRequired')),
      password: z
        .string()
        .min(1, t('auth.register.validation.passwordRequired'))
        .min(8, t('auth.register.validation.passwordMinLength'))
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          t('auth.register.validation.passwordPattern'),
        ),
      rePassword: z
        .string()
        .min(1, t('auth.register.validation.confirmPasswordRequired')),
    })
    .refine((data) => data.password === data.rePassword, {
      message: t('auth.register.validation.passwordsNotMatch'),
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

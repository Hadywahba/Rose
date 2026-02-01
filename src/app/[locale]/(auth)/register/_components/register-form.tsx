'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useRegister from '../_hooks/use-register';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { PhoneInput } from '@/components/ui/phone-input';
import { getRegisterSchema } from '@/lib/schema/auth.schema';
import { RegisterFields } from '@/lib/types/auth';
import { cn } from '@/lib/utility/tailwind-merge';
import { ErrorMessage } from '@/components/ui/error-message';
import { useTranslations } from 'next-intl';

export function RegisterForm() {
  // Translation
  const t = useTranslations();

  // State
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Mutations
  const { isPending, error, register } = useRegister();

  // Form & validation
  const form = useForm<RegisterFields>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      gender: '',
      password: '',
      rePassword: '',
    },
    resolver: zodResolver(getRegisterSchema(t)),
  });

  // Functions
  const onSubmit: SubmitHandler<RegisterFields> = async (values) => {
    register(values);
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center space-y-8">
      {/* Form */}
      <div className="w-full px-1">
        {/* Change Font Family => Edwardian Script ITC */}
        <h2 className="mb-10 text-center text-4xl text-maroon-700 dark:text-softpink-300 md:text-5xl">
          {t('auth.register.title')}
        </h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 border-y-2 border-zinc-200 py-4 dark:border-zinc-600 md:py-6"
          >
            {/* First Name & Last Name */}
            <div className="grid grid-cols-2 gap-3">
              {/* First Name */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-normal text-zinc-800 dark:text-zinc-50">
                      {t('auth.register.firstName')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder={t('auth.register.firstNamePlaceholder')}
                        className={cn(
                          'h-11 w-full border-gray-200 placeholder:text-zinc-400 focus:border-gray-300 focus:outline-none focus:ring-0',
                          fieldState.error &&
                            'border-red-500 focus:ring-red-500',
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Last Name */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-normal text-zinc-800 dark:text-zinc-50">
                      {t('auth.register.lastName')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder={t('auth.register.lastNamePlaceholder')}
                        className={cn(
                          'h-11 w-full border-zinc-300 placeholder:text-zinc-400 focus:border-gray-300 focus:outline-none focus:ring-0 dark:border-zinc-600',
                          fieldState.error &&
                            'border-red-500 focus:ring-red-500',
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem className="col-span-2">
                  <FormLabel className="text-sm font-normal text-zinc-800 dark:text-zinc-50">
                    {t('auth.register.email')}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder={t('auth.register.emailPlaceholder')}
                      className={cn(
                        'h-11 border-zinc-300 placeholder:text-left placeholder:text-zinc-400 focus:border-gray-300 focus:outline-none focus:ring-0 dark:border-zinc-600',
                        fieldState.error && 'border-red-500 focus:ring-red-500',
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-sm font-normal text-zinc-800 dark:text-zinc-50">
                    {t('auth.register.phone')}
                  </FormLabel>
                  <FormControl>
                    <PhoneInput
                      className={cn(
                        'border-zinc-300 focus:outline-none focus:ring-0 dark:border-zinc-600',
                        fieldState.error &&
                          '!focus:ring-red-500 !border-red-500',
                      )}
                      defaultCountry="EG"
                      placeholder={t('auth.register.phonePlaceholder')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Gender */}
            <FormField
              control={form.control}
              name="gender"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-sm font-normal text-zinc-800 dark:text-zinc-50">
                    {t('auth.register.gender')}
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={cn(
                          'h-11 border border-zinc-300 focus:outline-none focus:ring-0 dark:border-zinc-600',
                          fieldState.error &&
                            'border-red-500 focus:ring-red-500',
                        )}
                      >
                        <SelectValue
                          placeholder={t('auth.register.genderPlaceholder')}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white dark:bg-zinc-700">
                      <SelectItem value="male">
                        {t('auth.register.genderMale')}
                      </SelectItem>
                      <SelectItem value="female">
                        {t('auth.register.genderFemale')}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-sm font-normal text-zinc-800 dark:text-zinc-50">
                    {t('auth.register.password')}
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? 'text' : 'password'}
                        placeholder={t('auth.register.passwordPlaceholder')}
                        className={cn(
                          'h-11 w-full border-zinc-300 pr-10 placeholder:text-start placeholder:text-zinc-400 focus:border-gray-300 focus:outline-none focus:ring-0 dark:border-zinc-600',
                          fieldState.error &&
                            'border-red-500 focus:ring-red-500',
                        )}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute end-2 top-1/2 -translate-y-1/2 text-gray-400"
                      >
                        {showPassword ? (
                          <EyeOff className="size-5" />
                        ) : (
                          <Eye className="size-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="rePassword"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-sm font-normal text-zinc-800 dark:text-zinc-50">
                    {t('auth.register.confirmPassword')}
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder={t(
                          'auth.register.confirmPasswordPlaceholder',
                        )}
                        className={cn(
                          'h-11 w-full border-zinc-300 pr-10 placeholder:text-start placeholder:text-zinc-400 focus:border-gray-300 focus:outline-none focus:ring-0 dark:border-zinc-600',
                          fieldState.error &&
                            'border-red-500 focus:ring-red-500',
                        )}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute end-3 top-1/2 -translate-y-1/2 text-gray-400"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="size-5" />
                        ) : (
                          <Eye className="size-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Error */}
            {error && (
              <div className="mt-4">
                <ErrorMessage message={error.message} />
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              variant="primary"
              disabled={isPending}
              className="!mb-2 mt-6 h-12 w-full rounded-[10px_16px] md:!mb-6 md:!mt-12"
            >
              {isPending
                ? t('auth.register.creatingAccount')
                : t('auth.register.createAccount')}
            </Button>
          </form>
        </Form>

        {/* Login link */}
        <div className="mt-6 text-center text-sm font-semibold text-zinc-800 dark:text-zinc-50">
          {t('auth.register.alreadyHaveAccount')}{' '}
          <Link
            href="/login"
            className="font-medium text-maroon-600 transition-colors duration-200 hover:underline dark:text-softpink-400"
          >
            {t('auth.register.login')}
          </Link>
        </div>
      </div>
    </div>
  );
}

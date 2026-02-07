'use client';
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
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { PhoneInput } from '@/components/ui/phone-input';
import { cn } from '@/lib/utility/tailwind-merge';
import { useTranslations } from 'next-intl';
import {
  getRegisterSchema,
  RegisterFormFields,
} from '@/lib/schema/register.schema';
import SubmitButton from '@/components/features/auth/submit-button';

export function RegisterForm() {
  // Translation
  const t = useTranslations();

  // State
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Mutations
  const { isPending, error, register } = useRegister();

  // Form & validation
  const form = useForm<RegisterFormFields>({
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
  const onSubmit: SubmitHandler<RegisterFormFields> = async (values) => {
    register(values);
  };

  return (
    <div className="flex w-full flex-1 flex-col justify-center gap-4">
      {/* Form */}
      <div className="w-full">
        {/* Change Font Family => Edwardian Script ITC */}
        <h2 className="mb-8 text-center font-edwardian text-maroon-700 dark:text-softpink-300 sm:text-xl md:text-3xl lg:text-5xl">
          {t('auth.register.title')}
        </h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn(
              'border-t-2 border-zinc-200 pt-4 dark:border-zinc-600',
              Object.keys(form.formState.errors).length >= 5
                ? 'space-y-2'
                : 'space-y-4',
            )}
          >
            {/* First Name & Last Name */}
            <div className="grid grid-cols-2 gap-3">
              {/* First Name */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
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
                          'h-11 w-full border-gray-200 text-black placeholder:text-zinc-400 focus:border-gray-300 focus:outline-none focus:ring-0 dark:text-zinc-50',
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
                render={({ field }) => (
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
                          'h-11 w-full border-zinc-300 text-black placeholder:text-zinc-400 focus:border-gray-300 focus:outline-none focus:ring-0 dark:border-zinc-600 dark:text-zinc-50',
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
              render={({ field }) => (
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
                        'h-11 w-full border-zinc-300 text-black placeholder:text-left placeholder:text-zinc-400 focus:border-gray-300 focus:outline-none focus:ring-0 dark:border-zinc-600 dark:text-zinc-50',
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-normal text-zinc-800 dark:text-zinc-50">
                    {t('auth.register.phone')}
                  </FormLabel>
                  <FormControl>
                    <PhoneInput
                      className={cn(
                        'w-full border-zinc-300 text-black focus:outline-none focus:ring-0 dark:border-zinc-600 dark:text-zinc-50',
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
              render={({ field }) => (
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
                          'h-11 border border-zinc-300 text-black focus:outline-none focus:ring-0 dark:border-zinc-600 dark:text-zinc-50',
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
              render={({ field }) => (
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
                          'h-11 w-full border-zinc-300 pr-10 text-black placeholder:text-start placeholder:text-zinc-400 focus:border-gray-300 focus:outline-none focus:ring-0 dark:border-zinc-600 dark:text-zinc-50',
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
              render={({ field }) => (
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
                          'h-11 w-full border-zinc-300 pr-10 text-black placeholder:text-start placeholder:text-zinc-400 focus:border-gray-300 focus:outline-none focus:ring-0 dark:border-zinc-600 dark:text-zinc-50',
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

            {/* Submit Button */}
            <SubmitButton
              error={error}
              isSubmitting={form.formState.isSubmitting}
              isValid={form.formState.isValid}
              isPending={isPending}
              loading="forget-password.form.submit.loading"
              text="register.createAccount"
              title="register.alreadyHaveAccount"
              link="/login"
            />
          </form>
        </Form>
      </div>
    </div>
  );
}

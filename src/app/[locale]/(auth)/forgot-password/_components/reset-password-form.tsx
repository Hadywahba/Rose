'use client';

import React, { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import SubmitButton from '@/components/features/auth/submit-button';

import {
  ResetPasswordFormFields,
  resetSchema,
} from '@/lib/schema/reset-password';
import { ResetPasswordPayload } from '@/lib/types/auth/forget-password/reset';
import { zodResolver } from '@hookform/resolvers/zod';
import { useResetPassword } from '../_hooks/use-reset-password';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UserEmail } from '@/components/providers/app/forget-password/email-provider';
import { ForgotPasswordFormProps } from '@/lib/types/auth/verify';
import { FORGOT_PASSWORD_STEPS } from '@/lib/constants/auth.constant';

export default function ResetPasswordForm({
  setStep,
}: ForgotPasswordFormProps) {
  // Translation
  const t = useTranslations('auth');

  // Context
  const { email } = useContext(UserEmail)!;

  // Hook
  const { error, isPending, resetpassword } = useResetPassword();

  // Form
  const form = useForm({
    mode: 'all',
    resolver: zodResolver(resetSchema(t)),
    defaultValues: {
      newPassword: '',
      password: '',
    },
  });

  // Function
  const onsubmit: SubmitHandler<ResetPasswordFormFields> = (data) => {
    if (!email) return;

    const payload: ResetPasswordPayload = {
      email,
      newPassword: data.newPassword,
    };

    resetpassword(payload, {
      onSuccess: () => {
        setStep(FORGOT_PASSWORD_STEPS.email);
      },
    });
  };

  return (
    <section className="flex w-full flex-1 flex-col justify-center gap-6">
      {/* Title Part */}
      <div className="flex flex-col border-b-[.0625rem] border-zinc-200">
        <h1 className="text-xl font-semibold text-zinc-800 first-letter:uppercase dark:text-zinc-50 sm:text-2xl">
          {t('reset-password.create-new-password')}
        </h1>
        <p className="pb-3 text-sm font-normal text-zinc-800 first-letter:capitalize dark:text-zinc-50 sm:text-base">
          {t('reset-password.reset-text')}
        </p>
      </div>

      {/* Form  */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onsubmit)}>
          <div className="space-y-3">
            {/* Password Field */}
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-800 dark:text-zinc-50">
                    {t('reset-password.form.password.old-password')}
                  </FormLabel>
                  {/* Field */}
                  <FormControl>
                    {/* Input */}
                    <Input
                      {...field}
                      type="password"
                      placeholder={'********'}
                      className="w-full text-black placeholder:text-zinc-400 dark:text-zinc-50"
                    />
                  </FormControl>

                  {/* Feedback */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* New Password Field */}
            <FormField
              name="newPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-800 dark:text-zinc-50">
                    {t('reset-password.form.password.new-password')}
                  </FormLabel>
                  {/* Field */}
                  <FormControl>
                    {/* Input */}

                    <Input
                      {...field}
                      type="password"
                      placeholder={'********'}
                      className="w-full text-black placeholder:text-zinc-400 dark:text-zinc-50"
                    />

                    {/* Toggle Password Button */}
                  </FormControl>

                  {/* Feedback */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Submit Button */}
          <SubmitButton
            isSubmitting={form.formState.isSubmitting}
            isValid={form.formState.isValid}
            text="reset-password.form.submit.reset"
            error={error}
            isPending={isPending}
            title="reset-password.form.submit.contact"
            loading="forget-password.form.submit.loading"
          />
        </form>
      </Form>
    </section>
  );
}

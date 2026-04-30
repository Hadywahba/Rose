'use client';

import React, { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Register_STEPS } from '@/lib/constants/register.constant';
import { RegisterProps } from '@/lib/types/auth/register/register-steps';
import { UserEmail } from '@/components/providers/app/forget-password/email-provider';
import {
  RegisterEmailFormFields,
  registeremailschema,
} from '@/lib/schema/register.schema';
import { UseRegisterVeifiyEmail } from '../_hooks/use-register-email';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utility/tailwind-merge';
import { useTranslations } from 'next-intl';
import SubmitButton from '@/components/features/auth/submit-button';
export default function RegisterEmailVerify({ setStep }: RegisterProps) {
  // Translation
  const t = useTranslations();

  // Mutation
  const { error, isPending, emailVerify } = UseRegisterVeifiyEmail();

  // Context
  const { emailState } = useContext(UserEmail)!;

  //Form
  const form = useForm<RegisterEmailFormFields>({
    mode: 'all',
    resolver: zodResolver(registeremailschema(t)),
    defaultValues: {
      email: '',
    },
  });
  // onSubmit function used to send data to get OTP
  const onsubmit: SubmitHandler<RegisterEmailFormFields> = async (data) => {
    emailVerify(data, {
      onSuccess: () => {
        emailState(data.email);
        setStep(Register_STEPS.verify);
      },
    });
  };

  return (
    <main className="mx-auto flex h-screen w-full flex-col justify-center gap-3 px-6 md:w-[70%] lg:h-full lg:w-[28.25rem] lg:px-0">
      <div className="pb-6">
        <h1 className="mb-2 font-inter text-2xl font-bold text-gray-800 sm:text-3xl">
          {t('auth.register.verify-title')}
        </h1>
        <p className="text-sm font-normal text-gray-500 sm:text-base">
          {t('auth.register.verify-sub-title')}
        </p>
      </div>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onsubmit)}
            className="space-y-4 border-t-2 border-zinc-200 pt-4 dark:border-zinc-600"
          >
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
                      placeholder={t('auth.register.email-placeholder')}
                      className={cn(
                        'h-11 w-full border-zinc-300 text-black placeholder:text-left placeholder:text-zinc-400 focus:border-gray-300 focus:outline-none focus:ring-0 dark:border-zinc-600 dark:text-zinc-50',
                      )}
                    />
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
              text="register.verify-account"
              title="register.already-have-account"
              link="/login"
            />
          </form>
        </Form>
      </div>
    </main>
  );
}

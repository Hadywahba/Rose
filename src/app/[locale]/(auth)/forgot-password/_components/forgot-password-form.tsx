
'use client';

import React, { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import {
  ForgotPasswordFormFields,
  forgotSchema,
} from '@/lib/schemas/forgot-password';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import SubmitButton from '@/components/features/auth/submit-button';
import { useForgot } from '../_hooks/use-forgot-password';
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
import { toast } from 'sonner';
import { useResendTimer } from '../_hooks/use-resend-timer';
import { ForgotPasswordStep } from '@/lib/types/auth';
import { FORGOT_PASSWORD_STEPS } from '@/lib/constants/auth.constant';
interface ForgotPasswordFormProps {
  setStep: React.Dispatch<React.SetStateAction<ForgotPasswordStep>>;
}
export default function ForgotPasswordForm({
  setStep,
}: ForgotPasswordFormProps){
  // Translation
  const t = useTranslations('auth');

  // Context
  const { emailState } = useContext(UserEmail)!;

  // Hook
  const { error, forgot, isPending } = useForgot();
    const { timeLeft, startTimer } = useResendTimer();


  // Form
  const form = useForm<ForgotPasswordFormFields>({
    mode: 'all',
    resolver: zodResolver(forgotSchema(t)),
    defaultValues: {
      email: '',
    },
  });

  // Function
const onsubmit: SubmitHandler<ForgotPasswordFormFields> = (data) => {
  emailState(data.email);

  forgot(data, {
    onSuccess: () => {
      if (timeLeft === 0) {
        startTimer();
      }

      toast.success(t('forget-password.forget-message'));
       setStep(FORGOT_PASSWORD_STEPS.verify)
    },
  });
};




  return (
    <section className="lg:max-w-auth mx-auto flex min-h-screen w-full max-w-[25.375rem] flex-col justify-center gap-6 px-6 sm:w-[70%] lg:px-0">
      {/* Title Part */}
      <div className="flex flex-col border-b-[.0625rem] border-zinc-200">
        <h1 className="text-xl font-semibold capitalize text-zinc-800 dark:text-zinc-50 sm:text-2xl">
          {t('forget-password.forgot-password')}
        </h1>
        <p className="pb-3 text-sm font-normal text-zinc-800 first-letter:capitalize dark:text-zinc-50 sm:text-base">
          {t('forget-password.forget-text')}
        </p>
      </div>

      <Form {...form}>
        {/*Form */}
        <form
          onSubmit={form.handleSubmit(onsubmit)}
          className="flex flex-col justify-center"
        >
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('forget-password.form.email.label')}</FormLabel>

                {/* Field */}
                <FormControl>
                  {/* Input */}
                  <Input
                    {...field}
                    placeholder={t('forget-password.form.email.placeholder')}
                    className="w-full text-black placeholder:text-zinc-400 dark:text-zinc-50"
                  />
                </FormControl>

                {/* Feedback */}
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
            text="forget-password.form.submit.continue"
            title="forget-password.form.submit.no-account"
            link="/register"
          />
        </form>
      </Form>
    </section>
  );

}

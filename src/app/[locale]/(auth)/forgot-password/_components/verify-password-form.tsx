'use client';

import SubmitButton from '@/components/features/auth/submit-button';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { verifySchema } from '@/lib/schema/verify-password';
import { VerifyResetFields } from '@/lib/types/auth/verify';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';
import { Dispatch, SetStateAction } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useResendTimer } from '../_hooks/use-resend-timer';
import { useVerifyPassword } from '../_hooks/use-verify-password';

type VerifyPasswordProps = {
  email: string;
  // TODO set step to forget password
  setStep: Dispatch<
SetStateAction<'forget-password' | 'verify-password' | 'reset-password'>>;
};

export default function VerifyPasswordForm({
  // email,
  setStep,
}: VerifyPasswordProps) {
  // TODO remove this email
  const email = 'mostafaelyan45@gmail.com';

  // Translations
  const t = useTranslations('auth');
  const locale = useLocale();


  // Hooks
  const { isPending, error, verifyResetCode } = useVerifyPassword();
  // TODO remove this comment
  // const { forgot } = UseForgot();
  const { timeLeft, canResend, startTimer } = useResendTimer();

  // Hook Form
  const form = useForm<VerifyResetFields>({
    resolver: zodResolver(verifySchema(t('verifyPassword.otp-schema'))),
    defaultValues: { resetCode: '' },
  });

  // Functions
  const onsubmit: SubmitHandler<VerifyResetFields> = async (values) => {
    verifyResetCode(values);
  };

  return (
    <section className="lg:max-w-auth mx-auto flex min-h-screen w-full max-w-[25.375rem] flex-col justify-center gap-6 px-6 sm:w-[70%] lg:px-0">
      <div className="flex flex-col border-b border-zinc-200 pb-3">
        <h1 className="text-xl font-semibold dark:text-zinc-50">
          {t('verifyPassword.title')}
        </h1>
        <p className="text-sm dark:text-zinc-50">
          {t('verifyPassword.description')} {email}{' '}
          <Button
            className="w-auto p-0 text-blue-700"
            type="button"
            variant="link"
            onClick={() => {
              // TODO set step to forget password
              setStep('forget-password');
            }}
          >
            {' '}
            {t('verifyPassword.edit')}
          </Button>
        </p>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onsubmit)}>
          <FormField
            control={form.control}
            name="resetCode"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    value={field.value}
                    onChange={(value) =>
                      /^\d*$/.test(value) && field.onChange(value)
                    }
                  >
                    {[...Array(6)].map((_, i) => (
                      <InputOTPGroup key={i}>
                        <InputOTPSlot index={i} />
                      </InputOTPGroup>
                    ))}
                  </InputOTP>
                </FormControl>

                <FormDescription className="text-base font-medium text-zinc-800">
                  {!canResend ? (
                    <div className="text-center">
                      <p>
                        {t('verifyPassword.request-another-code')} :{' '}
                        {new Intl.NumberFormat(locale, {
                          numberingSystem: locale === 'ar' ? 'arab' : 'latn',
                        }).format(timeLeft)}
                      </p>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="ml-auto block hover:text-maroon-600"
                      onClick={() => {
                        if (!email) return;

                        forgot({ email });
                        startTimer();
                        toast.success(t('verifyPassword.new-otp-sent'), {
                          duration: 3000,
                        });
                      }}
                    >
                      {t('verifyPassword.resendOtp')}
                    </button>
                  )}
                </FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />

          <SubmitButton
            isSubmitting={form.formState.isSubmitting}
            isValid={form.formState.isValid}
            error={error}
            isPending={isPending}
            text="verifyPassword.submit"
            title="verifyPassword.Contact"
            loading="verifyPassword.loading"
          />
        </form>
      </Form>
    </section>
  );
}

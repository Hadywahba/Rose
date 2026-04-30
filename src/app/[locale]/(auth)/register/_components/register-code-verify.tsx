'use client';

import React, { useContext } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RegisterProps } from '@/lib/types/auth/register/register-steps';
import { UserEmail } from '@/components/providers/app/forget-password/email-provider';
import { UseRegisterVeifiy } from '../_hooks/use-register-verify';
import {
  RegisterVerifyFormFields,
  registerverifyschema,
} from '@/lib/schema/register.schema';
import { Register_STEPS } from '@/lib/constants/register.constant';
import { useLocale, useTranslations } from 'use-intl';
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
import { useResendTimer } from '../../forgot-password/_hooks/use-resend-timer';
import { toast } from 'sonner';
import SubmitButton from '@/components/features/auth/submit-button';
import { Button } from '@/components/ui/button';
import { UseRegisterVeifiyEmail } from '../_hooks/use-register-email';

export default function RegisterCodeVerify({ setStep }: RegisterProps) {
  // Translations
  const t = useTranslations('auth');
  const locale = useLocale();

  // Mutation
  const { error, isPending, verifiy } = UseRegisterVeifiy();
  const { emailVerify } = UseRegisterVeifiyEmail();

  // Context
  const { email } = useContext(UserEmail)!;

  const { timeLeft, canResend, startTimer } = useResendTimer();

  // Start timer automatically on first mount (email was just sent)
  const timerStarted = React.useRef(false);
  React.useEffect(() => {
    if (!timerStarted.current && canResend) {
      startTimer();
      timerStarted.current = true;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Form
  const form = useForm<RegisterVerifyFormFields>({
    mode: 'all',
    resolver: zodResolver(registerverifyschema(t)),
    defaultValues: {
      code: '',
    },
  });

  // Functions
  const onsubmit: SubmitHandler<RegisterVerifyFormFields> = async (data) => {
    const payload = {
      ...data,
      email: email,
    };
    verifiy(payload, {
      onSuccess: () => {
        setStep(Register_STEPS.register);
      },
    });
  };

  return (
    <main className="flex w-full flex-1 flex-col justify-center gap-6">
      {/* Title */}

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
              setStep(Register_STEPS.email);
            }}
          >
            {' '}
            {t('verifyPassword.edit')}
          </Button>
        </p>
      </div>

      {/* OTP section */}
      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onsubmit)}>
          <FormField
            control={form.control}
            name="code"
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

                <FormDescription className="text-base font-medium text-zinc-800 dark:text-zinc-50">
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

                        emailVerify({ email });
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
            text="register.verify-code"
            loading="verifyPassword.loading"
            title="register.already-have-account"
            link="/login"
          />
        </form>
      </Form>
    </main>
  );
}

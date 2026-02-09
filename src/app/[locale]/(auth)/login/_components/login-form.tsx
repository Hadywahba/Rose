'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import useLogin from '../_hooks/use-login';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { LoginFormFields, loginSchema } from '@/lib/schema/login.schema';
import SubmitButton from '@/components/features/auth/submit-button';

import React, { useState } from 'react';
import RememberMe from './remeber-me';

import { Input } from '@/components/ui/input';
export default function LoginForm() {
  // Translation
  const t = useTranslations('auth');

  //mutation
  const { isPending, login, error } = useLogin();

  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Hook

  // Form & Validation
  const form = useForm<LoginFormFields>({
    mode: 'all',
    resolver: zodResolver(loginSchema(t)),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  // Function
  const onSubmit: SubmitHandler<LoginFormFields> = (values) => {
    login(values);
  };

  // const handleLogin = async () => {
  //   await signIn('credentials', {
  //     email,
  //     password,
  //     rememberMe,
  //     redirect: true,
  //     callbackUrl: '/dashboard',
  //   });
  // };

  return (
    <section className="flex w-full flex-1 flex-col justify-center gap-6">
      {/* Title Part */}

      <h1 className="border-b-2 border-zinc-200 pb-4 text-center font-edwardian  font-normal capitalize text-maroon-700 dark:border-zinc-600 dark:text-softpink-300 text-4xl lg:text-5xl">
        {t('login.title')}
      </h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-center"
        >
          <div className="space-y-3">
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-zinc-800 dark:text-zinc-50">
                    {t('login.email')}
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full text-black placeholder:text-zinc-400 dark:text-zinc-50"
                      placeholder="user@example.com"
                      {...field}
                    />
                  </FormControl>

                  {/* Feedback */}
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
                  <FormLabel className="text-zinc-800 dark:text-zinc-50">
                    {t('login.password')}
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full text-black placeholder:text-zinc-400 dark:text-zinc-50"
                      placeholder="***********"
                      {...field}
                      type="password"
                    />
                  </FormControl>

                  {/* Feedback */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Forgot Password */}
          <Link
            href="/forgot-password"
            className="mt-2 text-end text-sm font-semibold text-maroon-700 dark:text-softpink-300"
          >
            {t('login.forget-password')}
          </Link>

          <div className="mt-6">
            <RememberMe checked={rememberMe} onChange={setRememberMe} />
          </div>

          {/* Submit Button */}
          <SubmitButton
            error={error}
            isSubmitting={form.formState.isSubmitting}
            isValid={form.formState.isValid}
            isPending={isPending}
            loading="forget-password.form.submit.loading"
            text="login.submit"
            title="forget-password.form.submit.no-account"
            link="/register"
          />
        </form>
      </Form>
    </section>
  );
}

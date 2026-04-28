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

import { useTranslations } from 'next-intl';
import { useChangePassword } from '../_hooks/use-change-password';
import {
  ChangePasswordFormFields,
  changeSchema,
} from '@/lib/schema/profile/change-password.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { cn } from '@/lib/utility/tailwind-merge';
import SubmitButton from '@/components/features/auth/submit-button';

export default function ChangePasswordForm() {
  // Translations
  const tProfile = useTranslations('');
  const tValidation = useTranslations('validation');

  // Mutation
  const { ChangePassword, error, isPending } = useChangePassword();

  // Form
  const form = useForm<ChangePasswordFormFields>({
    mode: 'all',
    resolver: zodResolver(changeSchema(tValidation)),
    defaultValues: {
      confirmPassword: '',
      currentPassword: '',
      newPassword: '',
    },
  });

  // Function
  const onsubmit: SubmitHandler<ChangePasswordFormFields> = async (data) => {
    ChangePassword(data, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onsubmit)}
        className="space-y-4 border-t-2 border-zinc-200 pt-4 dark:border-zinc-600"
      >
        {/*Old Password */}
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-normal text-zinc-800 dark:text-zinc-50">
                {tProfile('auth.password.old-password')}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder={tProfile('auth.password.old-password-placholder')}
                  className={cn(
                    'h-11 w-full border-zinc-300 text-black placeholder:text-start placeholder:text-zinc-400 focus:border-gray-300 focus:outline-none focus:ring-0 dark:border-zinc-600 dark:text-zinc-50',
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* New Password */}
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-normal text-zinc-800 dark:text-zinc-50">
                {tProfile('auth.password.new-password')}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder={tProfile('auth.password.new-password-placholder')}
                  className={cn(
                    'h-11 w-full border-zinc-300 text-black placeholder:text-start placeholder:text-zinc-400 focus:border-gray-300 focus:outline-none focus:ring-0 dark:border-zinc-600 dark:text-zinc-50',
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm Password */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-normal text-zinc-800 dark:text-zinc-50">
                {tProfile('auth.password.confirm-password')}
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    type="password"
                    placeholder={tProfile(
                      'auth.password.new-password-placholder',
                    )}
                    className={cn(
                      'h-11 w-full border-zinc-300 text-black placeholder:text-start placeholder:text-zinc-400 focus:border-gray-300 focus:outline-none focus:ring-0 dark:border-zinc-600 dark:text-zinc-50',
                    )}
                  />
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
          text="change password"
        />
      </form>
    </Form>
  );
}

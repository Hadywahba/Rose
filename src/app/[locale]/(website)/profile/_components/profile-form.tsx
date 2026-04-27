'use client';

import { Input } from '@/components/ui/input';
import { useTranslations } from 'next-intl';
import { useUpdateProfile } from '../_hooks/use-update-profile';

import {
  ProfileFormFields,
  profileSchema,
} from '@/lib/schema/profile/profile.schema';
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
import { cn } from '@/lib/utility/tailwind-merge';
import SubmitButton from '@/components/features/auth/submit-button';
import { PhoneInput } from '@/components/ui/phone-input';

type ProfileFormProps = {
  user: User;
};

export default function ProfileForm({ user }: ProfileFormProps) {
  // Translations
  const t = useTranslations('profile');

  // Hook
  const { error, isPending, updateProfile } = useUpdateProfile();

  // Form & Validation
  const form = useForm<ProfileFormFields>({
    mode: 'all',
    resolver: zodResolver(profileSchema(t)),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      phone: user?.phone || '',
    },
  });

  // Function
  const onSubmit: SubmitHandler<ProfileFormFields> = (values) => {
    console.log(values);
    updateProfile(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-6 flex flex-col gap-5"
      >
        {/* First Name & Last Name */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {/* First Name */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-normal text-zinc-800 dark:text-zinc-50">
                  {t('fields.firstName')}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="fgfgg"
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
                  {t('fields.lastName')}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="gsdgs"
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

        {/* Phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-normal text-zinc-800 dark:text-zinc-50">
                {t('fields.phone')}
              </FormLabel>
              <FormControl>
                <PhoneInput
                  className={cn(
                    'w-full border-zinc-300 text-black focus:outline-none focus:ring-0 dark:border-zinc-600 dark:text-zinc-50',
                  )}
                  defaultCountry="EG"
                  placeholder="fgd"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* Read-only fields */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-zinc-600 dark:text-zinc-300">
              {t('fields.email')}
            </label>
            <Input
              variant="email"
              value={user.email}
              disabled
              className="w-full"
              noWrapper
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-zinc-600 dark:text-zinc-300">
              {t('fields.username')}
            </label>
            <Input
              variant="text"
              value={user.username}
              disabled
              className="w-full"
              noWrapper
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="w-full">
          <SubmitButton
            error={error}
            isSubmitting={form.formState.isSubmitting}
            isValid={form.formState.isValid}
            isPending={isPending}
            loading="saving"
            text="save"
          />
        </div>
      </form>
    </Form>
  );
}

// {profileMutation.isPending ? t('saving') : t('save')}

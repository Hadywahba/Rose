'use client';

import SharedProgress from '@/components/shared/shared-progress';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PhoneInput } from '@/components/ui/phone-input';
import { Textarea } from '@/components/ui/textarea';
import { ADDRESS_STEPS } from '@/lib/constants/checkout.constant';
import { AddressFormSchema, addressSchema } from '@/lib/schema/address.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { useForm } from 'react-hook-form';

// Named alias to avoid repeating the Omit type in multiple places
type AddressFormData = Omit<AddressFormSchema, 'lat' | 'long'>;

interface AddressFormProps {
  data?: Partial<AddressFormData>;
  onBack?: () => void;
  onFormComplete?: (data: AddressFormData) => void;
}

export default function AddressForm({
  onBack,
  data,
  onFormComplete,
}: AddressFormProps) {
  // Translations
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === 'ar';

  // Form Hook
  const form = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema(t).omit({ lat: true, long: true })),
    defaultValues: {
      username: data?.username || '',
      city: data?.city || '',
      street: data?.street || '',
      phone: data?.phone || '',
    },
  });

  // Functions
  function onSubmit(values: AddressFormData) {
    onFormComplete?.(values);
  }

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-1"
      >
        {/* Progress */}
        <SharedProgress
          step={ADDRESS_STEPS.form}
          steps={Object.values(ADDRESS_STEPS)}
          firstValue="25%"
        />

        {/* Title & Back */}
        <div className="flex gap-2 pt-2">
          {onBack && (
            <Button
              aria-label={t('my-addresses.back-button')}
              className="rounded-full"
              type="button"
              size="icon"
              onClick={onBack}
            >
              {isRTL ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}
            </Button>
          )}
          <p className="text-2xl font-medium text-maroon-600 dark:text-softpink-200">
            {t('my-addresses.form-title')}
          </p>
        </div>

        {/* Username / Category Field */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-normal text-zinc-800 dark:text-zinc-50">
                {t('my-addresses.category-label')}
              </FormLabel>
              <FormControl>
                <Input
                  className="w-full dark:text-zinc-50"
                  placeholder={t('my-addresses.category-placeholder')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* City Field */}
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-normal text-zinc-800 dark:text-zinc-50">
                {t('my-addresses.city-label')}
              </FormLabel>
              <FormControl>
                <Input
                  className="w-full dark:text-zinc-50"
                  placeholder={t('my-addresses.city-placeholder')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Street Address Field */}
        <FormField
          control={form.control}
          name="street"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-normal text-zinc-800 dark:text-zinc-50">
                {t('my-addresses.address-label')}
              </FormLabel>
              <FormControl>
                <Textarea
                  className="min-h-28 w-full dark:text-zinc-50"
                  placeholder={t('my-addresses.address-placeholder')}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone Field */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-normal text-zinc-800 dark:text-zinc-50">
                {t('my-addresses.phone-label')}
              </FormLabel>
              <FormControl>
                <PhoneInput
                  className="w-full border-zinc-300 text-black focus:outline-none focus:ring-0 dark:border-zinc-600"
                  defaultCountry="EG"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <div className="pt-2">
          <Button type="submit" className="w-full">
            {t('my-addresses.submit-button')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
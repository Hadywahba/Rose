'use client';

import SharedProgress from '@/components/shared/shared-progress';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
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
import { ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

interface AddressFormProps {
  data?: Partial<AddressFormSchema>;
  onBack?: () => void;
  onFormComplete?: (data: Omit<AddressFormSchema, 'lat' | 'long'>) => void;
}

export default function AddressForm({
  onBack,
  data,
  onFormComplete,
}: AddressFormProps) {
  const t = useTranslations('my-addresses');

  const form = useForm<Omit<AddressFormSchema, 'lat' | 'long'>>({
    resolver: zodResolver(addressSchema.omit({ lat: true, long: true })),
    defaultValues: {
      username: data?.username || '',
      city: data?.city || '',
      street: data?.street || '',
      phone: data?.phone || '',
    },
  });

  function onSubmit(values: Omit<AddressFormSchema, 'lat' | 'long'>) {
    onFormComplete?.(values);
  }

  return (
    <div className="space-y-0">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
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
                aria-label="Go back"
                className="rounded-full"
                type="button"
                size="icon"
                onClick={onBack}
              >
                <ArrowLeft size={20} />
              </Button>
            )}
            <p className="text-2xl font-medium text-maroon-600 dark:text-softpink-200">
              Enter address details
            </p>
          </div>

          <Field>
            <FieldLabel className="dark:text-zinc-50" htmlFor="username">
              {t('category-label')}
            </FieldLabel>
            <Input
              className="w-full dark:text-zinc-50"
              id="username"
              placeholder={t('category-placeholder')}
              {...form.register('username')}
            />
            <FieldError>{form.formState.errors.username?.message}</FieldError>
          </Field>

          <Field>
            <FieldLabel className="dark:text-zinc-50" htmlFor="city">
              {t('city-label')}
            </FieldLabel>
            <Input
              className="w-full dark:text-zinc-50"
              id="city"
              placeholder={t('city-placeholder')}
              {...form.register('city')}
            />
            <FieldError>{form.formState.errors.city?.message}</FieldError>
          </Field>

          <Field>
            <FieldLabel className="dark:text-zinc-50" htmlFor="street">
              {t('address-label')}
            </FieldLabel>
            <Textarea
              className="min-h-28 dark:text-zinc-50"
              id="street"
              placeholder={t('address-placeholder')}
              {...form.register('street')}
            />
            <FieldError>{form.formState.errors.street?.message}</FieldError>
          </Field>

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-normal text-zinc-800 dark:text-zinc-50">
                  {t('phone-label')}
                </FormLabel>
                <FormControl>
                  <PhoneInput
                    className={
                      'w-full border-zinc-300 text-black focus:outline-none focus:ring-0 dark:border-zinc-600 dark:text-zinc-50'
                    }
                    defaultCountry="EG"
                    placeholder={t('phone-placeholder')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='pt-2'>
            <Button type="submit" className="w-full">
              Next
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

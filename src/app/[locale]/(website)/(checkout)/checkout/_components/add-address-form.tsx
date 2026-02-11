'use client';

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
import { Textarea } from '@/components/ui/textarea';
import { PhoneInput } from '@/components/ui/phone-input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { AddressFormSchema, addressSchema } from '@/lib/schema/address.schema';
import { cn } from '@/lib/utility/tailwind-merge';
import { useAddAddress } from '../_hooks/use-address';

interface AddressFormProps {
  selectedAddressId?: string;
  onClose?: () => void;
}

export default function AddressForm({ onClose }: AddressFormProps) {
  const t = useTranslations('my-addresses');
  const { isPending, addAddress } = useAddAddress();

  const form = useForm<AddressFormSchema>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      username: '',
      city: '',
      street: '',
      phone: '',
    },
  });

  function onSubmit(values: AddressFormSchema) {
    addAddress(values, {
      onSuccess: () => {
        onClose?.();
      },
    });
  }

  return (
    <div className="space-y-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <Field>
            <FieldLabel htmlFor="username">{t('category-label')}</FieldLabel>
            <Input
              className="w-full"
              id="username"
              placeholder={t('category-placeholder')}
              {...form.register('username')}
            />
            <FieldError>{form.formState.errors.username?.message}</FieldError>
          </Field>

          <Field>
            <FieldLabel htmlFor="city">{t('city-label')}</FieldLabel>
            <Input
              className="w-full"
              id="city"
              placeholder={t('city-placeholder')}
              {...form.register('city')}
            />
            <FieldError>{form.formState.errors.city?.message}</FieldError>
          </Field>

          <Field>
            <FieldLabel htmlFor="address">{t('address-label')}</FieldLabel>
            <Textarea
              className="min-h-36"
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
                    className={cn(
                      'w-full border-zinc-300 text-black focus:outline-none focus:ring-0 dark:border-zinc-600 dark:text-zinc-50',
                    )}
                    defaultCountry="EG"
                    placeholder={t('phone-placeholder')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isPending} className="w-full" type="submit">
            {isPending ? t('submitting') : t('submit-button')}
          </Button>
        </form>
      </Form>
    </div>
  );
}

'use client';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { PhoneInput } from '@/components/ui/phone-input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { useAddAddress } from '@/hooks/use-add-address';
import { AddressFormSchema, addressSchema } from '@/lib/schema/address.schema';
import { cn } from '@/lib/utility/tailwind-merge';

interface AddressFormProps {
  selectedAddressId?: string;
  onClose?: () => void;
}

export default function AddressForm({
  // selectedAddressId,
  onClose,
}: AddressFormProps) {
  // Translations
  const t = useTranslations('my-addresses');

  // Hook
  const { isPending, addAddress } = useAddAddress();

  // Hook Form
  const form = useForm<AddressFormSchema>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      category: '',
      city: '',
      address: '',
      phone: '',
    },
  });

  // Function
  function onSubmit(values: AddressFormSchema) {
    addAddress(values, {
      onSuccess: () => {
        onClose?.();
      },
    });
  }

  return (
    <div className="relative col-span-1 border-s ps-4">
      {/* Form container */}
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-xl space-y-4"
          >
            {/* category */}
            <Field>
              <FieldLabel htmlFor="category">{t('category-label')}</FieldLabel>
              <Input
                className="w-full"
                id="category"
                placeholder={t('category-placeholder')}
                {...form.register('category')}
              />
              <FieldError>{form.formState.errors.category?.message}</FieldError>
            </Field>

            {/* city */}
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

            {/* address */}
            <Field>
              <FieldLabel htmlFor="address">{t('address-label')}</FieldLabel>
              <Textarea
                className="min-h-36"
                id="address"
                placeholder={t('address-placeholder')}
                {...form.register('address')}
              />
              <FieldError>{form.formState.errors.address?.message}</FieldError>
            </Field>

            {/* Phone */}
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

            {/* Buttons */}
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={onClose}
              >
                {t('cancel-button')}
              </Button>
              <Button disabled={isPending} className="flex-1" type="submit">
                {isPending ? t('submitting') : t('submit-button')}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

import { z } from 'zod';

export const addressSchema = (t: (key: string) => string) =>
  z.object({
    title: z.string().min(1, { message: t('my-addresses.label-required') }),
    city: z.string().min(1, { message: t('my-addresses.city-required') }),
    street: z.string().min(1, { message: t('my-addresses.address-required') }),
    phone: z.string().min(10, { message: t('my-addresses.phone-required') }),
     latitude: z.number().optional(),
    longitude: z.number().optional(),
  });

export type AddressFormSchema = z.infer<ReturnType<typeof addressSchema>>;

export const updateaddressSchema = (t: (key: string) => string) =>
  z.object({
    title: z.string().min(1, { message: t('my-addresses.label-required') }),
    city: z.string().min(1, { message: t('my-addresses.city-required') }),
    street: z.string().min(1, { message: t('my-addresses.address-required') }),
  });

export type UpdateAddressFormSchema = z.infer<
  ReturnType<typeof updateaddressSchema>
>;

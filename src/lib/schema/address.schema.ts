import { z } from 'zod';

export const addressSchema = (t: (key: string) => string) =>
  z.object({
    username: z.string().min(1, { message: t('my-addresses.label-required') }),
    city: z.string().min(1, { message: t('my-addresses.city-required') }),
    street: z.string().min(1, { message: t('my-addresses.address-required') }),
    phone: z.string().min(10, { message: t('my-addresses.phone-required') }),
    lat: z.string().optional(),
    long: z.string().optional(),
  });

export type AddressFormSchema = z.infer<ReturnType<typeof addressSchema>>;
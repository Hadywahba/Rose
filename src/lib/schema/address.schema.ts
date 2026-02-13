import { z } from 'zod';

export const addressSchema = z.object({
  username: z.string().min(1, { message: 'Category is required' }),
  city: z.string().min(1, { message: 'City is required' }),
  street: z.string().min(1, { message: 'Address is required' }),
  phone: z.string().min(10, { message: 'Valid phone number is required' }),
  lat: z.string().optional(),
  long: z.string().optional(),
});

export type AddressFormSchema = z.infer<typeof addressSchema>;
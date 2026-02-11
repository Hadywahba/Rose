import { z } from 'zod';

export const addressSchema = z.object({
  category: z.string().min(1, { message: 'Category is required' }),
  city: z.string().min(1, { message: 'City is required' }),
  address: z.string().min(10, { message: 'Address must be at least 10 characters' }),
  phone: z.string().min(10, { message: 'Valid phone number is required' }),
});

export type AddressFormSchema = z.infer<typeof addressSchema>;
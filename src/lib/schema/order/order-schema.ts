import { z } from 'zod';

export const orderSchema = (t: (key: string) => string) =>
  z.object({
    addressId: z
      .string()
      .nonempty(t('order-address-id')),

    paymentMethod: z
      .string()
      .nonempty(t('order-payment-method')),

    notes: z
      .string()
      .nonempty(t('order-notes')),

    couponCode: z.string().optional(),
  });

export type OrderFormSchema = z.infer<ReturnType<typeof orderSchema>>;

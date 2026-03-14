import { z } from 'zod';
import { Translations } from '@/lib/types/global';

export const getUpdateProductSchema = (t: Translations) =>
  z.object({
    title: z.string().nonempty(t('products.update.validation.title-required')),
    description: z
      .string()
      .nonempty(t('products.update.validation.description-required'))
      .min(10, t('products.update.validation.description-min')),
    price: z
      .number({ error: t('products.update.validation.price-invalid') })
      .positive(t('products.update.validation.price-invalid')),
    discount: z
      .number({ error: t('products.update.validation.discount-invalid') })
      .min(0)
      .max(100)
      .optional(),
    priceAfterDiscount: z.number().optional(),
    quantity: z
      .number({ error: t('products.update.validation.quantity-invalid') })
      .int()
      .positive(t('products.update.validation.quantity-invalid')),
    category: z
      .string()
      .nonempty(t('products.update.validation.category-required')),
    occasion: z.string().optional(),
  });

export type UpdateProductFormFields = z.infer<
  ReturnType<typeof getUpdateProductSchema>
>;

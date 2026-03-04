import { z } from 'zod';
import { Translations } from '@/lib/types/global';

export const getAddProductSchema = (t: Translations) =>
  z.object({
    title: z.string().nonempty(t('products.add.validation.title-required')),
    description: z
      .string()
      .nonempty(t('products.add.validation.description-required'))
      .min(10, t('products.add.validation.description-min')),
    price: z
      .number({ error: t('products.add.validation.price-invalid') })
      .positive(t('products.add.validation.price-invalid')),
    discount: z
      .number({ error: t('products.add.validation.discount-invalid') })
      .min(0)
      .max(100)
      .optional(),
    priceAfterDiscount: z.number().optional(),
    quantity: z
      .number({ error: t('products.add.validation.quantity-invalid') })
      .int()
      .positive(t('products.add.validation.quantity-invalid')),
    imgCover: z
      .custom<FileList>()
      .refine(
        (files) => files && files.length > 0,
        t('products.add.validation.cover-required'),
      )
      .refine(
        (files) => files && files.length === 1,
        t('products.add.validation.cover-single'),
      )
      .refine(
        (files) =>
          files && Array.from(files).every((f) => f.type.startsWith('image/')),
        t('products.add.validation.images-only'),
      ),
    images: z
      .custom<FileList>()
      .refine(
        (files) => files && files.length > 0,
        t('products.add.validation.gallery-required'),
      )
      .refine(
        (files) =>
          files && Array.from(files).every((f) => f.type.startsWith('image/')),
        t('products.add.validation.images-only'),
      ),
    category: z
      .string()
      .nonempty(t('products.add.validation.category-required')),
    occasion: z
      .string()
      .nonempty(t('products.add.validation.occasion-required')),
  });

export type AddProductFormFields = z.infer<
  ReturnType<typeof getAddProductSchema>
>;

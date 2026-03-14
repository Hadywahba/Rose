import { Translations } from '@/lib/types/global';
import z from 'zod';

// Validation Edit Occasion Schema
export const editoccasionSchema = (t: Translations) =>
  z.object({
    name: z
      .string()
      .nonempty(t('dashboard-occasion.edit-occasion-name'))
      .min(3, { message: t('dashboard-occasion.occasion-min-name') }),
  });

export type EditOccasionFormFields = z.infer<
  ReturnType<typeof editoccasionSchema>
>;

// Validation Add Occasion Schema

export const addOccasionSchema = (t: Translations) =>
  editoccasionSchema(t).extend({
    image: z
      .instanceof(File, {
        message: t('dashboard-occasion.occasion-add-images'),
      })
      .refine((file) => file.size <= 5_000_000, {
        message: t('dashboard-occasion.occasion-image-size'),
      }),
  });

export type AddOccasionFormFields = z.infer<
  ReturnType<typeof addOccasionSchema>
>;

import { z } from 'zod';
export const ratingFormSchema = z.object({
  product: z.string(),
  rating: z.number().min(1, 'Please select a rating'),
  title: z.string().min(1, 'Title is required').max(25),
  comment: z.string().min(1, 'Review is required').max(250),
});

export type RatingFormSchema = z.infer<typeof ratingFormSchema>;

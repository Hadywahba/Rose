import { z } from 'zod';
export const ratingFormSchema = z.object({
  productId: z.string(),
  rating: z.number().min(1, 'Please select a rating'),
  headline: z.string().min(1, 'Please enter a title').max(25),
  content: z.string().min(1, 'Please enter your comment').max(250),
});

export type RatingFormSchema = z.infer<typeof ratingFormSchema>;

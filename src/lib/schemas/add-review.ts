import { z } from 'zod';
export const ratingFormSchema = z.object({
  product: z.string(),
  rating: z.number().min(1, 'Please select a rating'),
  title: z.string().min(1, 'Please enter a title').max(25),
  comment: z.string().min(1, 'Please enter your comment').max(250),
});

export type RatingFormSchema = z.infer<typeof ratingFormSchema>;

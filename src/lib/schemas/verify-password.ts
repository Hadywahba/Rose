import { z } from 'zod';

export const verifySchema = (message: string) => z.object({
  resetCode: z
    .string()
    .length(6, message)
});

export type VerifyCodeSchemaType = z.infer<typeof verifySchema>;

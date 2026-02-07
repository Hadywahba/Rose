// lib/schemas/product.ts
import { z } from "zod";

/**
 * Schema for a single Product.
 */
export const productSchema = z.object({
    _id: z.string(),
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    imgCover: z.string(),
    images: z.array(z.string()),
    price: z.number(),
    priceAfterDiscount: z.number(),
    quantity: z.number(),
    category: z.string(),
    occasion: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    __v: z.number(),
    isSuperAdmin: z.boolean().optional(),
    sold: z.number().optional().nullable().default(0),
    rateAvg: z.number(),
    rateCount: z.number(),
    favoriteId: z.string().nullable(),
    isInWishlist: z.boolean(),
});

/**
 * Schema for the metadata included in a paginated products response.
 */
export const metadataSchema = z.object({
    currentPage: z.number(),
    totalPages: z.number(),
    limit: z.number(),
    totalItems: z.number(),
});

/**
 * Schema for the response that contains product data and pagination metadata.
 */
export const productsResponseSchema = z.object({
    message: z.string(),
    metadata: metadataSchema,
    products: z.array(productSchema),
});


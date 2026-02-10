import { productSchema, productsResponseSchema } from "@lib/schemas/products";

export = Products

namespace Products {
    // Define types, interfaces, or documentation for Products API here as needed.
    export interface Product {
        _id: string;
        title: string;
        slug: string;
        description: string;
        imgCover: string;
        images: string[];
        price: number;
        priceAfterDiscount: number;
        quantity: number;
        category: string;
        occasion: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
        isSuperAdmin?: boolean;
        sold: number;
        rateAvg: number;
        rateCount: number;
        favoriteId: string | null;
        isInWishlist: boolean;
    }

    // Metadata (additional data for paginated pages)
    export interface Metadata {
        currentPage: number;
        totalPages: number;
        limit: number;
        totalItems: number;
    }

    // Add additional types related to products API here as needed.
    export interface ProductsResponse {
        message: string;
        metadata: Metadata;
        products: Product[];
    }

    export type ProductSchema = z.infer<typeof productSchema>;
    export type ProductsResponseSchema = z.infer<typeof productsResponseSchema>;
}



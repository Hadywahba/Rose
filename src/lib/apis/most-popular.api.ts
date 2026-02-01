import { Product as ProductType } from "@/lib/types/end-point-api/products";
import { JSON_HEADER } from "../constants/shared.constant";
import { OccasionsResponse, OccasionsSpecific } from "../types/end-point-api/occasions";

/**
 * Fetches all occasions from the API.
 *
 * @returns {Promise<OccasionsResponse>} A promise that resolves to an OccasionsResponse object containing all occasions data.
 * @throws {Error} Throws an error if the request fails or an unexpected issue occurs.
 */
export async function getOccasions(): Promise<OccasionsResponse> {
    try {
        const response = await fetch(`${process.env.BASE_URL}/occasions`, {
            headers: JSON_HEADER,
            next: { revalidate: 60 * 10 }, //=> 10 minutes
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch occasions: ${response.status}`);
        }

        const data = await response.json();
        return data as OccasionsResponse;
    } catch {
        throw new Error("Something went wrong while fetching occasions.");
    }
} 

/**
 * Fetch products filtered by occasion ID, limiting results to 12 products.
 * @param {string} occasionId - The occasion identifier.
 * @returns {Promise<any[]>} Array of products for a given occasion, or an empty array if error occurs.
 */
export async function getProductsByOccasion(occasionId: string): Promise<ProductType[]> {
    try {
        const response = await fetch(`${process.env.BASE_URL}/occasions/${occasionId}`, {
            headers: JSON_HEADER,
            next: { revalidate: 60 * 10 }, //=> 10 minutes
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch products: ${response.status}`);
        }

        const data = await response.json();
        const { occasion } = data as OccasionsSpecific & { occasion?: { products?: ProductType[] } };

        if (occasion && Array.isArray(occasion.products)) {
            return occasion.products.slice(0, 12) as ProductType[];
        }

        return [];
    } catch {
        // Return an empty array on error to keep consumers safe
        return [];
    }
}

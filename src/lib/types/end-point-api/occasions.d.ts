import { MetadataResponse } from "./fixed-metadata-response";

export = Occasions;

namespace Occasions {
    /**
     * Represents a single occasion item.
     * @property {string} _id - Unique identifier of the occasion.
     * @property {string} name - Name of the occasion.
     * @property {string} slug - URL-friendly identifier for the occasion.
     * @property {string} image - Image URL representing the occasion.
     * @property {string} createdAt - ISO date string for when the occasion was created.
     * @property {string} updatedAt - ISO date string for when the occasion was last updated.
     * @property {boolean} isSuperAdmin - Indicates if the occasion was created by a super admin.
     * @property {number} productsCount - Number of products associated with this occasion.
     */
    export interface OccasionsItem {
        _id: string;
        name: string;
        slug: string;
        image: string;
        createdAt: string;
        updatedAt: string;
        isSuperAdmin: boolean;
        productsCount: number;
    }

    /**
     * Response object returned when fetching all occasions.
     * Extends MetadataResponse to include metadata such as pagination.
     * @property {OccasionsItem[]} occasions - Array of occasion items.
     */
    export interface OccasionsResponse extends MetadataResponse {
        occasions: OccasionsItem[];
    }

    /**
     * Response object returned for a specific occasion query.
     * @property {string} message - Status or feedback message.
     * @property {OccasionsItem} occasion - The occasion item requested.
     */
    export interface OccasionsSpecific {
        message: string;
        occasion: OccasionsItem;
    }
}
export interface OccasionsResponse {
    metadata: {
        currentPage: number;
        limit: number;
        totalPages: number;
        totalItems: number;
    };
    occasions: Occasion[];
}

export interface Occasion {
    _id: string;
    name: string;
    slug: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    isSuperAdmin: boolean;
    productsCount: number;
}

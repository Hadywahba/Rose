import { JSON_HEADER } from "../constants/shared.constant";

export async function getBestSellingProducts() {
    try {
        const response = await fetch(`${process.env.BASE_URL}/products?sort=-sold`, {
            headers: JSON_HEADER,
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch best-selling products (Status: ${response.status})`);
        }

        const { products } = await response.json();
        return Array.isArray(products) ? products : [];

    } catch (error) {
        throw new Error(`${error}`);
    }
}

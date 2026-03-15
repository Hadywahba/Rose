import { JSON_HEADER } from "@/lib/constants/api.constant";
import { DashboardProductsResponse } from "@/lib/types/products/product";

export const getDashboardProducts = async (params?: Record<string, string>) => {
  const query = new URLSearchParams({
    fields: 'title,sold,quantity,price,rateAvg,rateCount',
    limit: '8',
    ...params,
  });

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/products?${query}`,
    {
      headers: { ...JSON_HEADER },
      next: { tags: ['products'] },
    }
  );

  const payload: DashboardProductsResponse = await response.json();

  return payload;
};
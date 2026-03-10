import { JSON_HEADER } from "@/lib/constants/api.constant";
import { DashboardProductsResponse } from "@/lib/types/products/product";

export const getTopProducts = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/products?fields=title,sold,quantity,price`,
    {
      headers: { ...JSON_HEADER },
    },
  );
  const payload: DashboardProductsResponse = await response.json();


  return payload.products;
};
import { DashboardProductsResponse } from '@/lib/types/products/product';
import DashboardAllProducts from './dashboard-all-products';

export default async function DashboardAllProductsWrapper({
  fetchedProducts,
}: {
  fetchedProducts: Promise<DashboardProductsResponse>;
}) {
  const payload = await fetchedProducts;


  return (
      <DashboardAllProducts
        allProducts={payload.products}
        totalPages={payload.metadata?.totalPages ?? 1}
      />
  );
}

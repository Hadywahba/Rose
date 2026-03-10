import { getDashboardProducts } from '@/lib/services/dashboard/get-dashboard-products.service';
import DashboardAllProducts from './dashboard-all-products';

export default async function DashboardAllProductsWrapper({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const payload = await getDashboardProducts(searchParams);


  return (
    <DashboardAllProducts
      allProducts={payload.products}
      totalPages={payload.metadata?.totalPages ?? 1}
    />
  );
}

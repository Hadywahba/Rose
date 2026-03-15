import { getDashboardProducts } from '@/lib/services/dashboard/get-dashboard-products.service';
import DashboardAllProductsWrapper from './_components/dashboard-all-products-wrapper';
import { Suspense } from 'react';
import DashboardTableSkeleton from '@/components/skeletons/dashboard/occasion-list-skeleton';

export default function Page({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const fetchedProducts = getDashboardProducts(searchParams);

  return (
    <Suspense fallback={<DashboardTableSkeleton columns={4} />}>
      <DashboardAllProductsWrapper fetchedProducts={fetchedProducts} />
    </Suspense>
  );
}

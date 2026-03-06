import { Suspense } from 'react';
import TopSellingSection from './_components/top-selling-section';
import TopSellingSectionSkeleton from './_components/top-selling-section-skeleton';

export default function page() {
  return (
    <>
      <Suspense fallback={<TopSellingSectionSkeleton />}>
        <TopSellingSection />
      </Suspense>
    </>
  );
}

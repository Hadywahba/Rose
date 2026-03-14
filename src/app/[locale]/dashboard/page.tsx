import { Suspense } from 'react';
import TopSellingSection from './_components/top-selling-section';
import TopSellingSectionSkeleton from './_components/top-selling-section-skeleton';
import StatsOverview from './_components/stats-overview';
import AllCategories from './_components/all-categories';
import { getOverallStatisticsAction } from '@/lib/actions/statistics/get-statistics.action';

export default async function page() {
  const payload = await getOverallStatisticsAction();
  const statistics = 'error' in payload ? null : payload.statistics;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 space-y-6 ">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <StatsOverview statistics={statistics} />
        <AllCategories />
      </div>
      <Suspense fallback={<TopSellingSectionSkeleton />}>
        <TopSellingSection />
      </Suspense>
    </div>
  );
}

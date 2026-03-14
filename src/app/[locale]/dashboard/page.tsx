import React from 'react';
import StatsOverview from './_components/stats-overview';
import AllCategories from './_components/all-categories';
import { getOverallStatisticsAction } from '@/lib/actions/statistics/get-statistics.action';

export default async function page() {
  const payload = await getOverallStatisticsAction();
  const statistics = 'error' in payload ? null : payload.statistics;

  return (
    <div className="min-h-screen bg-zinc-50 p-6 dark:bg-zinc-900">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <StatsOverview statistics={statistics} />
        <AllCategories />
      </div>
    </div>
  );
}

import React from 'react';
import StatsOverview from './_components/stats-overview';
import AllCategories from './_components/all-categories';

export default function page() {
  return (
    <div className="p-6 bg-zinc-50 min-h-screen dark:bg-zinc-900">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <StatsOverview />

        <AllCategories />
      </div>
    </div>
  );
}

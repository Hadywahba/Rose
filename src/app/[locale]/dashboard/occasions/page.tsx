import DashboardHeaderPage from '@/components/shared/dashboard/dashboard-header';
import DashboardSearchInput from '@/components/shared/dashboard/dashboard-search-input';
import React from 'react';
import OccasionList from './_components/occasion-list';

export default function page() {
  return (
    <main className="flex flex-col gap-5">
      <div className="flex flex-col gap-5 rounded-lg bg-white p-5 dark:bg-zinc-700">
        <DashboardHeaderPage
          title="dashboard-occasion.occasion-header"
          btnText="dashboard-occasion.button-ocaasion-add"
          path="/"
        />
        <DashboardSearchInput />
      </div>

      <OccasionList />
    </main>
  );
}

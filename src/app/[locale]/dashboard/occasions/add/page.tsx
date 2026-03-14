import { useTranslations } from 'next-intl';
import React from 'react';
import AddOccasion from '../_components/add-occasion';

export default function Page() {
  // Translation
  const t = useTranslations('dashboard');
  return (
    <main>
      {/* Title */}
      <section className=" pt-4 md:pt-0 p-0">
        <h1 className="pb-6 font-inter text-2xl font-semibold capitalize text-zinc-800">
          {t('dashboard-occasion.occasion-add')}
        </h1>
      </section>
      {/* Add New Occasion */}
      <div className="rounded-md bg-white dark:bg-zinc-400">
        <AddOccasion />
      </div>
    </main>
  );
}

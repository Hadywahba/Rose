import React from 'react';
import MostPopularButton from './most-popular-button';
import MainHeading from './main-heading';
import { useTranslations } from 'next-intl';

import { SearchParams } from '@/lib/types/global';

type HomeProps = {
  searchParams: SearchParams;
};

export default function MostPopular({ searchParams }: HomeProps) {
  // Translation
  const t = useTranslations('homepage');

  return (
    <section className="w-full px-10 pb-4 sm:px-20">
      <div className="mx-auto flex w-full flex-col items-center justify-center gap-10 lg:flex lg:flex-row lg:items-center lg:justify-between">
        <MainHeading
          className="items-start justify-center text-start"
          paragraph={t('most-popular.most-popular-product')}
        />
        <MostPopularButton searchParams={searchParams} />
      </div>
    </section>
  );
}

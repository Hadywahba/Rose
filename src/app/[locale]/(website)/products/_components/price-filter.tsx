'use client';

import React, { useState } from 'react';
import { useTranslations } from 'use-intl';
import { useFilters } from '../_hooks/use-filter';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import PriceFilterInputs from './price-filter-inputs';

export default function PriceFilter() {
  // Translations
  const t = useTranslations('product-filter');

  // State
  const [resetFlag, setResetFlag] = useState(false);

  // Hook
  const { filters, resetFilter } = useFilters({
    'price[gte]': '',
    'price[lte]': '',
  });

  //  Functions
  const handleResetPrice = () => {
    resetFilter('price[gte]');
    resetFilter('price[lte]');
    setResetFlag(true);
  };

  const handleReset = () => {
    setResetFlag(false);
  };

  return (
    <section className="mb-8 w-full border-b-2 border-zinc-100 lg:w-[18.875rem]">
      <div className="flex w-full items-center justify-between pt-3">
        {/* Title */}
        <h2 className="text-lg font-semibold capitalize text-zinc-800 dark:text-zinc-50">
          {t('price')}
        </h2>

        {/* Rest Button */}
        {(filters['price[gte]'] ||
          filters['price[lte]'] ||
          (filters['price[gte]'] && filters['price[lte]'])) && (
          <Button
            onClick={handleResetPrice}
            className="w-fit gap-1 bg-transparent px-0 capitalize text-red-600 hover:bg-transparent dark:bg-transparent dark:text-red-500 dark:hover:bg-transparent"
          >
            <X className="text-red-600 dark:text-red-500" />
            reset
          </Button>
        )}
      </div>

      {/* Price Inputs */}

      <div className="mb-5">
        <PriceFilterInputs resetFlag={resetFlag} handleReset={handleReset} />
      </div>
    </section>
  );
}

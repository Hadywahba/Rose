import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import { useFilters } from '../_hooks/use-filter';
import { useDebounce } from 'use-debounce';

interface PriceFilterInputsProps {
  resetFlag: boolean;
  handleReset: () => void;
}

const DEBOUNCE_TIME = 1000;
export default function PriceFilterInputs({
  resetFlag,
  handleReset,
}: PriceFilterInputsProps) {
  // Translations
  const t = useTranslations('product-filter');

  // Hook
  const { filters, setFilter } = useFilters({
    'price[gte]': '',
    'price[lte]': '',
  });

  // State
  const [from, setFrom] = useState(filters['price[gte]'] ?? '');
  const [to, setTo] = useState(filters['price[lte]'] ?? '');

  // Variables
  const [debouncedFrom] = useDebounce(from, DEBOUNCE_TIME);
  const [debouncedTo] = useDebounce(to, DEBOUNCE_TIME);

  // Effect
  useEffect(() => {
    if (!resetFlag && debouncedFrom !== (filters['price[gte]'] || '')) {
      setFilter('price[gte]', debouncedFrom || null);
    }
  }, [debouncedFrom, setFilter, resetFlag, filters]);

  useEffect(() => {
    if (!resetFlag && debouncedTo !== (filters['price[lte]'] || '')) {
      setFilter('price[lte]', debouncedTo || null);
    }
  }, [debouncedTo, setFilter, resetFlag, filters]);

  useEffect(() => {
    if (resetFlag) {
      setFrom('');
      setTo('');
      handleReset();
    }
  }, [resetFlag, handleReset]);

  return (
    <section className="flex w-full flex-col items-center justify-center gap-2 sm:flex sm:flex-row sm:items-center sm:justify-between lg:w-[18.875rem]">
      {/* Price From */}
      <div className="w-full flex-1">
        {/* Label */}
        <Label className="font-inter text-sm font-medium">
          {t('price-from')}
        </Label>

        {/* Input */}
        <Input
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          type="number"
          className="w-full dark:text-zinc-50"
        />
      </div>

      {/* Price to */}
      <div className="w-full flex-1">
        {/* Label */}
        <Label className="font-inter text-sm font-medium">
          {t('price-to')}
        </Label>

        {/* Input */}
        <Input
          type="number"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="w-full dark:text-zinc-50"
        />
      </div>
    </section>
  );
}

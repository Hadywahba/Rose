'use client';

import { RotateCcw } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useFilters } from '../_hooks/use-filter';
import { Button } from '@/components/ui/button';
import { useRouter } from '@/i18n/navigation';

export default function ResetAll() {
  // Translations
  const t = useTranslations('product.filters');

  // Navigation
  const router = useRouter();

  // Hook
  const { filters } = useFilters({
    'priceAfterDiscount[gte]': '',
    'priceAfterDiscount[lte]': '',
    occasion: null,
    rateAvg: null,
    category: null,
  });

  //  Functions
  const handleResetAll = () => {
    // Reset both filters in one go
    const params = new URLSearchParams(window.location.search);
    params.delete('priceAfterDiscount[gte]');
    params.delete('priceAfterDiscount[lte]');
    params.delete('page');
    params.delete('occasion');
    params.delete('rateAvg');
    params.delete('category');

    router.push(`?${params.toString()}`);
  };

  return (
    <div className='mt-4'>
      {(filters['priceAfterDiscount[gte]'] ||
        filters['priceAfterDiscount[lte]'] ||
        (filters['priceAfterDiscount[gte]'] &&
          filters['priceAfterDiscount[lte]']) ||
        filters.category ||
        filters.occasion ||
        filters.rateAvg) && (
        <Button
          variant="primary"
          onClick={handleResetAll}
          className="flex h-10 w-full items-center justify-center gap-1 rounded-md px-4 py-2.5 text-sm text-white transition-colors"
        >
          <RotateCcw size={18} />
          <span>{t('resetAll')}</span>
        </Button>
      )}
    </div>
  );
}

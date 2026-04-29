import { Button } from '@/components/ui/button';
import { fetchAllProductsService } from '@/lib/actions/products/fetch-all-products.service';
import { SearchParams } from '@/lib/types/global';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import React, { ReactNode } from 'react';
import catchError from '@/lib/utility/catch-error';
import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ProductsResponse } from '@/lib/types/products/product';
import BestSellingProduct from './best-selling-product';

type ProductsListProps = {
  searchParams: SearchParams;
};

export default async function BestSelling({ searchParams }: ProductsListProps) {
  // Translations
  const t = await getTranslations('best-selling');

  // Hook
  const locale = await getLocale();

  const nextParams: SearchParams = {
    ...searchParams,
    page: searchParams?.page ?? '1', //default
    limit: searchParams?.limit ?? '20',
  };

  // Retrival
  const [payload] = await catchError<PaginatedResponse<ProductsResponse>>(() =>
    fetchAllProductsService(nextParams),
  );
  if (!payload) {
    return null;
  }

  // Variables
  const products = payload?.payload?.data ?? [];

  return (
    <section className="mx-auto mb-20 grid w-full grid-cols-1 items-start justify-between gap-4 px-10 pb-6 sm:px-20 md:grid-cols-12">
      {/* Left Content */}
      <div className="col-span-12 md:col-span-3">
        <p className="mb-3 font-sarabun text-lg font-bold uppercase tracking-[0.25em] text-softpink-500 dark:text-softpink-200">
          {t('label')}
        </p>

        <h2 className="text-3xl font-bold text-maroon-700 dark:text-maroon-300">
          {t.rich('title', {
            checkOut: (chunks: ReactNode) => (
              <span className="text-softpink-500 dark:text-softpink-200">
                {chunks}
              </span>
            ),
            buying: (chunks: ReactNode) => (
              <span className="text-softpink-500 dark:text-softpink-200">
                {chunks}
              </span>
            ),
          })}
        </h2>
        {/* DESCRIPTION */}
        <p className="text-base text-zinc-500 dark:text-zinc-100">
          {t('text')}
          <br />
          {t('description')}
        </p>

        <Link href={'/products'}>
          <Button variant="primary" className="mt-10 capitalize">
            {locale === 'en' ? <ArrowRight /> : <ArrowLeft />}
            {t('btn-text')}
          </Button>
        </Link>
      </div>

      <div className="col-span-12 md:col-span-9">
        <BestSellingProduct products={products} />
      </div>
    </section>
  );
}

import ProductYouMayLiked from '@/components/shared/product-you-may-liked';
import { SearchParams } from '@/lib/types/global';
import React from 'react';

export default async function layout({
  children,
  summary,
  searchParams,
}: Readonly<{
  children: React.ReactNode;
  summary: React.ReactNode;
  searchParams: SearchParams;
}>) {
  return (
    <main>
      <div className="grid min-h-screen w-full grid-cols-1 gap-10 px-4 pt-16 md:px-0 lg:grid-cols-12 lg:px-20">
        {/* Children */}
        <section className="mx-auto w-full lg:col-span-7 lg:max-w-[48.875rem] xl:max-w-none">
          {children}
        </section>

        {/* Parallel Route */}
        <aside className="mx-auto w-full lg:col-span-5 lg:max-w-[28.625rem]">
          {summary}
        </aside>
      </div>

      <div>
        <ProductYouMayLiked searchParams={searchParams} />
      </div>
    </main>
  );
}

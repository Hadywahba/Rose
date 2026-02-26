import React from 'react';
import LowStockColumn from './low-stock-column';
import TopSellingColumn from './top-selling-column';

export default function TopSellingSection() {
  return (
    <div className="fixed bottom-0 right-0 h-[440px] w-3/4 bg-red-50">
      <section className='p-6 grid grid-cols-2 gap-6'>
        <TopSellingColumn />
        <LowStockColumn />
      </section>
    </div>
  );
}

import React from 'react';
import LowStockColumn from './low-stock-column';
import TopSellingColumn from './top-selling-column';
import { getTopProducts } from '@/lib/services/dashboard/get-top-products.service';

export default async function TopSellingSection() {

  const products = await getTopProducts();

  const topSelling = [...products].sort((a, b) => b.sold - a.sold);
  const lowStock = [...products].sort((a, b) => a.quantity - b.quantity);
  
  return (
    <div className="fixed bottom-0 right-0 h-[440px] w-3/4 bg-red-50">
      <section className='p-6 grid grid-cols-2 gap-6'>
        <TopSellingColumn products={topSelling} />
        <LowStockColumn products={lowStock} />
      </section>
    </div>
  );
}

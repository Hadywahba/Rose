import React from 'react';
import LowStockColumn from './low-stock-column';
import TopSellingColumn from './top-selling-column';
import { getTopProducts } from '@/lib/services/dashboard/get-top-products.service';

export default async function TopSellingSection() {
  // Fetch products data
  const products = await getTopProducts();

  // Sort products for top selling and low stock
  const topSelling = [...products].sort((a, b) => b.sold - a.sold).slice(0, 10);
  const lowStock = [...products].sort((a, b) => a.quantity - b.quantity).slice(0, 10);

  return (
    // TODO: remove this div
    <div className="fixed bottom-0 right-0 h-[440px] w-3/4 bg-zinc-50">
      <section className="grid grid-cols-2 gap-6 p-6">
        <TopSellingColumn products={topSelling} />
        <LowStockColumn products={lowStock} />
      </section>
    </div>
  );
}

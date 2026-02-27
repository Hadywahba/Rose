import { TopProducts } from '@/lib/types/products/product';
import { cn } from '@/lib/utility/tailwind-merge';
import React from 'react';

const rankColors = [
  'bg-gradient-to-r from-[hsla(45,82%,48%,0.25)] to-[hsla(45,82%,48%,0.1)]', // 🥇 Gold
  'bg-gradient-to-r from-slate-500/25 to-slate-500/10', // 🥈 Silver
  'bg-gradient-to-r from-[hsla(28,100%,28%,0.25)] to-[hsla(28,100%,28%,0.1)]', // 🥉 Bronze
];

export default function TopSellingColumn({
  products,
}: {
  products: TopProducts[];
}) {
  return (
    <div className="flex flex-col gap-6 bg-white p-6">
      {/* title */}
      <p className="text-2xl font-semibold text-zinc-800">
        Top Selling Products
      </p>

      <div className="no-scrollbar flex max-h-[300px] flex-col gap-3 overflow-y-auto pr-2">
        {products.map((product, index) => (
          <div
            key={product._id}
            className={cn(
              'flex items-center justify-between rounded p-2',
              rankColors[index] ?? 'bg-zinc-100',
            )}
          >
            <p
              className={cn(
                index === 0
                  ? 'font-semibold'
                  : index === 1 || index === 2
                    ? 'font-medium'
                    : 'font-normal',
              )}
            >
              {product.title}{' '}
              <span className="text-sm font-normal">({product.price} EGP)</span>
            </p>
            <p className="font-bold">
              {product.sold} <span className="font-medium">Sales</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

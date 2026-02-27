import { TopProducts } from '@/lib/types/products/product';
import { cn } from '@/lib/utility/tailwind-merge';
import React from 'react';

export default function LowStockColumn({
  products,
}: {
  products: TopProducts[];
}) {
  return (
    <div className="flex flex-col gap-6 bg-white p-6 text-zinc-800">
      {/* title */}
      <p className="text-2xl font-semibold">Low Stock Products</p>

      {/* low stock products */}
      <div className="no-scrollbar flex max-h-[21.25rem] flex-col gap-3 overflow-y-auto pr-2">
        {products.map((product) => (
          <div
            key={product._id}
            className="flex items-center justify-between rounded border-b p-2"
          >
            <p>{product.title}</p>
            <p
              className={cn(
                'text-sm font-medium',
                product.quantity < 5 ? 'text-red-600' : 'text-zinc-800',
              )}
            >
              {product.quantity} <span>products</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

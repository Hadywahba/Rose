import { TopProducts } from '@/lib/types/products/product';
import React from 'react';

export default function TopSellingColumn({ products }: { products: TopProducts[] }) {
  return (
    <div className="flex flex-col gap-6">
      {/* title */}
      <p className="text-2xl font-semibold text-zinc-800">
        Top Selling Products
      </p>
      
      {/* top selling products */}
      {products.map((product) => (
        <div key={product._id} className="column flex flex-col gap-3">
          <div className="flex items-center justify-between rounded bg-zinc-100 p-2">
            <p>
              {product.title} <span>({product.price} EGP)</span>
            </p>
            <p>
              {product.sold} <span>Sales</span>
            </p>
          </div>
        </div>
      ))}

    </div>
  );
}

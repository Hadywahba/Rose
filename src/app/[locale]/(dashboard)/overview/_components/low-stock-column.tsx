import { TopProducts } from '@/lib/types/products/product'
import React from 'react'

export default function LowStockColumn({ products }: { products: TopProducts[] }) {
  return (
    <div className="flex flex-col p-6 gap-6 bg-white">
      {/* title */}
      <p className="text-2xl font-semibold text-zinc-800">
        Low Stock Products
      </p>
      
      {/* low stock products */}
      {products.map((product) => (
        <div key={product._id} className="column flex flex-col gap-3">
          <div className="flex items-center justify-between rounded bg-zinc-100 p-2">
            <p>
              {product.title} <span>({product.price} EGP)</span>
            </p>
            <p>
              {product.quantity} <span>Items Left</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

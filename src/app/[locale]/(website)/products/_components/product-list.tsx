"use client"
import React from 'react'
import { UseProduct } from '../_hooks/use-product'
import ProductCard from './product-card'

export default function ProductList() {
  const {product} = UseProduct()
  console.log(product)
  return (
    <div className="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 ">
          <ProductCard />
        </div>
  )
}

import React from 'react'
import LowStockColumn from './low-stock-column'
import TopSellingColumn from './top-selling-column'

export default function TopSellingSection() {
  return (
    <section>
      <TopSellingColumn />
      <LowStockColumn/>
    </section>
  )
}

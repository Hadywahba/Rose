import React from 'react';

export default function TopSellingColumn() {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-2xl font-semibold text-zinc-800">
        Top Selling Products
      </p>
      <div className="column flex flex-col gap-3">
        <div className="flex items-center justify-between rounded bg-zinc-100 p-2">
          <p>
            25 Red Roses | Black Wrap <span>(1,999 EGP)</span>
          </p>
          <p>
            5011 <span>Sales</span>
          </p>
        </div>
        <div className="flex items-center justify-between bg-zinc-100 p-2">
          <span>25 Red Roses | Black Wrap (1,999 EGP)</span>
          <span>5011 Sales</span>
        </div>
      </div>
    </div>
  );
}

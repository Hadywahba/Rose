// ProductsSkeleton.tsx

import ProductCardSkeleton from '@/components/skeletons/product/product-card-skeleton';

export default function ProductsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
    </div>
  );
}

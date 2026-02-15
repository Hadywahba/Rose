import React from 'react';
import ReviewsSection from './_components/reviews-section';
import ProductDetailsUpper from './_components/product-details-upper';
import { getProductById } from '@/lib/services/product/product.service';

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const productId = params.id;
  const payload = await getProductById(productId);

  return (
    <div>
      <ProductDetailsUpper product={payload.product} />
      <ReviewsSection productId={productId} />
    </div>
  );
}

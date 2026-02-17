import React from 'react';
import ReviewsSection from './_components/reviews-section';
import ProductDetailsUpper from './_components/product-details-upper';
import { getProductById } from '@/lib/services/product/product.service';
import { ErrorMessage } from '@/components/error/error-message';

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const productId = params.id;
  const payload = await getProductById(productId);

  if ('error' in payload) {
    return (
      <div className="container mx-auto flex w-11/12 flex-col gap-10 py-10">
        <ErrorMessage message={payload.error} />
      </div>
    );
  }

  return (
    <div className="container mx-auto flex w-11/12 flex-col gap-10 py-10">
      <ProductDetailsUpper product={payload.product} />
      <ReviewsSection productId={productId} />
    </div>
  );
}

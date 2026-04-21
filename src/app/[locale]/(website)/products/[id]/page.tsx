import React from 'react';
import ReviewsSection from './_components/reviews-section';
import ProductDetailsUpper from './_components/product-details-upper';

import catchError from '@/lib/utility/catch-error';
import { fetchProductsById } from '@/lib/actions/products/fetch-product-id.service';
import { ProductIdResponse } from '@/lib/types/products/product';
import ListError from '@/components/error/list-error';

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const productId = params.id;

  const [payload, error] = await catchError<ProductIdResponse>(() =>
    fetchProductsById(productId),
  );

  const products = payload?.payload.product;
  console.log(products);

  return (
    <ListError errors={error}>
      <div className="container mx-auto flex w-11/12 flex-col gap-10 py-10">
        {products && <ProductDetailsUpper product={products} />}
        <ReviewsSection
          productId={productId}
          categoryId={String(products?.category.id)}
        />
      </div>
    </ListError>
  );
}

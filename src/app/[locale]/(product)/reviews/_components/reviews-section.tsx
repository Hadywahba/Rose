"use client";
import { ProductsReviews } from './product-reviews';
import RelatedProducts from './related-products';

export default function ReviewsSection() {
  
  const productId = '673e2e1f1159920171828153';
  
  return (
    <section className="container mx-auto flex w-11/12 flex-col py-10">
      <ProductsReviews productId={productId} />
      <RelatedProducts productId={productId} />
    </section>
  );
}

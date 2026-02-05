"use client";
import { ProductsReviews } from './product-reviews';
import RelatedProducts from './related-products';

export default function ReviewsSection() {
  
  return (
    <section className="container mx-auto flex w-11/12 flex-col py-10">
      <ProductsReviews />
      <RelatedProducts />
    </section>
  );
}

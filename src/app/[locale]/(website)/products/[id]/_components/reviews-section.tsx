import { ProductsReviews } from './product-reviews';
import RelatedProducts from './related-products';

type ReviewsSectionProps = {
  productId: string;
};

export default function ReviewsSection({ productId }: ReviewsSectionProps) {
  return (
    <section className="flex w-full flex-col gap-10">
      <ProductsReviews productId={productId} />
      <RelatedProducts productId={productId} />
    </section>
  );
}

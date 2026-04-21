import { ProductsReviews } from './product-reviews';
import RelatedProducts from './related-products';

type ReviewsSectionProps = {
  productId: string;
  categoryId: string;
};

export default function ReviewsSection({
  productId,
  categoryId,
}: ReviewsSectionProps) {
  return (
    <section className="flex w-full flex-col gap-10">
      <ProductsReviews productId={productId} />
      <RelatedProducts categoryId={categoryId} productId={productId} />
    </section>
  );
}

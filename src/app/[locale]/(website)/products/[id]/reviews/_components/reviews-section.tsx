import { ProductsReviews } from './product-reviews';
import RelatedProducts from './related-products';

type ReviewsSectionProps = {
  productId: string;
};

export default function ReviewsSection({ productId }: ReviewsSectionProps) {
  return (
    <section className="container mx-auto flex w-11/12 flex-col py-10">
      <ProductsReviews productId={productId} />
      <RelatedProducts productId={productId} />
    </section>
  );
}

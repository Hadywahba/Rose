import { cn } from '@/lib/utility/tailwind-merge';

import { Rating } from '@/components/ui/rating';
import { Separator } from '@/components/ui/separator';
import { Review } from '@/lib/types/products/reviews/reviews-response';
import { Star } from 'lucide-react';
import { useProductReviews } from '../_hooks/use-product-reviews';
import ReviewItem from './review-item';
import ReviewForm from './review-form';


interface ProductsReviewsProps {
  //  productId: string;
  reviews?: Review[];
  className?: string;
}

const productId = '673e2e1f1159920171828153';

export function ProductsReviews({
  // productId,
  className,
}: ProductsReviewsProps) {
  const {
    data: fetchedReviews,
    isLoading,
    isError,
  } = useProductReviews(productId,);

  const averageRating =
    fetchedReviews && fetchedReviews.length > 0
      ? fetchedReviews.reduce((sum, review) => sum + review.rating, 0) /
        fetchedReviews.length
      : 0;

if (isLoading) return <p className="py-8 text-center">Loading reviews...</p>;
if (isError)
  return (
    <p className="py-8 text-center text-red-500">Failed to load reviews.</p>
  );
if (!fetchedReviews || fetchedReviews.length === 0) {
  return (
    <section className={cn('py-16 md:py-24', className)}>
      <div className="container max-w-3xl">
        <p className="py-8 text-center text-zinc-500">
          No reviews <Star className="inline-block mx-1 size-4 stroke-orange-400 fill-orange-400" /> yet. Be the first to review!
        </p>
      </div>
    </section>
  );
}

  return (
    <section className={cn('py-16 md:py-24', className)}>
      <div className="container px-10">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold tracking-tight text-zinc-800 md:text-2xl">
            General rating:
          </h2>
          <div className="mt-2 flex flex-col gap-1">
            <span className="text-2xl font-bold text-zinc-800">
              {averageRating.toFixed(1)}{' '}
              <span className="text-sm font-medium text-zinc-500">
                ({fetchedReviews.length} ratings)
              </span>
            </span>
            <Rating rate={averageRating} className="[&_svg]:size-5" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 border-t py-5">
          {/* Reviews List */}
          <div className="space-y-0">
            {fetchedReviews.map((review, index) => (
              <div key={review._id}>
                {index > 0 && <Separator className="my-6" />}
                <ReviewItem review={review} />
              </div>
            ))}
          </div>

          <ReviewForm productId={productId} />
        </div>
      </div>
    </section>
  );
}

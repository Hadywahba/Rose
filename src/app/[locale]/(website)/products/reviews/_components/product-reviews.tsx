import MainHeading from '../../../(home)/_components/main-heading';
import { Rating } from '@/components/ui/rating';
import { Separator } from '@/components/ui/separator';
import { Star } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useProductReviews } from '../_hooks/use-product-reviews';
import ReviewForm from './review-form';
import ReviewItem from './review-item';

export function ProductsReviews({ productId }: { productId: string }) {
  // Translations
  const t = useTranslations('reviews');

  // Hooks
  const { data: fetchedReviews, isError } = useProductReviews(productId);

  const averageRating =
    fetchedReviews && fetchedReviews.length > 0
      ? fetchedReviews.reduce((sum, review) => sum + review.rating, 0) /
        fetchedReviews.length
      : 0;

  // Error
  if (isError)
    return <p className="py-8 text-center text-red-500">{t('errorLoading')}</p>;

  return (
    <section className="p-5">
      <div className="container px-10">
        {/* Title */}
        <MainHeading
          className="mb-2 items-start text-start"
          paragraph={t('title')}
        />

        {fetchedReviews && fetchedReviews.length > 0 ? (
          <>
            {/* Rating Summary */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold tracking-tight text-zinc-800 md:text-2xl">
                {t('generalRating')}
              </h2>
              <div className="mt-2 flex flex-col gap-1">
                <span className="text-2xl font-bold text-zinc-800">
                  {averageRating.toFixed(1)}{' '}
                  <span className="text-sm font-medium text-zinc-500">
                    ({fetchedReviews.length} {t('ratingsCount')})
                  </span>
                </span>
                <Rating rate={averageRating} className="[&_svg]:size-5" />
              </div>
            </div>

            {/* Reviews Grid */}
            <div className="grid grid-cols-1 gap-8 border-t pt-4 lg:grid-cols-2">
              {/* Reviews List - Scrollable */}
              <div className="max-h-96 space-y-2 overflow-y-auto pe-4">
                {fetchedReviews.map((review, index) => (
                  <div key={review._id}>
                    {index > 0 && <Separator className="mb-6" />}
                    <ReviewItem review={review} />
                  </div>
                ))}
              </div>

              {/* Review Form */}
              <ReviewForm productId={productId} />
            </div>
          </>
        ) : (
          // No reviews
          <div className="grid grid-cols-1 gap-8 border-t pt-8 lg:grid-cols-2">
            <p className="flex items-center justify-center gap-2 text-zinc-500">
              {t('noReviews')}
              <Star className="size-4 fill-orange-400 stroke-orange-400" />
            </p>
            <ReviewForm productId={productId} />
          </div>
        )}
      </div>
    </section>
  );
}

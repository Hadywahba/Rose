import { Rating } from '@/components/ui/rating';
import { Separator } from '@/components/ui/separator';
import { Star } from 'lucide-react';
import ReviewItem from './review-item';
import { getLocale, getTranslations } from 'next-intl/server';
import MainHeading from '@/app/[locale]/(website)/(home)/_components/main-heading';
import { getReviewProduct } from '../_hooks/get-review';
import { displayUserProfile } from '../../../profile/_hooks/get-profile';
import AddReview from './add-review';

export async function ProductsReviews({ productId }: { productId: string }) {
  // Translations
  const t = await getTranslations('reviews');
  const locale = await getLocale();

  // Query (Product)
  const fetchedReviews = await getReviewProduct(productId);

  // Query (Profile)
  const currentUser = await displayUserProfile();

  // Variables
  const reviews = fetchedReviews?.data ?? [];

  const averageRating =
    fetchedReviews && reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  // Format numbers based on locale
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat(locale === 'ar' ? 'ar-EG' : 'en-US', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(num);
  };

  const formatCount = (count: number) => {
    return new Intl.NumberFormat(locale === 'ar' ? 'ar-EG' : 'en-US').format(
      count,
    );
  };

  // Error
  if (fetchedReviews === null || fetchedReviews === undefined) {
    return (
      <p className="py-8 text-center text-red-500">{t('error-loading')}</p>
    );
  }

  return (
    <section className="p-5">
      <div className="container px-10">
        {/* Title */}
        <MainHeading
          className="mb-2 items-start text-start"
          paragraph={t('title')}
        />

        {fetchedReviews && reviews.length > 0 ? (
          <>
            {/* Rating Summary */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-50 md:text-2xl">
                {t('general-rating')}
              </h2>
              <div className="mt-2 flex flex-col gap-1">
                <span className="text-2xl font-bold text-zinc-800 dark:text-zinc-50">
                  {formatNumber(averageRating)}{' '}
                  <span className="text-sm font-medium text-zinc-500 dark:text-zinc-200">
                    ({formatCount(reviews.length)} {t('ratings-count')})
                  </span>
                </span>
                <Rating rate={averageRating} className="[&_svg]:size-5" />
              </div>
            </div>

            {/* Reviews Grid */}
            <div className="grid grid-cols-1 gap-8 border-t pt-4 dark:border-zinc-50 lg:grid-cols-2">
              {/* Reviews List - Scrollable */}
              <div className="max-h-96 space-y-2 overflow-y-auto pe-4">
                {reviews.map((review, index) => (
                  <div key={review.id}>
                    {index > 0 && (
                      <Separator className="mb-6 dark:bg-zinc-50" />
                    )}
                    <ReviewItem
                      review={review}
                      formatNumber={formatNumber}
                      currentUser={currentUser}
                    />
                  </div>
                ))}
              </div>

              {/* Review Form */}
              <AddReview productId={productId} />
            </div>
          </>
        ) : (
          // No reviews
          <div className="grid grid-cols-1 gap-8 border-t pt-8 lg:grid-cols-2">
            <p className="flex items-center justify-center gap-2 text-zinc-500">
              {t('noReviews')}
              <Star className="size-4 fill-orange-400 stroke-orange-400" />
            </p>
            <AddReview productId={productId} />
          </div>
        )}
      </div>
    </section>
  );
}

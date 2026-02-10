'use client';

import { cn } from '@/lib/utility/tailwind-merge';
import { Star } from 'lucide-react';
import { useLocale } from 'next-intl';

const MAX_STARS = 5;

interface RatingProps {
  rate: number;
  className?: string;
  showScore?: boolean;
  description?: string;
}

const Rating = ({ rate, className, showScore, description }: RatingProps) => {
  const locale = useLocale();
  const isRTL = locale === 'ar';

  if (!rate) return null;

  const renderStars = () => {
    const fullStars = Math.floor(rate);
    const hasHalfStar = rate % 1 >= 0.5;
    const emptyStars = MAX_STARS - fullStars - (hasHalfStar ? 1 : 0);

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`rating-star-full-${i}`}
          className="fill-orange-400 stroke-orange-400"
        />,
      );
    }

if (hasHalfStar) {
  stars.push(
    <div key="rating-half-star" className="relative size-5">
      {/* Empty star (background) */}
      <Star className="absolute inset-0 stroke-orange-400/15" />

      {/* Filled half */}
      <div
        className={cn(
          'absolute inset-0 overflow-hidden',
          isRTL ? 'left-1/2 w-1/2' : 'left-0 w-1/2',
        )}
      >
        <Star className="fill-orange-400 stroke-orange-400" />
      </div>
    </div>,
  );
}


    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star
          key={`rating-star-empty-${i}`}
          className="stroke-orange-400/15"
        />,
      );
    }

    return stars;
  };

  // If only score is shown (no description), use horizontal layout
  if (showScore && !description) {
    return (
      <div
        className={cn(
          'flex items-center gap-2 [&>div]:size-5 [&_svg]:size-5',
          className,
        )}
      >
        {renderStars()}
        <span className="text-sm font-semibold">{rate.toFixed(1)}</span>
      </div>
    );
  }

  // If description is provided, use vertical layout
  if (description) {
    return (
      <div className={cn('flex flex-col gap-1', className)}>
        <div className="flex items-center gap-2 [&>div]:size-5 [&_svg]:size-5">
          {renderStars()}
          {showScore && (
            <span className="text-sm font-semibold">{rate.toFixed(1)}</span>
          )}
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    );
  }

  // Default: just stars
  return (
    <div
      className={cn(
        'flex items-center gap-1 [&>div]:size-5 [&_svg]:size-5',
        className,
      )}
    >
      {renderStars()}
    </div>
  );
};

export { Rating };

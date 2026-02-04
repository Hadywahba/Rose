'use client';

import { Star, StarHalf } from 'lucide-react';

import { cn } from '@/lib/utility/tailwind-merge';

const MAX_STARS = 5;

interface RatingProps {
  rate: number;
  className?: string;
  showScore?: boolean;
  description?: string;
}

const Rating = ({ rate, className, showScore, description }: RatingProps) => {
  if (!rate) return;

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
        <div key="rating-half-star" className="relative">
          <StarHalf className="absolute right-0 top-0 fill-orange-400 stroke-orange-400" />
          <StarHalf className="absolute left-0 top-0 -scale-x-100 stroke-orange-400/15" />
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
          'flex items-center gap-2 [&_svg]:size-5 [&>div]:size-5',
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
        <div className="flex items-center gap-2 [&_svg]:size-5 [&>div]:size-5">
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
        'flex items-center gap-1 [&_svg]:size-5 [&>div]:size-5',
        className,
      )}
    >
      {renderStars()}
    </div>
  );
};

export { Rating };

'use client';

import { Star } from 'lucide-react';
import { cn } from '@/lib/utility/tailwind-merge';
import { useState } from 'react';

const MAX_STARS = 5;

interface InteractiveRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  className?: string;
}

const InteractiveRating = ({
  rating,
  onRatingChange,
  className,
}: InteractiveRatingProps) => {
  const [hoverRating, setHoverRating] = useState(0);

  const displayRating = hoverRating || rating;

  return (
    <div
      className={cn(
        'flex items-center gap-1 [&>div]:size-5 [&_svg]:size-5',
        className,
      )}
    >
      {[...Array(MAX_STARS)].map((_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= displayRating;

        return (
          <button
            aria-label={`Rating ${starValue} out of ${MAX_STARS}`}
            key={`star-${index}`}
            type="button"
            onClick={() => onRatingChange(starValue)}
            onMouseEnter={() => setHoverRating(starValue)}
            onMouseLeave={() => setHoverRating(0)}
            className="cursor-pointer transition-colors hover:scale-110"
          >
            <Star
              className={cn(
                'transition-colors',
                isFilled
                  ? 'fill-orange-400 stroke-orange-400'
                  : 'stroke-orange-400/30 hover:stroke-orange-400/60',
              )}
            />
          </button>
        );
      })}
    </div>
  );
};

export { InteractiveRating };

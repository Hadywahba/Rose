'use client';
import React, { useState } from 'react';
import StarItem from './star-item';
import { useFilters } from '../../_hooks/use-filter';

export default function RatingFilterList() {
  // Hook
  const { filters, setFilter, resetFilter } = useFilters({ minRating: null });

  // State
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  // Variables
  const activeRating = filters.minRating ? Number(filters.minRating) : null;

  // Function
  const handleRatingClick = (rateAvg: number) => {
    if (activeRating === rateAvg) {
      resetFilter('minRating'); // reset this filter
    } else {
      setFilter('minRating', rateAvg.toString());
    }
  };

  return (
    <div className="flex flex-row items-center gap-2">
      {[1, 2, 3, 4, 5].map((rating) => (
        <StarItem
          key={rating}
          rating={rating}
          active={activeRating !== null && activeRating >= rating}
          hoverActive={hoverRating !== null && hoverRating >= rating}
          onMouseEnter={() => setHoverRating(rating)}
          onMouseLeave={() => setHoverRating(null)}
          onClick={() => handleRatingClick(rating)}
        />
      ))}
    </div>
  );
}

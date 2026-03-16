'use client';
import React, { useState } from 'react';
import StarItem from './star-item';
import { useFilters } from '../../_hooks/use-filter';

export default function RatingFilterList() {
  // Hook
  const { filters, setFilter, resetFilter } = useFilters({ rateAvg: null });

  // State
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  // Variables
  const activeRating = filters.rateAvg ? Number(filters.rateAvg) : null;

  // Function
  const handleRatingClick = (rateAvg: number) => {
    if (activeRating === rateAvg) {
      resetFilter('rateAvg'); // reset this filter
    } else {
      setFilter('rateAvg', rateAvg.toString());
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

'use client';

import { useSession } from 'next-auth/react';
import ReviewFormSkeleton from '@/components/skeletons/product/product-form-skeleton';
import ReviewFormTitle from './review-form-title';
import ReviewForm from './review-form';

interface AddReviewProps {
  productId: string;
}

export default function AddReview({ productId }: AddReviewProps) {
  // Session
  const { status } = useSession();

  // Variables
  const isLoading = status === 'loading';
  const isUnauthenticated = status === 'unauthenticated';

  // Loading
  if (isLoading) {
    return <ReviewFormSkeleton />;
  }

  return (
    <div className="relative col-span-1 border-s ps-4 dark:border-zinc-50">
      {/* Overlay لو مش مسجل دخول */}
      {isUnauthenticated && <ReviewFormTitle />}

      {/* Form */}
      <div className={isUnauthenticated ? 'pointer-events-none blur-sm' : ''}>
        <ReviewForm productId={productId} />
      </div>
    </div>
  );
}

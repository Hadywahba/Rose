import React from 'react'
import ReviewsSection from './reviews/_components/reviews-section';

export default function page() {
  // TODO: Get this productId dynamically based on the product page
  const productId = '673e2e1f1159920171828153';
  return (
    <>
      <ReviewsSection productId={productId} />
    </>
  );
}

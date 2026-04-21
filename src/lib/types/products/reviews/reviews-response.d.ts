export interface ReviewsResponse {
  metadata: Metadata;
  data: Review[];
}

export interface Review {
  id: string;
  userId: string;
  productId: string;
  headline: string;
  content: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  user: User;
  product: ReviewProduct;
}

export interface ReviewProduct {
  id: string;
  title: string;
}

export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
}

export interface AddReviewResponse {
  review: Review;
}

export interface Product {
  _id: string;
  title: string;
  slug: string;
  description: string;
  imgCover: string;
  images: string[];
  price: number;
  priceAfterDiscount: number;
  quantity: number;
  category: string;
  occasion: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  isSuperAdmin: boolean;
  sold: number;
  rateAvg: number;
  rateCount: number;
  favoriteId: string | null;
  isInWishlist: boolean;
}

export interface Metadata {
  currentPage: number;
  limit: number;
  totalPages: number;
  totalItems: number;
}

export interface ProductsResponse {
  metadata: Metadata;
  products: Product[];
}

export interface TopProductsResponse {
  product: Pick<Product, "_id" | "title" | "sold" | "quantity" | "price">;
}
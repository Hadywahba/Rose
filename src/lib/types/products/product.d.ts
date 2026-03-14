export interface Product {
  _id: string;
  id?: string;
  title: string;
  slug: string;
  description: string;
  imgCover: string;
  images: string[];
  price: number;
  discount?: number;
  priceAfterDiscount: number;
  quantity: number;
  category: string;
  occasion: string;
  isSuperAdmin: boolean;
  rateAvg: number;
  rateCount: number;
  reviews?: unknown[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  sold?: number;
  favoriteId?: string | null;
  isInWishlist?: boolean;
}

export interface AddProductResponse {
  product: Product;
}

export interface UpdateProductResponse {
  product: Product;
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

export type TopProducts = Pick<
  Product,
  "_id" | "title" | "sold" | "quantity" | "price"
>;

export interface TopProductsResponse {
  metadata: Metadata;
  products: TopProducts[];
}
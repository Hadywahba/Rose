import { Occasion } from '../occasion/occasion';

export interface ProductCategory {
  id: string;
  title: string;
}

export interface ProductCount {
  reviews: number;
  cartItems: number;
  wishlistItems: number;
}
export type WhishlistCheck = {
  message: string;
  isInWishlist: boolean;
};

export interface Product {
  id: string;
  title: string;
  description: string;
  rating: number;
  ratings: number;
  stock: number;
  price: string;
  discountType: string;
  discountValue: string;
  cover: string;
  gallery: string;
  categoryId: string;
  subCategoryId: string | null;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
  category: ProductCategory;
  subCategory: ProductCategory | null;
  occasions: Occasion[];
  _count: ProductCount;
}
export interface AddProductResponse {
  product: Product;
}

export interface UpdateProductResponse {
  product: Product;
}
export interface ProductsResponse {
  metadata: MetaData;
  data: Product[];
}

export type TopProducts = Pick<
  Product,
  'id' | 'title' | 'sold' | 'stock' | 'price' | 'rating' | 'ratings'
>;

export interface DashboardProductsResponse {
  metadata: Metadata;
  products: TopProducts[];
}

export interface ProductIdResponse {
  product: Product;
}

declare type AddToWishlistResponse = {
  wishlistItem: WishlistItem;
};

declare type WishlistItem = {
  id: string;
  userId: string;
  productId: string;
  createdAt: string;
  product: WishlistProduct;
};

declare type WishlistProduct = {
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
  subCategory: ProductSubCategory | null;
  occasions: Occasion[];
  _count: ProductCount;
};

declare type ProductCategory = {
  id: string;
  title: string;
};

declare type ProductSubCategory = {
  id: string;
  title: string;
};

declare type ErrorWishlistResponse = {
  message: string;
  status: false;
  code: number;
};

declare type SuccessWishlistResponse = {
  status: true;
  code: number;
};

export interface GetWishlistResponse {
  wishlistItems: WishlistItem[];
}

declare type ApiWishlistResponseResponse =
  | ErrorWishlistResponse
  | SuccessWishlistResponse;

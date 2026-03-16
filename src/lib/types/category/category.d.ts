export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  isSuperAdmin: boolean;
  productsCount: number;
}

export interface Metadata {
  currentPage: number;
  limit: number;
  totalPages: number;
  totalItems: number;
}

export type CurrentCategory = Category;

export type Categories = {
  categories: Category[];
};

export interface CurrentCategoryResponse {
  category: CurrentCategory;
  productsCount: number;
}

export interface CategoriesResponse {
  message?: string;
  metadata: Metadata;
  categories: Category[];
}

export type TransFn = {
  (id: string, params?: Record<string, unknown>): string;
  has: (id: string) => boolean;
};


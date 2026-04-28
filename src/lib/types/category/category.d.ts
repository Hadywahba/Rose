export interface CategoryCount {
  products: number;
}
export interface Category {
  id: string;
  title: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  immutable: boolean;
  _count: CategoryCount;
  subCategories: SubCategory[];
}

export interface SubCategory {
  id: string;
  title: string;
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
  metadata: Metadata;
  data: Category[];
}

export type TransFn = {
  (id: string, params?: Record<string, unknown>): string;
  has: (id: string) => boolean;
};

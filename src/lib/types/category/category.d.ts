export type Category = {
  _id: string;
  name: string;
  slug: string;
  image: string;
  isSuperAdmin: boolean;
  productsCount: number;
    createdAt: string;
  updatedAt: string;
} & DataBaseProbs;

export type Categories = {
  categories: Category[];
};


export interface CurrentCategoryResponse {
  category: CurrentCategory;
  productsCount: number;
}

export interface CategoryMetadata {
  currentPage: number;
  limit: number;
  totalPages: number;
  totalItems: number;
}

export interface CategoriesResponse {
  message: string;
  metadata: CategoryMetadata;
  categories: Category[];
}

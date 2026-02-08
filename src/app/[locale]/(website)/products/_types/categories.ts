export type Category = {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  isSuperAdmin: boolean;
  productsCount: number;
};

export type CategoriesMetadata = {
  currentPage: number;
  limit: number;
  totalPages: number;
  totalItems: number;
};

export type CategoriesResponse = {
  message: string;
  metadata: CategoriesMetadata;
  categories: Category[];
};

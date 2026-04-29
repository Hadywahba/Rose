import { Occasion } from '../../occasion/occasion';

export interface RelatedProduct {
  id: string;
  title: string;
  description: string;
  rating: number;
  ratings: number;
  stock: number;
  price: string;
  discountType: 'PERCENT' | 'FIXED';
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

export interface RelatedProductsResponse {
  category: CategoryWithProducts;
}

export interface CategoryWithProducts {
  id: string;
  title: string;
  description: string;
  image: string;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
  subCategories: unknown[];
  products: RelatedProduct[];
  _count: {
    products: number;
    subCategories: number;
  };
}

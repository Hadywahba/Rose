import { JSON_HEADER } from '@/lib/constants/api.constant';
import { CategoriesResponse } from '@/lib/types/category/category.d';

export const getCategories = async (limit: number, page: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/categories?limit=${limit}&page=${page}`,
    {
      method: 'GET',
      headers: { ...JSON_HEADER },
    },
  );
  const payload: ApiResponse<CategoriesResponse> = await response.json();
  return payload;
};

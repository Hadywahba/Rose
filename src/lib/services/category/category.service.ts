import { JSON_HEADER } from '@/lib/constants/api.constant';
import { CategoriesResponse } from '@/lib/types/category/category';

export const getCategories = async (limit: number = 100, page: number = 1) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/categories?limit=${limit}&page=${page}`,
    {
      method: 'GET',
      headers: {
        ...JSON_HEADER,
      },
    },
  );

  const payload: ApiResponse<CategoriesResponse> = await response.json();
  return payload;
};

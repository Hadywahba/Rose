import { JSON_HEADER } from '@/lib/constants/api.constant';
import { CategoriesResponse } from '@/lib/types/category/category';

export const getCategories = async (
  limit: number = 100,
  page: number = 1,
  name?: string
) => {
  const url = new URL(`${process.env.NEXT_PUBLIC_API}/categories`);

  url.searchParams.append('limit', String(limit));
  url.searchParams.append('page', String(page));

  if (name) {
    url.searchParams.append('search', name);
  }


  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      ...JSON_HEADER,
    },
  });

  const payload: ApiResponse<CategoriesResponse> = await response.json();
  return payload;
};
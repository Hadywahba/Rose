import { JSON_HEADER } from '@/lib/constants/api.constant';
import { OccasionsResponse } from '@/lib/types/occasion/occasion';

export const getOccasion = async (
  limit: number,
  page: number,
  name?: string,
) => {
  const url = new URL(`${process.env.NEXT_PUBLIC_API}/occasions`);

  url.searchParams.append('limit', String(limit));
  url.searchParams.append('page', String(page));

  if (name) {
    url.searchParams.append('search', name);
  }
  console.log(url.toString());
  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      ...JSON_HEADER,
    },
  });
  const payload: ApiResponse<OccasionsResponse> = await response.json();

  return payload;
};

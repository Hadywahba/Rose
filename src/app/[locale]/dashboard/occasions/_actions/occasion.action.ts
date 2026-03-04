import { JSON_HEADER } from '@/lib/constants/api.constant';
import { OccasionResponse } from '@/lib/types/occasion/occasion';

export const getOccasion = async (id: string) => {
  const response = await fetch(`${process.env.API_URL}/occasionsس/${id}`, {
    cache: 'no-store',
    method: 'GET',
    headers: {
      ...JSON_HEADER,
    },
  });
  const payload: ApiResponse<OccasionResponse> = await response.json();
  return payload;
};

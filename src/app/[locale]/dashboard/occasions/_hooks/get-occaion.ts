import { OccasionResponse } from '@/lib/types/occasion/occasion';
import { getOccasion } from '../_actions/occasion.action';

// Controller
export const GetOneOccasion = async (
  id: string,
): Promise<{
  data?: OccasionResponse;
  error?: Error;
}> => {
  const payload = await getOccasion(id);

  if ('error' in payload) {
    return { error: new Error(payload.error) };
  }

  return { data: payload };
};

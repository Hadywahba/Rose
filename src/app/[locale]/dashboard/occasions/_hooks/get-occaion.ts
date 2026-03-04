import { OccasionResponse } from '@/lib/types/occasion/occasion';
import { getOccasion } from '../_actions/occasion.action';


// Controller
export const GetOneOccasion = async (
  id: string,
): Promise<{
  data?: OccasionResponse;
  error?: string;
}> => {
  const payload = await getOccasion(id);

  if ('error' in payload) {
    return { error: payload.error };
  }

  return { data: payload };
};

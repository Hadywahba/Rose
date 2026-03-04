import { getOccasion } from '@/lib/services/occasion/occasion-content.service';
import { useQuery } from '@tanstack/react-query';

export const useOccasion = (limit: number, page: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['Occasion', limit, page],
    queryFn: async () => {
      const payload = await getOccasion(limit, page);

      if ('error' in payload) {
        throw new Error(payload.error);
      }

      return payload;
    },
  });

  return {
    occasion: data,
    isLoading,
    error,
  };
};

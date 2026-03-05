import { getOccasion } from '@/lib/services/occasion/occasion-content.service';
import { useQuery } from '@tanstack/react-query';

export const useOccasion = (limit: number, page: number, name?: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['Occasion', limit, page, name],
    queryFn: async () => {
      const payload = await getOccasion(limit, page, name);

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

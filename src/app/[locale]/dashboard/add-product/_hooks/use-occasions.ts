import { useQuery } from '@tanstack/react-query';
import { getOccasion } from '@/lib/services/occasion/occasion-content.service';

export default function useOccasions() {
  return useQuery({
    queryKey: ['occasions'],
    queryFn: async () => {
      const payload = await getOccasion(100, 1);
      if ('error' in payload) throw new Error(payload.error);
      return payload.occasions;
    },
  });
}

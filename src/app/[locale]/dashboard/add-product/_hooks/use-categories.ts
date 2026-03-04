import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/lib/services/category/category.service';

export default function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const payload = await getCategories(100, 1);
      if ('error' in payload) throw new Error(payload.error);
      return payload.categories;
    },
  });
}

import { getOverallStatisticsAction } from '@/lib/actions/statistics/get-statistics.action';
import { useQuery } from '@tanstack/react-query';

export function useStatistics() {
  // Queries
  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboard-statistics'],
    queryFn: async () => {
      const payload = await getOverallStatisticsAction();

      if ('error' in payload) {
        throw new Error(payload.error);
      }

      return payload.statistics;
    },
    staleTime: Infinity, // never refetch unless manually invalidated
    gcTime: 1000 * 60 * 60, // 1 hour — keep in memory
  });

  return { data, isLoading, error };
}

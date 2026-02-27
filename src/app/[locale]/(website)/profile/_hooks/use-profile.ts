'use client';

import { User } from '@/lib/types/auth';
import { useQuery } from '@tanstack/react-query';

export const PROFILE_QUERY_KEY = ['profile'];
// get profile data
export const useGetProfile = (initialData?: User) => {
  return useQuery({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: async () => {
      const res = await fetch('/api/profile');

      if (res.status === 401) {
        throw new Error('Unauthorized');
      }

      if (!res.ok) {
        throw new Error('Failed to fetch profile');
      }

      return res.json();
    },
    retry: false,
    initialData,
  });
};




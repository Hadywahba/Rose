'use client';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export const useDeleteAccount = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/profile/delete', {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data?.message || 'Delete failed');
      }

      return res.json();
    },
    onSuccess: () => {
      toast.success('Account deleted successfully');
      router.push('/login');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

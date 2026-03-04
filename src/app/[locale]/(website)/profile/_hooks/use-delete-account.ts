'use client';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { deleteAccountAction } from '../_actions/profile-action';

export const useDeleteAccount = () => {
  const router = useRouter();

  return useMutation({
    //  action call
    mutationFn: () => deleteAccountAction(),
    onSuccess: () => {
      toast.success('Account deleted successfully');
      router.push('/login');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
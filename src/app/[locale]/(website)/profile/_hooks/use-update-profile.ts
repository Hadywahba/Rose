'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export type UpdateProfileFormData = {
  firstName: string;
  lastName: string;
  photo?: string;
};

export const PROFILE_QUERY_KEY = ['profile'];

export const useEditProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateProfileFormData) => {
      const res = await fetch('/api/profile/edit', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error('Update failed');
      }

      return res.json();
    },
    onSuccess: () => {
      toast.success('Profile updated successfully');
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
    },
    onError: (error: Error) => toast.error(error.message),
  });
};

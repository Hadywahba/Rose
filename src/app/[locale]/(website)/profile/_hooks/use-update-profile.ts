

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { User } from '@/lib/types/auth';
import { updateProfileData } from '../_actions/update-profile-action';

export const useEditProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values: User) => {
      const formData = new FormData();
      formData.append('firstName', values.firstName);
      formData.append('lastName', values.lastName);
      if (values.photo) {
        formData.append('photo', values.photo);
      }
      return updateProfileData(formData as unknown as User);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success('Profile updated successfully');
    },
    onError: () => toast.error('Failed to update profile'),
  });
};

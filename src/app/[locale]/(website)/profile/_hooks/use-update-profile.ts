// 'use client';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { toast } from 'sonner';

// export type UpdateProfileFormData = {
//   firstName: string;
//   lastName: string;
//   photo?: string;
// };

// export const PROFILE_QUERY_KEY = ['profile'];

// export const useEditProfile = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (data: UpdateProfileFormData) => {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/editProfile`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json'},
//         body: JSON.stringify(data),
//       });

//       if (!res.ok) {
//         throw new Error('Update failed');
//       }

//       return res.json();
//     },
//     onSuccess: () => {
//       toast.success('Profile updated successfully');
//       queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
//     },
//     onError: (error: Error) => toast.error(error.message),
//   });
// };


import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { User } from '@/lib/types/auth';
import { updateProfileData } from '../_actions/profile-action';

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

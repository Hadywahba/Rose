import {  useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useUploadPhoto = () => {
    const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('photo', file);

      const res = await fetch('/api/upload-photo', {
        method: 'PUT',
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Upload failed');
      }

      return res.json();
    },
    onSuccess: () => {
      toast.success('Photo updated successfully');
      queryClient.invalidateQueries({ queryKey: ['profile'] });

    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
};

import { useMutation } from '@tanstack/react-query';
import { uploadImage } from '../actions/upload/upload-image.action';
import { toast } from 'sonner';

export const UseUpload = () => {
  // Mutations
  const { mutate, isPending, error } = useMutation({
    mutationFn: async (file: File) => {
      const payload = await uploadImage(file);

      if (payload.status === false) {
        throw new Error(payload.message);
      }

      return payload;
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    UploadImages: mutate,
    isPending,
    error,
  };
};

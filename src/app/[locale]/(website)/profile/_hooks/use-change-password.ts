import { JSON_HEADER } from './../../../../../lib/constants/api.constant';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

type ChangePasswordPayload = {
  password: string;
  newPassword: string;
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: async (data: ChangePasswordPayload) => {
      const res = await fetch('/api/change-password', {
        method: 'PATCH',
        ...JSON_HEADER,
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Change password failed');
      }

      return res.json();
    },
    onSuccess: () => {
      toast.success('Password changed successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

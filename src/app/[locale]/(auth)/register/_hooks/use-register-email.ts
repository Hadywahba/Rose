import { RegisterEmailFormFields } from '@/lib/schema/register.schema';
import { useMutation } from '@tanstack/react-query';
import { registerVerifiyEmail } from '../_action/register-verify-email.action';
import { toast } from 'sonner';

export const UseRegisterVeifiyEmail = () => {


  //   Mutation
  const {
    mutate: verifiy,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (data: RegisterEmailFormFields) => {
      const payload = await registerVerifiyEmail(data);
      if (payload.status === false) {
        throw new Error(payload.message);
      }

      return payload;
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return {
    emailVerify:verifiy,
    isPending,
    error,
  };
};

import { RegisterVerifyFormFields } from '@/lib/schema/register.schema';
import { useMutation } from '@tanstack/react-query';
import { registerVerifiyCode } from '../_action/register-verify.action';

export const UseRegisterVeifiy = () => {
  //   Mutation
  const {
    mutate: verifiy,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (data: RegisterVerifyFormFields) => {
      const payload = await registerVerifiyCode(data);
      if (payload.status === false) {
        throw new Error(payload.message);
      }

      return payload;
    },
  });

  return {
    verifiy,
    isPending,
    error,
  };
};

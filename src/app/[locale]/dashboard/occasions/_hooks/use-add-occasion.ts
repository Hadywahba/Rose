import { useMutation } from '@tanstack/react-query';
import { AddOccasionFormFields } from '@/lib/schema/occasion/occasion.schema';
import { AddOccasion } from '../_actions/add-occasion.action';

export const UseAddOccasion = () => {
  // Mutation
  const {
    mutate: Addoccasion,
    error,
    isPending,
  } = useMutation({
    mutationKey: ['AddOccasion'],
    mutationFn: async (data: AddOccasionFormFields) => {
      const payload = await AddOccasion(data);

      if ('error' in payload) {
        throw new Error(payload.error);
      }

      return payload;
    },
  });

  return {
    Addoccasion,
    error,
    isPending,
  };
};

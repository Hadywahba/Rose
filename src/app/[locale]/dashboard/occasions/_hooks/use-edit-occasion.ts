import { EditOccasionFormFields } from '@/lib/schema/occasion/occasion.schema';
import { useMutation } from '@tanstack/react-query';
import { EditOccasion } from '../_actions/edit-occasion.action';


export const UseEditOccasionName = (id: string) => {
    // Mutation
  const {
    mutate: editoccasion,
    error,
    isPending,
  } = useMutation({
    mutationKey: ['EditOccasion'],
    mutationFn: async (data: EditOccasionFormFields) => {
      const payload = await EditOccasion(id, data);

      if ('error' in payload) {
        throw new Error(payload.error);
      }

      return payload;
    },
  });

  return {
    editoccasion,
    error,
    isPending,
  };
};

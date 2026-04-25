import { AddNewOrder } from '@/lib/actions/orders/add-order.action';
import { OrderFormSchema } from '@/lib/schema/order/order-schema';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
export const useAddOrder = () => {
  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: OrderFormSchema) => {
      const payload = await AddNewOrder(fields);
      if (payload.status === false) {
        throw new Error(payload.message);
      }
      return payload;
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },

    onSuccess: (data) => {
      console.log(data);
    },
  });

  return { isPending, error, AddOrder: mutate };
};

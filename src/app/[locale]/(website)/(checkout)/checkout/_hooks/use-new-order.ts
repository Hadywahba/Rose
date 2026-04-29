import { useRouter } from '@/i18n/navigation';
import { AddNewOrder } from '@/lib/actions/orders/add-order.action';
import { OrderFormSchema } from '@/lib/schema/order/order-schema';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import { toast } from 'sonner';
export const useAddOrder = () => {
  // Translations
  const t =useTranslations('')
  // Navigation
  const router = useRouter();
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

    onSuccess: () => {
      toast.success(t('order success'));
      router.push('/allOrders');
    },
  });

  return { isPending, error, AddOrder: mutate };
};

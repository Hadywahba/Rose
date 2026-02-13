import { CheckoutContext } from '@/components/providers/app/checkout/payment-provider';
import { useRouter } from '@/i18n/navigation';
import { addPaymentWithCash } from '@/lib/actions/checkout/checkout-cash.action';
import { Addresses } from '@/lib/types/address/address';
import { CashPayload } from '@/lib/types/checkout/checkout-cash';
import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { toast } from 'sonner';

export const usePaymentCash = () => {
  // Navigation
  const router = useRouter();

  // Context
  const { setAddress, setPaymentMethod } = useContext(CheckoutContext)!;

  // Mutation
  const {
    mutate: cashPayment,
    error: cashError,
    isPending: cashPending,
  } = useMutation({
    mutationFn: async (data: Addresses) => {
      const result: CashPayload = {
        shippingAddress: {
          street: data.street,
          phone: data.phone,
          city: data.city,
          lat: data.lat,
          long: data.long,
        },
      };
      const payload = await addPaymentWithCash(result);

      if ('error' in payload) {
        throw new Error(payload.error);
      }

      return payload;
    },
    onSuccess: () => {
      toast.success('well done hady');
      router.push('/allOrders');
      setPaymentMethod(null);
      setAddress(null);
    },
  });
  return {
    cashPayment,
    cashError,
    cashPending,
  };
};

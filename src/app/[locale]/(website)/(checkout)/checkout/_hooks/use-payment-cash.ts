import { CheckoutContext } from '@/components/providers/app/checkout/payment-provider';
import { useRouter } from '@/i18n/navigation';
import { addPaymentWithCash } from '@/lib/actions/checkout/checkout-cash.action';
import { Address } from '@/lib/types/address/address';
import { CashPayload } from '@/lib/types/checkout/checkout-cash';
import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';

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
    mutationFn: async (data: Address) => {
      const result: CashPayload = {
        shippingAddress: {
          street: data.street,
          phone: data.phone,
          city: data.city,
          latitude: data.latitude,
          longitude: data.longitude,
        },
      };
      const payload = await addPaymentWithCash(result);

      if (payload.status === false) {
        throw new Error(payload.message);
      }

      return payload;
    },
    onSuccess: () => {
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

import { CheckoutContext } from '@/components/providers/app/checkout/payment-provider';
import { addPaymentWithVISA } from '@/lib/actions/checkout/checkout-visa.action';
import { Addresses } from '@/lib/types/address/address';
import { VisaPayload } from '@/lib/types/checkout/checkout-visa';
import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';


export const usePaymentVisa = () => {
  // Context
  const { setAddress, setPaymentMethod } = useContext(CheckoutContext)!;

  // Mutation
  const {
    mutate: visaPayment,
    error: visaError,
    isPending: visaPending,
  } = useMutation({
    mutationFn: async (data: Addresses) => {
      const result: VisaPayload = {
        shippingAddress: {
          street: data.street,
          phone: data.phone,
          city: data.city,
          lat: data.lat,
          long: data.long,
        },
      };
      const payload = await addPaymentWithVISA(result);
      if ('error' in payload) {
        throw new Error(payload.error);
      }
      return payload;
    },
    onSuccess: (data) => {
      // toast.success('well done hady');
      // Redirect to Stripe checkout URL
      if (data.session?.url) {
        window.location.href = data.session.url;
        setPaymentMethod(null);
        setAddress(null);
      }
    },
  });
  return {
    visaPayment,
    visaError,
    visaPending,
  };
};

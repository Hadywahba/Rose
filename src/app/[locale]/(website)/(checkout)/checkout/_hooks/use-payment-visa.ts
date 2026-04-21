import { CheckoutContext } from '@/components/providers/app/checkout/payment-provider';
import { addPaymentWithVISA } from '@/lib/actions/checkout/checkout-visa.action';
import { Address } from '@/lib/types/address/address';
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
    mutationFn: async (data: Address) => {
      const result: VisaPayload = {
        shippingAddress: {
          street: data.street,
          phone: data.phone,
          city: data.city,
          latitude: data.latitude,
          longitude: data.longitude,
        },
      };
      const payload = await addPaymentWithVISA(result);

      if (payload.status === false) {
        throw new Error(payload.message);
      }

      return payload;
    },

    onSuccess: (data) => {
      if (data.payload.session.url) {
        window.location.href = data.payload.session.url;
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

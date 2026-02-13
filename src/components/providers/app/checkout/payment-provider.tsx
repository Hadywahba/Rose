'use client';

import { PaymentMethods } from '@/lib/enums/payment-method.enum';
import { Addresses } from '@/lib/types/address/address';
import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from 'react';

type PaymentContextType = {
  address: Addresses | null;
  paymentMethod: PaymentMethods | null;
  setAddress: (address: Addresses | null) => void;
  setPaymentMethod: (method: PaymentMethods | null) => void;
};

export const CheckoutContext = createContext<PaymentContextType | undefined>(
  undefined,
);

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
  // State
  const [address, setAddressState] = useState<Addresses | null>(null);

  const [paymentMethod, setPaymentState] = useState<PaymentMethods | null>(
    null,
  );

  // Fumctions

  //   Is Used to save payment address
  const setAddress = (add: Addresses | null) => {
    setAddressState(add);
    if (add) {
      sessionStorage.setItem('checkout-addresses', JSON.stringify(add));
    } else {
      sessionStorage.removeItem('checkout-addresses');
    }
  };

  //   Is Used to save payment method
  const setPaymentMethod = (payment: PaymentMethods | null) => {
    setPaymentState(payment);
    if (payment) {
      sessionStorage.setItem('checkout-payment', payment);
    } else {
      sessionStorage.removeItem('checkout-payment');
    }
  };

  //   Effect
  useEffect(() => {
    const savedAddress = sessionStorage.getItem('checkout-addresses');

    if (savedAddress) {
      setAddressState(JSON.parse(savedAddress));
    }
    const savedPayment = sessionStorage.getItem('checkout-payment');
    if (savedPayment) {
      setPaymentState(savedPayment as PaymentMethods);
    }
  }, []);

  return (
    <CheckoutContext.Provider
      value={{ address, setAddress, paymentMethod, setPaymentMethod }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};
export const useAnswers = () => {
  const context = useContext(CheckoutContext);

  if (!context)
    throw new Error('useAnswers must be used within AnswersProvider');

  return context;
};

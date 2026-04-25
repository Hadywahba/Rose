'use client';

import { PaymentMethods } from '@/lib/enums/payment-method.enum';
import { Address } from '@/lib/types/address/address';
import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from 'react';

type PaymentContextType = {
  addressId: string | null;
  paymentMethod: PaymentMethods | null;
  notes: string;
  setAddress: (address: Address | null) => void;
  setPaymentMethod: (method: PaymentMethods | null) => void;
  setNotes: (notes: string) => void;
};

export const CheckoutContext = createContext<PaymentContextType | undefined>(
  undefined,
);

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
  // State
  const [addressId, setAddressIdState] = useState<string | null>(null);

  const [paymentMethod, setPaymentState] = useState<PaymentMethods | null>(
    null,
  );

  const [notes, setNotesState] = useState<string>('');

  // Save address (only ID)
  const setAddress = (add: Address | null) => {
    const id = add?.id ?? null;

    setAddressIdState(id);

    if (id) {
      sessionStorage.setItem('checkout-address-id', id);
    } else {
      sessionStorage.removeItem('checkout-address-id');
    }
  };

  // Save payment method
  const setPaymentMethod = (payment: PaymentMethods | null) => {
    setPaymentState(payment);

    if (payment) {
      sessionStorage.setItem('checkout-payment', payment);
    } else {
      sessionStorage.removeItem('checkout-payment');
    }
  };

  // Save notes
  const setNotes = (value: string) => {
    setNotesState(value);

    if (value) {
      sessionStorage.setItem('checkout-notes', value);
    } else {
      sessionStorage.removeItem('checkout-notes');
    }
  };

  // Load from sessionStorage
  useEffect(() => {
    const savedAddressId = sessionStorage.getItem('checkout-address-id');

    if (savedAddressId) {
      setAddressIdState(savedAddressId);
    }

    const savedPayment = sessionStorage.getItem('checkout-payment');

    if (savedPayment) {
      setPaymentState(savedPayment as PaymentMethods);
    }

    const savedNotes = sessionStorage.getItem('checkout-notes');

    if (savedNotes) {
      setNotesState(savedNotes);
    }
  }, []);

  return (
    <CheckoutContext.Provider
      value={{
        addressId,
        paymentMethod,
        notes,
        setAddress,
        setPaymentMethod,
        setNotes,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

// Hook
export const useCheckout = () => {
  const context = useContext(CheckoutContext);

  if (!context) {
    throw new Error('useCheckout must be used within CheckoutProvider');
  }

  return context;
};

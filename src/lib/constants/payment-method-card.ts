import { PaymentMethods } from '../enums/payment-method.enum';
import { PaymentTypes } from '../types/payment/payment-method';

export const paymentMethods: PaymentTypes[] = [
  {
    id: 1,
    img: '/assets/icon/cash.svg',
    alt: 'cash',
    text: 'payment-methods.cash.text',
    title: 'payment-methods.cash.title',
    type: PaymentMethods.cash,
  },
  {
    id: 2,
    img: '/assets/icon/visa.svg',
    alt: 'visa',
    text: 'payment-methods.visa.text',
    title: 'payment-methods.visa.title',
    type: PaymentMethods.visa,
  },
];

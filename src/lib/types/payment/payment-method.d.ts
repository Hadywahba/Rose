import { PaymentMethods } from "@/lib/enums/payment-method.enum";

export interface PaymentTypes {
  img: string;
  alt: string;
  id: number;
  title: string;
  text: string;
   type: PaymentMethods;
}

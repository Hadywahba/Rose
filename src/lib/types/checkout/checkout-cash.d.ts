export interface CashCheckoutResponse {
  session: string;
}

type CashPayload = {
  shippingAddress: {
    street: string;
    phone: string;
    city: string;
    lat: string;
    long: string;
  };
};

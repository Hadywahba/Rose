export type OrderPaymentType = 'cash' | 'creditcard';

export type OrderState = 'pending' | 'canceled' | 'delivered';

export type OrderProductPreview = {
  _id: string;
  title: string;
  imgCover: string;
  price: number;
  priceAfterDiscount?: number;
  rateAvg?: number;
  rateCount?: number;
  id?: string;
};

export type OrderItem = {
  _id: string;
  product: OrderProductPreview;
  price: number;
  quantity: number;
};

export type Order = {
  _id: string;
  orderNumber: string;
  createdAt: string;
  updatedAt: string;
  totalPrice: number;
  paymentType: OrderPaymentType;
  isPaid: boolean;
  isDelivered: boolean;
  state: OrderState;
  orderItems: OrderItem[];
};

export type GetUserOrdersResponse = PaginatedResponse<{
  orders: Order[];
}>;

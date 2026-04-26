import { Product } from '../products/product';

export type OrderItem = {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: string;
  createdAt: string;
  product: Product;
};

export type Order = {
  id: string;
  userId: string;
  addressId: string;
  couponId: string | null;
  status: string;
  paymentMethod: string;
  paymentStatus: string;
  stripePaymentIntentId: string | null;
  subtotal: string;
  discount: string;
  shipping: string;
  total: string;
  trackingNumber: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  orderItems: OrderItem[];
};

export type AddOrderResponse = {
  order: Order;
};

export type OrderResponse = {
  data: Order[];
  metadata: Metadata;
};

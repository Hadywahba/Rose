import { Product } from '../product/product';

export type CartItem = {
  product: Product;
  price: number;
  quantity: number;
  _id: string;
};

export type Cart = {
  _id: string;
  user: string;
  cartItems: CartItem[];
  appliedCoupons: string[];
  discount: number;
  totalPrice: number;
  totalPriceAfterDiscount: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type CartResponse = {
  numOfCartItems: number;
  cart: Cart;
  message: string;
};

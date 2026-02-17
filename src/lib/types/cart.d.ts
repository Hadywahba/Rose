import type { Product } from '@/lib/types/product';

export type AddToCartPayload = {
  product: string;
  quantity: number;
};

export type CartItem = {
  product: Product;
  price: number;
  quantity: number;
  _id: string;
};

export type Cart = {
  user: string;
  cartItems: CartItem[];
  _id: string;
  appliedCoupons: string[];
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type AddToCartResponse = {
  numOfCartItems: number;
  cart: Cart;
};

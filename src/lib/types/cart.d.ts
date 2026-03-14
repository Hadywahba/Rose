import type { Product } from '@/lib/types/products/product';

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
export type AddToCartProps = {
  productId: string;
  quantity: number;
};

export type CartItemResponse = {
  _id: string;
  product: Product;
  price: number;
  quantity: number;
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

  cartItems: CartItemResponse[];
  appliedCoupons: string[];

  totalPrice: number;
};

export type CartResponse = {
  message: 'success';
  cart: Cart;
  numOfCartItems: number;
};

export type GuestCartProductSnapshot = {
  _id: string;
  title: string;
  imgCover?: string;
  rateAvg?: number;
  rateCount?: number;
  quantity: number;
};

export type GuestCartItem = {
  _id: string; // unique row id
  quantity: number; // quantity in cart
  price: number; // unit price
  product: GuestCartProductSnapshot;
};

export type CartProductSnapshot = {
  _id: string;
  title: string;
  imgCover?: string;
  rateAvg?: number;
  rateCount?: number;
  quantity: number; // stock
};

export type CartItemUI = {
  _id: string;
  product: CartProductSnapshot;
  price: number;
  quantity: number;
};

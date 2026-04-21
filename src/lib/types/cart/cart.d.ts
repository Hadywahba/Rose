import { Product } from '../products/product';

export type CartItem = {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  product: Product;
};

export type CartPayload = {
  cartItems: CartItem[];
};

export type AddToCartPayload = {
  product: string;
  quantity: number;
};

export type AddToCartProps = {
  productId: string;
  quantity: number;
};

export type UpdateCartProps = {
  cartItemId: string;
  quantity: number;
};

export type CartItemResponse = {
  _id: string;
  product: Product;
  price: number;
  quantity: number;
};

export type AddToCartResponse = {
  cartItem: CartItem;
};

export type UpdateCartPayload = {
  cartItem: UpdatedCartItem;
};

export type CartItemUI = {
  id: string;
  productId: string;
  title: string;
  cover: string;
  price: number;
  rating: number;
  ratings: number;
  stock: number;
  quantity: number;
};

export type CartItemsUI = {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  product: Product;
};

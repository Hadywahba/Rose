import type { Product } from '@/lib/types/products/product';

export type AddToCartPayload = {
  product: string;
  quantity: number;
};

export type AddToCartProps = {
  productId: string;
  quantity: number;
};

export type CartItem = {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  product: Product;
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

// export type Cart = {
//   user: string;
//   cartItems: CartItem[];
//   _id: string;
//   appliedCoupons: string[];
//   totalPrice: number;
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
// };



// export type CartProductSnapshot = {
//   _id: string;
//   title: string;
//   imgCover?: string;
//   rateAvg?: number;
//   rateCount?: number;
//   quantity: number; // stock
// };

// export type CartItemUI = {
//   id: string;
//   title: string;
//   image: string;
//   quantity: number;
//   price: number;
// };

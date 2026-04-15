import { authOption } from '@/auth';
import { getServerSession } from 'next-auth';
import React from 'react';
import HeaderMobile from './header-mobile';
import { User } from '@/lib/types/auth';
import { Product } from '@/lib/types/products/product';
import { getCartItems } from '@/app/[locale]/(website)/(checkout)/cart/_hooks/get-cart';

interface HeaderUserNameProps {
  products: Product[];
}

export default async function HeaderUserName({
  products,
}: HeaderUserNameProps) {
  const session = await getServerSession(authOption);

  let data = { numOfCartItems: 0 };

  if (session?.user) {
    data = await getCartItems();
  }

  return (
    <>
      <HeaderMobile
        user={(session?.user as User) ?? null}
        products={products}
        cartdata={data.numOfCartItems}
      />
    </>
  );
}

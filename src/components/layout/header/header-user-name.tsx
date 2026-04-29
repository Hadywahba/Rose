import { authOption } from '@/auth';
import { getServerSession } from 'next-auth';
import React from 'react';
import HeaderMobile from './header-mobile';
import { User } from '@/lib/types/auth';
import { Product } from '@/lib/types/products/product';

import { getAddresses } from '@/app/[locale]/(website)/(checkout)/checkout/_hooks/get-address';
import { displayCart } from '@/app/[locale]/(website)/(checkout)/cart/_hooks/get-cart';
import { displayWishlist } from '@/app/[locale]/(website)/wishlist/_hook/get-wishlist';

interface HeaderUserNameProps {
  products: Product[];
}

export default async function HeaderUserName({
  products,
}: HeaderUserNameProps) {
  const session = await getServerSession(authOption);

  const {data} = await displayCart();
  const { dataWishlist } = await displayWishlist();

  const {address} = await getAddresses();

  return (
    <>
      <HeaderMobile
        user={(session?.user as User) ?? null}
        products={products}
        cartdata={data.length}
        address={address}
        wishlistdata={dataWishlist?.length}
      />
    </>
  );
}

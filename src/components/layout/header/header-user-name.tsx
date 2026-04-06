import { authOption } from '@/auth';
import { getServerSession } from 'next-auth';
import React from 'react';
import HeaderMobile from './header-mobile';
import { User } from '@/lib/types/auth';
import { SearchParams } from '@/lib/types/global';
import catchError from '@/lib/utility/catch-error';
import { fetchAllProductsService } from '@/lib/actions/products/fetch-all-products.service';
import { ProductsResponse } from '@/lib/types/products/product';

export default async function HeaderUserName() {
  // Variable
  const session = await getServerSession(authOption);

  const nextParams: SearchParams = {
    page: '1',
    limit: '200',
  };

  const [payload] = await catchError<PaginatedResponse<ProductsResponse>>(() =>
    fetchAllProductsService(nextParams),
  );
  if (!payload) {
    return null;
  }

  const products = payload?.products ?? [];
  return (
    <>
      <HeaderMobile
        user={(session?.user as User) ?? null}
        products={products}
      />
    </>
  );
}

import React from 'react';
import HeaderDetails from './header-details';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import HeaderMobile from './header-mobile';
import Headerlocation from './header-location';
import HeaderInfo from './header-info';
import HeaderSearch from './header-search';
import { getServerSession } from 'next-auth';
import { authOption } from '@/auth';
import { User } from '@/lib/types/auth';
import { SearchParams } from '@/lib/types/global';
import catchError from '@/lib/utility/catch-error';
import { fetchAllProductsService } from '@/lib/actions/products/fetch-all-products.service';
import { ProductsResponse } from '@/lib/types/products/product';
import { getAddresses } from '@/app/[locale]/(website)/(checkout)/checkout/_hooks/get-address';
import { displayCart } from '@/app/[locale]/(website)/(checkout)/cart/_hooks/get-cart';

export default async function Header() {
  // Variable
  const session = await getServerSession(authOption);
  const nextParams: SearchParams = {
    page: '1',
    limit: '200',
  };

  const [payload] = await catchError<PaginatedResponse<ProductsResponse>>(() =>
    fetchAllProductsService(nextParams),
  );

  // Display DataS
  const { data } = await displayCart();

  const { address } = await getAddresses();

  // Variables
  const products = payload?.payload.data ?? [];

  return (
    <header>
      <div className="mx-auto hidden items-center gap-4 px-4 py-4 lg:flex">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <Link href="/">
            <Image
              src="/images/logo.png"
              width={60}
              height={60}
              alt="Logo"
              className="hidden lg:flex"
            />
          </Link>
          <Headerlocation isborder={true} address={address} />
        </div>

        {/* Search Bar */}

        <div className="flex flex-1">
          <HeaderSearch products={products} />
        </div>

        {/* Header Info */}
        <HeaderInfo
          user={(session?.user as User) ?? null}
          cartdata={data.length}
        />
      </div>

      {/* Header Details  */}
      <HeaderDetails />

      {/* Header on Mobile */}
      <HeaderMobile
        user={(session?.user as User) ?? null}
        products={products}
        cartdata={data.length}
        address={address}
      />
    </header>
  );
}

import { SearchParams } from '@/lib/types/global';
import catchError from '@/lib/utility/catch-error';
import { getLocale } from 'next-intl/server';
import ProductCard from './product-card';
import { Product, ProductsResponse } from '@/lib/types/end-point-api/products';
import InvalidProducts from './invalid-products';
import { fetchAllProductsService } from '@/lib/actions/products/fetch-all-products.service';
import AppPagination from '@/components/shared/app-pagination';

type ProductsListProps = {
  pathName: string;
  searchParams: SearchParams;
};

export default async function ProductsList({
  pathName,
  searchParams,
}: ProductsListProps) {
  // Translation
  const locale = await getLocale();

  //   Variables
  const nextParams: SearchParams = {
    ...searchParams,
    page: searchParams.page ?? '1', //default
    limit: searchParams.limit ?? '6', //default
  };

  const [payload] = await catchError<PaginatedResponse<ProductsResponse>>(() =>
    fetchAllProductsService(nextParams),
  );

  const totalPages = payload?.metadata?.totalPages ?? 1;

  const products = payload?.products ?? [];

  return (
    <div className="col-span-9">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {products.length > 0 &&
          products.map((product: Product) => (
            <ProductCard
              key={product._id}
              priceBeforeSale={product.price}
              productId={product._id}
              priceAfterSale={product.priceAfterDiscount!}
              rate={product.rateAvg}
              salesCount={product.sold}
              src={product.imgCover}
              title={product.title}
              showWishListBtn={true}
            />
          ))}
      </div>

      {products.length === 0 && <InvalidProducts />}

      {totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <AppPagination
            pathname={pathName}
            searchParams={searchParams}
            currentPage={payload?.metadata?.currentPage ?? 1}
            totalPages={totalPages}
            show={products.length > 0}
            locale={locale}
          />
        </div>
      )}
    </div>
  );
}

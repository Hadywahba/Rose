import { SearchParams } from '@/lib/types/global';
import catchError from '@/lib/utility/catch-error';
import { getLocale } from 'next-intl/server';
import ProductCard from './product-card';
import { Product, ProductsResponse } from '@/lib/types/end-point-api/products';
import InvalidProducts from './invalid-products';
import { fetchAllProductsService } from '@/lib/actions/products/fetch-all-products.service';
import AppPagination from '@/components/shared/app-pagination';
import { cn } from '@/lib/utility/tailwind-merge';

type ProductsListProps = {
  searchParams: SearchParams;
};

export default async function ProductsList({
  searchParams,
}: ProductsListProps) {
  // Translation
  const locale = await getLocale();

  //   Variables
  const nextParams: SearchParams = {
    ...searchParams,
    page: searchParams.page ?? '1', //default
    limit: searchParams.limit ?? '10',
  };

  const [payload] = await catchError<PaginatedResponse<ProductsResponse>>(() =>
    fetchAllProductsService(nextParams),
  );
  if (!payload) {
    return null;
  }

  const limit = Number(nextParams.limit);

  const productsCount = payload.products.length;
  const isLastPage = productsCount < limit;

  const safeTotalPages = isLastPage
    ? payload.metadata.currentPage
    : payload.metadata.currentPage + 1;

  const totalPages = safeTotalPages;

  const products = payload?.products ?? [];

  return (
    <div className="col-span-9">
      <div
        className={cn(
          'grid grid-cols-1 gap-4   lg:border-zinc-100 lg:dark:border-zinc-600  sm:grid-cols-2 lg:grid-cols-3',
          locale === 'ar' ? ' lg:border-r-2 ' : 'lg:border-l-2 ',
        )}
      >
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
              quantity={product.quantity}
              createdAt={product.createdAt}
              productInfo={product}
            />
          ))}
      </div>

      {products.length === 0 && <InvalidProducts />}

      {totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <AppPagination
            pathname={'/products'}
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

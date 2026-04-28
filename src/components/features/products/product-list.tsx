import { SearchParams } from '@/lib/types/global';
import catchError from '@/lib/utility/catch-error';
import { getLocale } from 'next-intl/server';
import ProductCard from './product-card';
import { fetchAllProductsService } from '@/lib/actions/products/fetch-all-products.service';
import AppPagination from '@/components/shared/app-pagination';
import { cn } from '@/lib/utility/tailwind-merge';
import Empty from '@/components/shared/empty';
import ListError from '@/components/error/list-error';
import { Product, ProductsResponse } from '@/lib/types/products/product';


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

  const [payload, error] = await catchError<
    PaginatedResponse<ProductsResponse>
  >(() => fetchAllProductsService(nextParams));

  const metadata = payload?.payload.metadata;

  const totalPages = metadata?.totalPages ?? 1;

  const products = payload?.payload?.data ?? [];

  return (
    <div className="col-span-9">
      <ListError errors={error}>
        <div
          className={cn(
            'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:border-zinc-100 lg:dark:border-zinc-600',
            locale === 'ar' ? 'lg:border-r-2' : 'lg:border-l-2',
          )}
        >
          {products.length > 0 &&
            products.map((product: Product) => {
              return (
                <ProductCard
                  key={product.id}
                  productId={product.id}
                  priceAfterSale={Number(product.price)}
                  rate={product.rating}
                  salesCount={Number(product.discountValue)}
                  src={product.cover}
                  title={product.title}
                  showWishListBtn={true}
                  quantity={product.stock}
                  createdAt={product.createdAt}
                  productInfo={product}
                  priceBeforeSale={product.price}
                />
              );
            })}
        </div>

        {products.length === 0 && (
          <Empty
            buttontitle="product.product-notfound-btntitle"
            subtitle="product.product-notfound-subtitle"
            title="product.product-notfound-title"
            link="/products"
          />
        )}

        {totalPages > 1 && (
          <div className="mt-6 flex justify-center">
            <AppPagination
              pathname={'/products'}
              searchParams={searchParams}
              currentPage={Number(metadata?.page)}
              totalPages={totalPages}
              show={products.length > 0}
              locale={locale}
            />
          </div>
        )}
      </ListError>
    </div>
  );
}

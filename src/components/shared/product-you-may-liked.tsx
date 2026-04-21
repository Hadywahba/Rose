import { getTranslations } from 'next-intl/server';
import MainHeading from '@/app/[locale]/(website)/(home)/_components/main-heading';
import ProductsCarousel from '@/components/shared/products-carousel';
import { SearchParams } from '@/lib/types/global';
import { fetchAllProductsService } from '@/lib/actions/products/fetch-all-products.service';
import catchError from '@/lib/utility/catch-error';
import { ProductsResponse } from '@/lib/types/products/product';

type ProductsListProps = {
  searchParams: SearchParams;
};

export default async function ProductYouMayLiked({
  searchParams,
}: ProductsListProps) {
  // Translations
  const t = await getTranslations('product');

  const nextParams: SearchParams = {
    ...searchParams,
    page: searchParams?.page ?? '1', //default
    limit: searchParams?.limit ?? '8',
  };

  const [payload] = await catchError<PaginatedResponse<ProductsResponse>>(() =>
    fetchAllProductsService(nextParams),
  );
  if (!payload) {
    return null;
  }

  const products = payload?.payload.data ?? [];
  return (
    <div className="container p-8 mb-4">
      {/* Title */}
      <MainHeading
        className="mb-8 items-start text-start"
        paragraph={t('product-you-may-liked')}
      />
      <ProductsCarousel products={products} />
    </div>
  );
}

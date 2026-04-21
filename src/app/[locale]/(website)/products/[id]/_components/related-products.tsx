import { getTranslations } from 'next-intl/server';
import MainHeading from '@/app/[locale]/(website)/(home)/_components/main-heading';
import ProductsCarousel from '@/components/shared/products-carousel';
import catchError from '@/lib/utility/catch-error';
import { getRelatedProducts } from '@/lib/services/reviews/get-related-products';
import { RelatedProductsResponse } from '@/lib/types/products/reviews/related-products';
import ListError from '@/components/error/list-error';

export default async function RelatedProducts({
  categoryId,
  productId,
}: {
  categoryId: string;
  productId: string;
}) {
  // Translations
  const t = await getTranslations('reviews');

  // Fetch data
  const [payload, error] = await catchError<RelatedProductsResponse>(() =>
    getRelatedProducts(categoryId),
  );

  // Display Products
  const products = payload?.payload?.category?.products ?? [];

  // Filter Products
  const related = products.filter((product) => product.id !== productId);

  return (
    <div className="container p-8">
      {/* Title */}
      <MainHeading
        className="mb-5 items-start text-start"
        paragraph={t('related-products')}
      />
      <ListError errors={error}>
        <ProductsCarousel relatedProducts={related} />
      </ListError>
    </div>
  );
}

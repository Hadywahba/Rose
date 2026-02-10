import { getRelatedProducts } from '@/lib/services/reviews/get-related-products';
import { getTranslations } from 'next-intl/server';
import MainHeading from '@/app/[locale]/(website)/(home)/_components/main-heading';
import ProductsCarousel from '@/components/shared/products-carousel';

export default async function RelatedProducts({ productId }: { productId: string }) {
  // Translations
  const t = await getTranslations('reviews');

  // Hooks
  // const { data: fetchedRelatedProducts } = useRelatedProducts(productId);
  const fetchedRelatedProducts = await getRelatedProducts(productId);

  if (!fetchedRelatedProducts || fetchedRelatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="container p-8">
      {/* Title */}
      <MainHeading
        className="mb-5 items-start text-start"
        paragraph={t('related-products')}
      />
      <ProductsCarousel relatedProducts={fetchedRelatedProducts} />
    </div>
  );
}

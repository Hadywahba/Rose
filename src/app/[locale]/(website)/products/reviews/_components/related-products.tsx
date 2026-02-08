'use client';

import ProductItem from '@/components/features/products/product-item';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { useRelatedProducts } from '../_hooks/use-related-products';
import MainHeading from '../../../(home)/_components/main-heading';

export default function RelatedProducts({ productId }: { productId: string }) {
  // Translations
  const t = useTranslations('reviews');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  // Embla API state
  const [api, setApi] = useState<CarouselApi | null>(null);

  // Hooks
  const { data: fetchedRelatedProducts } = useRelatedProducts(productId);

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

      <Carousel
        setApi={setApi}
        plugins={[Autoplay({ delay: 2000 })]}
        opts={{
          align: 'start',
          loop: true,
          direction: isRTL ? 'rtl' : 'ltr',
          dragFree: true,
        }}
        className="relative w-full"
      >
        <CarouselContent>
          {fetchedRelatedProducts.map((product) => (
            <CarouselItem
              key={product._id}
              className="basis-full sm:basis-1/2 lg:basis-1/4"
            >
              <ProductItem product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* LEFT BUTTON */}
        <button
          type="button"
          aria-label="Previous"
          onClick={() => {
            if (!api) return;
            if (isRTL) {
              api.scrollNext();
            } else {
              api.scrollPrev();
            }
          }}
          className="absolute -left-1 top-1/2 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-maroon-600 text-white transition-all hover:bg-white hover:text-maroon-600"
        >
          <ChevronLeft size={20} />
        </button>

        {/* RIGHT BUTTON */}
        <button
          type="button"
          aria-label="Next"
          onClick={() => {
            if (!api) return;
            if (isRTL) {
              api.scrollPrev();
            } else {
              api.scrollNext();
            }
          }}
          className="absolute -right-1 top-1/2 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-maroon-600 text-white transition-all hover:bg-white hover:text-maroon-600"
        >
          <ChevronRight size={20} />
        </button>
      </Carousel>
    </div>
  );
}

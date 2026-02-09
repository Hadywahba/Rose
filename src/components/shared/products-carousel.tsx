"use client"
import ProductItem from '@/components/features/products/product-item';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { RelatedProduct } from '@/lib/types/products/reviews/related-products';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useState } from 'react';

type ProductsCarouselProps = {
  relatedProducts: RelatedProduct[];
};

export default function ProductsCarousel({
  relatedProducts,
}: ProductsCarouselProps) {
  // Translations
  const locale = useLocale();
  const isRTL = locale === 'ar';

  // Embla API state
  const [api, setApi] = useState<CarouselApi | null>(null);

  return (
    <>
      <Carousel
        setApi={setApi}
        // plugins={[Autoplay({ delay: 2000, stopOnInteraction: false })]}
        opts={{
          align: 'start',
          loop: true,
          direction: isRTL ? 'rtl' : 'ltr',
          dragFree: true,
        }}
        className="relative w-full"
      >
        <CarouselContent>
          {relatedProducts.map((product) => (
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
    </>
  );
}

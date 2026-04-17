'use client';

import ProductCard from '@/components/features/products/product-card';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Product } from '@/lib/types/products/product';
import { RelatedProduct } from '@/lib/types/products/reviews/related-products';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useState } from 'react';

type ProductsCarouselProps = {
  relatedProducts?: RelatedProduct[];
  products?: Product[];
};

export default function ProductsCarousel({
  relatedProducts,
  products,
}: ProductsCarouselProps) {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [api, setApi] = useState<CarouselApi | null>(null);

  // استخدم relatedProducts لو موجودة وإلا استخدم products
  const itemsToShow =
    relatedProducts && relatedProducts.length > 0 ? relatedProducts : products;

  return (
    <Carousel
      setApi={setApi}
      opts={{
        align: 'start',
        loop: true,
        direction: isRTL ? 'rtl' : 'ltr',
        dragFree: true,
      }}
      className="relative w-full"
    >
      <CarouselContent>
        {itemsToShow?.map((product) => (
          <CarouselItem
            key={product._id}
            className="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
          >
            <ProductCard
              src={product.imgCover}
              title={product.title}
              rate={product.rateAvg}
              rateCount={product.rateCount}
              priceBeforeSale={product.price}
              priceAfterSale={product.priceAfterDiscount}
              salesCount={Number(product.sold)}
              productId={product._id}
              createdAt={product.createdAt}
              quantity={product.quantity}
              showWishListBtn={true}
              productInfo={product}
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      {itemsToShow
        ? itemsToShow.length > 3 && (
            <>
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
                className="absolute -left-3 top-[35%] z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-maroon-600 text-white transition-all md:-left-2 lg:-left-0"
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
                className="absolute -right-3 top-[35%] z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-maroon-600 text-white transition-all md:-right-2 lg:-right-3"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )
        : null}
    </Carousel>
  );
}

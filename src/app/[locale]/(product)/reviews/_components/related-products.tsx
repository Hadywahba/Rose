'use client';

import MainHeading from '@/app/[locale]/(home)/_components/main-heading';
import ProductItem from '@/components/features/products/product-item';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useRelatedProducts } from '../_hooks/use-related-products';

export default function RelatedProducts({ productId }: { productId: string }) {
  // Hooks
  const { data: fetchedRelatedProducts } = useRelatedProducts(productId);

  if (!fetchedRelatedProducts || fetchedRelatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="container p-8">
      {/* Title */}
      <MainHeading
        className="mb-5 items-start text-left"
        paragraph="Related Products"
      />

      <Carousel
        plugins={[Autoplay({ delay: 2000 })]}
        opts={{ align: 'start', loop: true }}
        className="w-full"
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
        <CarouselPrevious className="absolute left-[-15px] top-1/2 z-10 -translate-y-1/2 rounded-full bg-maroon-600 text-white shadow-lg transition-all hover:bg-white hover:text-maroon-600" />
        <CarouselNext className="absolute right-[-15px] top-1/2 z-10 -translate-y-1/2 rounded-full bg-maroon-600 text-white shadow-lg transition-all hover:bg-white hover:text-maroon-600" />
      </Carousel>
    </div>
  );
}

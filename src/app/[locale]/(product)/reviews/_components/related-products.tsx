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

export default function RelatedProducts() {
  
  const relatedProducts = [
    {
      _id: '673e1cd711599201718280fb',
      title: 'Wedding Flower',
      price: 250,
      priceAfterDiscount: 100,
      rateAvg: 0,
      rateCount: 0,
    },
    {
      _id: '673e2bd91159920171828139',
      title: 'Red Wedding Flower',
      price: 250,
      priceAfterDiscount: 150,
      rateAvg: 0,
      rateCount: 0,
    },
    {
      _id: '673e2f701159920171828164',
      title: 'Fuchsia Brilliance Vase',
      price: 220,
      priceAfterDiscount: 112,
      rateAvg: 0,
      rateCount: 0,
    },
    {
      _id: '6745096c90ab40a0685402fc',
      title: 'Forever Pink | Baby Roses',
      price: 2049,
      priceAfterDiscount: 1899,
      rateAvg: 4,
      rateCount: 1,
    },
    {
      _id: '67450f1c90ab40a068540338',
      title: 'Cheerful White Gerbera Bouquet',
      price: 749,
      priceAfterDiscount: 499,
      rateAvg: 0,
      rateCount: 0,
    },
    {
      _id: '674511e790ab40a06854034b',
      title: '25 Red Roses | Black Wrap',
      price: 1999,
      priceAfterDiscount: 999,
      rateAvg: 0,
      rateCount: 0,
    },
  ];

  return (
      <div className="container p-8">
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
            {relatedProducts.map((product) => (
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

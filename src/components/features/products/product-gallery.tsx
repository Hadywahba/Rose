'use client';

import * as React from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utility/tailwind-merge';
import { ProductGalleryProps } from '@/lib/types/product/product';

export function ProductGallery({ images, children }: ProductGalleryProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap() + 1);
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-3xl overflow-hidden border-none bg-white p-0">
        <div className="relative p-6 md:p-10">
          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
              {images.map((src, index) => (
                <CarouselItem
                  key={index}
                  className="flex items-center justify-center"
                >
                  <div className="relative aspect-[3/4] max-h-[60vh] w-full">
                    <Image
                      src={src}
                      alt={`Product image ${index + 1}`}
                      fill
                      className="rounded-md object-contain"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="mt-4 flex justify-end gap-2 px-4">
              <CarouselPrevious className="static h-10 w-10 translate-y-0 border-red-200 text-red-500 hover:bg-red-50" />
              <CarouselNext className="static h-10 w-10 translate-y-0 border-red-200 text-red-500 hover:bg-red-50" />
            </div>
          </Carousel>

          <div className="absolute bottom-10 left-10 flex gap-2">
            {images.map((_, index) => (
              <div
                key={index}
                className={cn(
                  'h-2.5 w-2.5 rounded-full transition-colors',
                  current === index + 1 ? 'bg-red-700' : 'bg-gray-300',
                )}
              />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

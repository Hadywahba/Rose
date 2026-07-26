"use client";

import ProductCard from "@/components/features/products/product-card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Product } from "@/lib/types/products/product";
import { RelatedProduct } from "@/lib/types/products/reviews/related-products";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocale } from "next-intl";
import { useState } from "react";

type ProductsCarouselProps = {
  relatedProducts?: RelatedProduct[];
  products?: Product[];
};

export default function ProductsCarousel({
  relatedProducts,
  products,
}: ProductsCarouselProps) {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [api, setApi] = useState<CarouselApi | null>(null);

  const itemsToShow = relatedProducts?.length
    ? relatedProducts
    : (products ?? []);

  return (
    <Carousel
      setApi={setApi}
      opts={{
        align: "start",
        loop: true,
        direction: isRTL ? "rtl" : "ltr",
        dragFree: true,
      }}
      className="relative w-full"
    >
      <CarouselContent>
        {itemsToShow?.map((product) => {
          // Function

          return (
            <CarouselItem
              key={product.id}
              className="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <ProductCard
                src={product.cover}
                title={product.title}
                rate={product.rating}
                rateCount={product.ratings}
                priceAfterSale={Number(product.price)}
                salesCount={Number(product.stock)}
                productId={product.id}
                createdAt={product.createdAt}
                quantity={product.stock}
                showWishListBtn={true}
                productInfo={product}
              />
            </CarouselItem>
          );
        })}
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
                className={`absolute top-[35%] z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-maroon-600 text-white transition-all duration-300 hover:bg-maroon-700
              ${
                isRTL
                  ? "-right-3 md:-right-2 lg:-right-1"
                  : "-left-3 md:-left-2 lg:-left-1"
              }`}
              >
                {isRTL ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
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
                className={`absolute top-[35%] z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-maroon-600 text-white transition-all duration-300 hover:bg-maroon-700
              ${
                isRTL
                  ? "-left-3 md:-left-2 lg:-left-3"
                  : "-right-3 md:-right-2 lg:-right-3"
              }`}
              >
                {isRTL ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
              </button>
            </>
          )
        : null}
    </Carousel>
  );
}

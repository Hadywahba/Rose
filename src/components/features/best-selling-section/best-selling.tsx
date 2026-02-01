
import { cn } from "@/lib/utility/cn.util";
import { getBestSellingProducts } from "@/lib/apis/best-selling.api";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import ProductItem from "../products/product-item";



export default async function BestSellingSection() {
  const products = await getBestSellingProducts();

  return (
    <section className="mt-2">
      <div className={cn("mx-auto flex flex- md:flex-row items-start gap-8 px-4 mb-34")}>

        {/* Left Content */}
        <div className={cn("md w-1/4 ")}>
          <p className="text-soft-pink-500 font-sarabun tracking-[0.25em] font-bold text-sm uppercase mb-3">
            BEST SELLING
          </p>

          <h2 className={cn("text-3xl font-bold text-maroon-700")}>
            <span className={cn("text-soft-pink-500")}>Check Out</span> What <br />
            Everyone’s <span className={cn("text-soft-pink-500")}>Buying</span> Right Now
          </h2>
          {/* DESCRIPTION */}
          <p className={cn("text-zinc-500 text-base dark:text-zinc-400")}>
            Not sure what to choose?<br />
            Start with our best sellers, these are the gifts our customers keep coming back for.
            Whether you&apos;re celebrating a birthday, anniversary or wedding, our top picks are guaranteed to leave a lasting impression.
          </p>

          <Button variant='default' className="mt-10">Explore gifts <ArrowRight /> </Button>

        </div>


        {/* Carousel */}
        <div className={cn("md:w-3/4 relative w-full")}>
          {Array.isArray(products) && products.length > 0 ? (
            <Carousel opts={{ align: "start", loop: true }} className={cn("w-full")}>
              <CarouselContent>
                {products.map((product) => (
                  <CarouselItem
                    key={product._id}
                    className={cn("basis-full sm:basis-1/2 lg:basis-1/3")}
                  >
                    <ProductItem product={product} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute gap-0 whitespace-normal left-[-15px] [&_svg]:stroke-white hover:[&_svg]:stroke-maroon-600 top-1/2 -translate-y-1/2 z-10 bg-maroon-600 hover:bg-white shadow rounded-full" />
              <CarouselNext className="absolute gap-0 whitespace-normal right-[-15px] [&_svg]:stroke-white hover:[&_svg]:stroke-maroon-600 top-1/2 -translate-y-1/2 z-10 bg-maroon-600 hover:bg-white shadow rounded-full" />
            </Carousel>
          ) : (
            <p className="text-gray-500">No products available</p>
          )}
        </div>
      </div>
    </section>
  );
}

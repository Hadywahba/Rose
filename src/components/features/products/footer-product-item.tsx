import RateStars from "@/components/shared/rate-stars";
import { CardFooter } from "@/components/ui/card";
import { FooterProductItemProps } from "@/lib/types/components/products";
import { ShoppingCart } from "lucide-react";


export default function FooterProductItem({ product }: FooterProductItemProps) {
    const CURRENT_PRICE = product.priceAfterDiscount > 0 ? product.priceAfterDiscount : product.price;
    const OLD_PRICE = product.priceAfterDiscount > 0;

    return (
        <CardFooter id="footer-item-product" className="block h-20 p-0">
            {/* Product title */}
            <h3 className="text-maroon-700 overflow-hidden text-ellipsis text-nowrap text-lg font-semibold" title={product.title}>
                {product.title}
            </h3>

            <div className="flex items-end justify-between">
                <div>
                    {/* Show RateStars */}
                    <RateStars rateCount={product.rateAvg} />

                    {/* Show current price and old price */}
                    <span className="text-maroon-700 font-medium" aria-label="current price">
                        {CURRENT_PRICE} EGP
                        {OLD_PRICE && (
                            <del className="ms-2 text-zinc-500" aria-label="price before discount">
                                {product.price} EGP
                            </del>
                        )}
                    </span>
                </div>

                {/* Add-to-cart button */}
                <div className="relative w-9 h-9 rounded-full bg-maroon-600">

                    <ShoppingCart className="absolute w-[20px] h-[20px] top-[15.54%] left-[18.54%] right-[7.96%] bottom-[7.96%]  stroke-white"/>
 
                </div>
            </div>
        </CardFooter>
    );
}

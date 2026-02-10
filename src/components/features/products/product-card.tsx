import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import Image, { StaticImageData } from "next/image";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { RatingStars } from "@/components/ui/ring-stars";
import { Button } from "@/components/ui/button";
import ProductCardWhishlistButtons from "./product-card-whishlist-button";
import { Badge } from "@/components/ui/badge";




// Types
type ProductCardProps = {
  src: StaticImageData | string;
  title?: string;
  rate?: number;
  rateCount?: number;
  priceBeforeSale: number;
  priceAfterSale?: number;
  salesCount?: number;
  productId: string;
  className?: string;
  showWishListBtn?: boolean;
};

export default function ProductCard({
  src,
  productId,
  rate = 0,
  title = "Flower App",
  salesCount = 0,
  priceAfterSale = 0,
  priceBeforeSale = 0,
  showWishListBtn = false,
  rateCount = 0,

  className,
}: ProductCardProps) {
  // Translations
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div
      className={cn(
        "shadow dark:shadow-zinc-200 rounded-t-xl overflow-hidden relative",
        className,
      )}
    >
      <Link
        locale={locale}
        href={`/products/${productId}`}
        className="relative card-link inline-block w-full aspect-[4/3]"
      >
        <Image className="object-cover" src={src} alt={title} fill />
      </Link>
      <div className="card-content px-3 pb-2">
        <div className="product-title">
          <h2 className="font-semibold text-maroon-700 dark:text-soft-pink-200 text-xl line-clamp-1">
            {title}
          </h2>
        </div>
        {/* stars-component */}
        <RatingStars rateAvg={rate} rateCount={rateCount} />
        <div className="product-details flex justify-between items-center">
          <div className="price flex gap-3 items-center">
            <span className=" text-maroon-700 dark:text-soft-pink-200 font-medium">
              {t("price-number-currancy-base-0", { price: priceAfterSale })}
            </span>
            <span className="line-through text-zinc-400 dark:text-zinc-500">
              {t("price-number-currancy-base-0", { price: priceBeforeSale })}
            </span>
          </div>
          <Button className="w-fit rounded-full">
            <ShoppingCart size={35} />
          </Button>
        </div>
      </div>

      {salesCount > 5 && (
        <div className="badge absolute top-3 end-4">
          <Badge variant={"secondary"}>{t('hot-0')}</Badge>
        </div>
      )}

      {/*add & remove whishlist-buttons */}
      {showWishListBtn && <ProductCardWhishlistButtons productId={productId} />}
    </div>
  );
}

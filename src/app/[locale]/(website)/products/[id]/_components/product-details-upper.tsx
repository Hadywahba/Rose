'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ShoppingCart, Star, Package, HeartPlus, Heart } from 'lucide-react';
import { cn } from '@/lib/utility/tailwind-merge';
import { Button } from '@/components/ui/button';
import { FaSpinner } from 'react-icons/fa';
import { Product } from '@/lib/types/products/product';
import { getFinalPrice } from '@/lib/utility/pricing';
import { useSession } from 'next-auth/react';
import { useLocalWishlist } from '@/lib/hooks/local-storage/use-local-storage-whishlist';
import { useAddToWhishlist } from '@/lib/hooks/whishlist/use-add-to-whishlist';
import { useRemoveFromWhishlist } from '@/lib/hooks/whishlist/use-remove-from-whishlist';
import { useWishlistStatus } from '@/lib/hooks/whishlist/use-whishlist-status';
import { toast } from 'sonner';
import { useAddToCart } from '@/lib/hooks/cart/use-add-to-cart';

export default function ProductDetailsUpper({ product }: { product: Product }) {
  // Translation
  const t = useTranslations('product');

  // Session
  const session = useSession();

  // Local wishlist (guest)
  const { add, has, remove } = useLocalWishlist();

  // Server wishlist (auth)
  const { data } = useWishlistStatus();

  const wishlistItems = data?.payload?.wishlistItems ?? [];

  const inServerWishlist = wishlistItems.some(
    (item: { productId: string }) => item.productId === product.id,
  );

  const inLocalWishlist = has(product.id);

  const isWishlisted =
    session.status === 'authenticated' ? inServerWishlist : inLocalWishlist;

  // Mutations
  const { onAddToWhishlist, addWhishlistPending } = useAddToWhishlist(
    product.id,
  );

  const { onRemoveFromWhishlist, removeWhishlistPending } =
    useRemoveFromWhishlist(product.id);

  const isLoading = addWhishlistPending || removeWhishlistPending;

  // Cart
  const { isPending, onAddToCard } = useAddToCart();

  // State
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Gallery
  const gallery = [
    product?.cover,
    ...(Array.isArray(product?.gallery)
      ? product?.gallery
      : JSON.parse(product?.gallery || '[]')),
  ].filter(Boolean);

  const inStock = product?.stock !== 0;

  const finalPrice = getFinalPrice({
    price: product.price,
    discountType: product.discountType,
    discountValue: product.discountValue,
  });

  // Function
  const handleWishlistToggle = () => {
    if (session.status === 'authenticated') {
      if (isWishlisted) {
        onRemoveFromWhishlist();
      } else {
        onAddToWhishlist();
      }
    } else {
      if (isWishlisted) {
        remove(product.id);
        toast.success(t('product-removed-successfully-0'));
      } else {
        add(product.id);
        toast.success(t('product-added-successfully'));
      }
    }
  };

  return (
    <div className="container mx-auto grid grid-cols-1 gap-8 md:gap-12 lg:grid-cols-2">
      {/* Gallery */}
      <div className="space-y-4">
        <div className="relative aspect-square w-full overflow-hidden md:aspect-[4/3]">
          <Image
            src={product?.cover}
            alt={product?.title}
            fill
            className="rounded-2xl object-contain"
            priority
          />
        </div>

        <div className="flex justify-center gap-1">
          {gallery.map((url, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={cn(
                'relative size-16 flex-shrink-0 overflow-hidden rounded-xl border-2 opacity-80 transition-all duration-300 hover:opacity-100 md:size-20',
                idx === selectedIndex
                  ? 'border-maroon-600 opacity-100 dark:border-softpink-300'
                  : 'border-zinc-200 hover:border-maroon-400 dark:border-zinc-700',
              )}
            >
              <Image src={url} alt="" fill className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Info */}
      <section>
        <h1 className="mb-4 text-2xl font-semibold text-zinc-800 dark:text-white md:text-3xl">
          {product?.title}
        </h1>

        {/* Price */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-3xl font-bold">{finalPrice} EGP</span>

          <div className="ms-3 flex items-center gap-1.5 rounded-full bg-zinc-100 px-3 py-1 text-sm dark:bg-zinc-600">
            <Package className="h-4 w-4" />
            <span>{t('inStock', { count: product?.stock })}</span>
          </div>
        </div>

        {/* Rating */}
        <div className="my-4 flex items-center gap-2 border-y border-zinc-200 py-5 dark:border-zinc-600">
          <Star className="size-5 fill-yellow-400 text-yellow-400" />
          <span>Rating: {product?.rating}/5</span>
        </div>

        {/* Description */}
        <p className="leading-relaxed text-zinc-600 dark:text-zinc-300">
          {product?.description}
        </p>

        {/* Actions */}
        <div className="flex gap-3 pt-20">
          {/* Wishlist Button */}
          <Button
            variant="Subtle"
            size="icon"
            className="size-12 border-2 border-zinc-200 dark:border-zinc-700"
            disabled={isLoading}
            onClick={handleWishlistToggle}
          >
            {isWishlisted ? (
              <Heart
                className={cn(
                  'size-6',
                  'fill-maroon-600 text-maroon-600 dark:fill-softpink-300 dark:text-softpink-300',
                )}
              />
            ) : (
              <HeartPlus className="size-6 text-zinc-600 dark:text-zinc-400" />
            )}
          </Button>

          {/* Cart Button */}
          <Button
            variant="primary"
            className="h-12 flex-1"
            disabled={!inStock || isPending}
            onClick={() => onAddToCard({ productId: product.id, quantity: 1 })}
          >
            {isPending ? (
              <FaSpinner className="animate-spin" />
            ) : (
              <span className="flex items-center gap-2">
                <ShoppingCart className="size-6" />
                {t('addToCart')}
              </span>
            )}
          </Button>
        </div>
      </section>
    </div>
  );
}

'use client';

import { useLocalWishlist } from '@/lib/hooks/local-storage/use-local-storage-whishlist';
import { useAddToWhishlist } from '@/lib/hooks/whishlist/use-add-to-whishlist';
import { useRemoveFromWhishlist } from '@/lib/hooks/whishlist/use-remove-from-whishlist';
import { useWishlistStatus } from '@/lib/hooks/whishlist/use-whishlist-status';
import { HeartMinus, HeartPlus } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import React from 'react';
import { toast } from 'sonner';

type ProductCardWhishlistButtonsProps = {
  productId: string;
};

export default function ProductCardWhishlistButtons({ productId }: ProductCardWhishlistButtonsProps) {
  const t = useTranslations();
  const session = useSession();

  // Local wishlist (unauthenticated)
  const { add, has, remove } = useLocalWishlist();

  // Server wishlist — returns WishlistItem[]
  const { data: wishlistItems } = useWishlistStatus();

  // Find the item that matches this product
  const wishlistItem = wishlistItems.find((item) => item.productId === productId);

  const inServerWishlist = !!wishlistItem;
  const inLocalWishlist = has(productId);

  const isInWishlist = session.status === 'authenticated' ? inServerWishlist : inLocalWishlist;

  // Add hook
  const { onAddToWhishlist, addWhishlistPending } = useAddToWhishlist(productId);

  // Remove hook — needs wishlistItem.id (not productId) for the API call
  const { onRemoveFromWhishlist, removeWhishlistPending } = useRemoveFromWhishlist(
    wishlistItem?.id ?? '',
    productId,
  );

  const isLoading = addWhishlistPending || removeWhishlistPending;

  const handleToggle = () => {
    if (session.status === 'authenticated') {
      if (isInWishlist) {
        onRemoveFromWhishlist();
      } else {
        onAddToWhishlist();
      }
    } else {
      if (isInWishlist) {
        remove(productId);
        toast.success(t('product-removed-successfully-0'));
      } else {
        add(productId);
        toast.success(t('product-added-successfully'));
      }
    }
  };

  return (
    <button
      disabled={isLoading}
      onClick={handleToggle}
      className={`group absolute start-3 top-3 flex w-7 items-center gap-1 overflow-hidden whitespace-nowrap rounded-full p-1 text-sm transition-all duration-300 ease-in-out hover:w-44 ${
        isInWishlist ? 'bg-zinc-800 text-white' : 'bg-white text-maroon-600'
      }`}
    >
      {isInWishlist ? (
        <HeartMinus size={20} className="shrink-0" />
      ) : (
        <HeartPlus size={20} className="shrink-0" />
      )}
      <span className="translate-x-2 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
        {isInWishlist ? t('remove-from-whishlist') : t('add-to-wishlist')}
      </span>
    </button>
  );
}

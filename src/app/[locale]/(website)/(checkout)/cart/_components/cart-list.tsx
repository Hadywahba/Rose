'use client';

import { MoveLeft, MoveRight } from 'lucide-react';
import EmptyCart from './empty-cart';
import { Button } from '@/components/ui/button';
import { useRouter } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useSession } from 'next-auth/react';
import { useCart } from '@/lib/hooks/cart/use-cart';
import CartItemSkeleton from '@/components/skeletons/cart/cart-item-skeleton';
import CartItem from './cart-item';

export default function CartList() {
  // Translations
  const locale = useLocale();
  const t = useTranslations();

  // Navigation
  const router = useRouter();

  // Session
  const { data: session } = useSession();

  // Query
  const { data, isFetching, isLoading } = useCart();

  // States
  const isBusy = isLoading || isFetching;

  const cartItems = data ?? [];

  // Always array to avoid runtime errors
  const displayedCartItems = session?.user ? cartItems : [];

  const isEmpty = !isBusy && displayedCartItems.length === 0;

  // Loading state (skeleton)
  if (isBusy) {
    return (
      <div className="my-6 rounded-md border border-zinc-200 px-5 pb-5">
        {Array.from({ length: displayedCartItems.length || 3 }).map((_, i) => (
          <CartItemSkeleton
            key={i}
            className="border-b border-zinc-200 last:border-b-0"
          />
        ))}
      </div>
    );
  }

  // Empty state
  if (isEmpty) return <EmptyCart />;

  return (
    <>
      {/* cart items */}
      <div className="my-6 rounded-md border border-zinc-200 px-5 pb-5">
        {displayedCartItems.map((cart) => (
          <CartItem
            key={cart.id}
            cartInfo={cart}
            className="border-b border-zinc-200 last:border-b-0"
          />
        ))}
      </div>

      {/* continue shopping button */}
      <Button
        className="my-4 flex items-center gap-2"
        onClick={() => router.push('/products', { locale })}
      >
        {locale === 'ar' ? <MoveRight /> : <MoveLeft />}
        <span>{t('continue-shopping')}</span>
      </Button>
    </>
  );
}

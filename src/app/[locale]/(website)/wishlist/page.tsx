import React from 'react';
import { displayWishlist } from './_hook/get-wishlist';
import ListError from '@/components/error/list-error';
import { getTranslations } from 'next-intl/server';
import { Heart } from 'lucide-react';
import ProductCard from '@/components/features/products/product-card';
import EmptyWishlist from './_componnent/wishlist-empty';

export default async function WishlistPage() {
  // Translations
  const t = await getTranslations('wishlist');

  // Hook
  const { dataWishlist, error } = await displayWishlist();

  return (
    <main className="min-h-screen bg-gradient-to-br from-maroon-50 via-white to-softpink-100 px-4 py-10 dark:from-zinc-900 dark:via-maroon-950 dark:to-zinc-900">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-maroon-100 dark:bg-maroon-900/40">
            <Heart className="h-5 w-5 text-maroon-700 dark:text-softpink-400" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-zinc-800 dark:text-zinc-50 md:text-3xl">
              {t('title')}
            </h1>
            <p className="text-sm text-zinc-400 dark:text-zinc-500">
              {dataWishlist.length > 0
                ? `${dataWishlist.length} ${t('items-count')}`
                : t('subtitle')}
            </p>
          </div>
        </div>

        <ListError errors={error}>
          {dataWishlist.length === 0 ? (
            <EmptyWishlist />
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {dataWishlist.map((item) => (
                <ProductCard
                  key={item.id}
                  productId={item.product.id}
                  src={item.product.cover}
                  title={item.product.title}
                  rate={item.product.rating}
                  rateCount={item.product.ratings}
                  priceAfterSale={Number(item.product.price)}
                  salesCount={0}
                  createdAt={item.product.createdAt}
                  showWishListBtn={true}
                  quantity={item.product.stock}
                  productInfo={item.product}
                />
              ))}
            </div>
          )}
        </ListError>
      </div>
    </main>
  );
}

import { Link } from '@/i18n/navigation';
import { Heart, ShoppingBag } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

export default function EmptyWishlist() {
  // Translations
  const t = useTranslations('wishlist');
  const locale = useLocale();

  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center gap-6 rounded-2xl border border-dashed border-maroon-200 bg-white px-6 py-16 text-center dark:border-maroon-900/50 dark:bg-zinc-900">
      {/* Icon */}
      <div className="relative">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-maroon-50 dark:bg-maroon-900/30">
          <Heart
            className="h-12 w-12 text-maroon-300 dark:text-maroon-700"
            strokeWidth={1.5}
          />
        </div>
        <div className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-softpink-100 dark:bg-softpink-900/30">
          <span className="text-sm">💔</span>
        </div>
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold text-zinc-800 dark:text-zinc-50">
          {t('empty-title')}
        </h2>
        <p className="max-w-xs text-sm text-zinc-500 dark:text-zinc-400">
          {t('empty-subtitle')}
        </p>
      </div>

      {/* Button */}
      <Link
        href="/products"
        locale={locale}
        className="flex items-center gap-2 rounded-xl bg-maroon-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-maroon-700 dark:bg-softpink-400 dark:text-zinc-900 dark:hover:bg-softpink-500"
      >
        <ShoppingBag className="h-4 w-4" />
        {t('empty-button')}
      </Link>
    </div>
  );
}

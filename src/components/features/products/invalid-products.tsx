import { Link } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
export default function InvalidProducts() {
  // Translations
  const locale = useLocale();

  return (
    <p className="flex w-full flex-col items-center gap-4 text-center text-sm text-zinc-700 dark:text-zinc-400 sm:text-base">
      <span className="text-3xl" aria-hidden>
        
        🌸
      </span>

      <span className="font-medium">
        No products found for the selected filters.
      </span>

      <span className="max-w-md leading-relaxed">
        Try adjusting your filters or explore our wide range of products.
      </span>

      {/* back-to-all-products */}
      <Link
        href="/products"
        locale={locale}
        className="dark:bg-soft-pink-300 dark:hover:bg-soft-pink-200 inline-flex items-center justify-center rounded-md bg-maroon-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-maroon-700 dark:text-maroon-800"
      >
        View All Products
      </Link>
    </p>
  );
}

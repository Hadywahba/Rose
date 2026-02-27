import { TopProducts } from '@/lib/types/products/product';
import { cn } from '@/lib/utility/tailwind-merge';
import { useTranslations } from 'next-intl';

const rankColors = [
  'bg-gradient-to-r from-[hsla(45,82%,48%,0.25)] to-[hsla(45,82%,48%,0.1)]',
  'bg-gradient-to-r from-slate-500/25 to-slate-500/10',
  'bg-gradient-to-r from-[hsla(28,100%,28%,0.25)] to-[hsla(28,100%,28%,0.1)]',
];

export default function TopSellingColumn({
  products,
}: {
  products: TopProducts[];
}) {
  // Translations
  const t = useTranslations('dashboard.topSelling');

  return (
    <div className="flex flex-col gap-6 bg-white p-6 text-zinc-800">
      {/* Title */}
      <p className="text-2xl font-semibold">{t('title')}</p>

      {/* Top Selling Products List */}
      <div className="no-scrollbar flex max-h-[21.25rem] flex-col gap-3 overflow-y-auto">
        {products.map((product, index) => (
          <div
            key={product._id}
            className={cn(
              'flex items-center justify-between rounded p-2',
              rankColors[index] ?? 'bg-zinc-100',
            )}
          >
            <p
              className={cn(
                index === 0
                  ? 'font-semibold'
                  : index === 1 || index === 2
                    ? 'font-medium'
                    : 'font-normal',
              )}
            >
              {product.title}{' '}
              <span className="text-sm font-normal">({product.price} EGP)</span>
            </p>
            <p className="text-sm font-bold">
              {product.sold} <span className="font-medium">{t('sales')}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

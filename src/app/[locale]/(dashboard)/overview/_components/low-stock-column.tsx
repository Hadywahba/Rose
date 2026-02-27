import { TopProducts } from '@/lib/types/products/product';
import { cn } from '@/lib/utility/tailwind-merge';
import { useTranslations } from 'next-intl';

export default function LowStockColumn({
  products,
}: {
  products: TopProducts[];
}) {
  // Translations
  const t = useTranslations('dashboard.lowStock');

  return (
    <div className="flex flex-col gap-6 bg-white p-6 text-zinc-800">
      {/* Title */}
      <p className="text-2xl font-semibold">{t('title')}</p>

      {/* Low Stock Products List */}
      <div className="no-scrollbar flex max-h-[21.25rem] flex-col gap-3 overflow-y-auto">
        {products.map((product) => (
          <div
            key={product._id}
            className="flex items-center justify-between rounded border-b p-2"
          >
            <p>{product.title}</p>
            <p
              className={cn(
                'text-sm font-medium',
                product.quantity < 5 ? 'text-red-600' : 'text-zinc-800',
              )}
            >
              {product.quantity} <span>{t('products')}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

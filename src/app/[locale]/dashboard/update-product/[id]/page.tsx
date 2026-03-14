import { getProductById } from '@/lib/services/product/product.service';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import UpdateProductForm from './_components/update-product-form';

interface UpdateProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function UpdateProductPage({
  params,
}: UpdateProductPageProps) {
  // Params & translation
  const { id } = await params;
  const t = await getTranslations();

  // Product query
  const result = await getProductById(id);

  // Guard
  if ('error' in result || !('product' in result) || !result.product)
    notFound();

  // Data
  const product = result.product;
  const productTitle =
    typeof product.title === 'string' && product.title.trim().length > 0
      ? product.title
      : id;

  // View
  return (
    <div className="bg-zinc-50 dark:bg-zinc-800">
      <h2 className="mb-6 truncate text-2xl font-semibold text-zinc-800 dark:text-zinc-50">
        {t('products.update.title', { title: productTitle })}
      </h2>

      <div className="w-full max-w-4xl rounded-2xl bg-white p-8 shadow-sm dark:bg-zinc-800">
        <UpdateProductForm product={product} />
      </div>
    </div>
  );
}

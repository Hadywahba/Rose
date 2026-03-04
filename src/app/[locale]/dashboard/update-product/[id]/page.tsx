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
  const { id } = await params;
  const t = await getTranslations();

  const result = await getProductById(id);

  if ('error' in result) notFound();

  const product = result.product;

  return (
    <div className="bg-zinc-50 px-4 py-10 dark:bg-zinc-800">
      <h2 className="mb-6 truncate text-2xl font-semibold text-zinc-800 dark:text-zinc-50">
        {t('products.update.title', { title: product.title })}
      </h2>

      <div className="w-full max-w-4xl rounded-2xl bg-white p-8 shadow-sm dark:bg-zinc-800">
        <UpdateProductForm product={product} />
      </div>
    </div>
  );
}

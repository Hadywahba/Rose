import { useTranslations } from 'next-intl';
import AddProductForm from './_components/add-product-form';

export default function AddProductPage() {
  // Translation
  const t = useTranslations();

  // View
  return (
    <div className="bg-zinc-50 px-4 py-10 dark:bg-zinc-800">
      <h2 className="mb-6 text-2xl font-semibold text-zinc-800 dark:text-zinc-50">
        {t('products.add.title')}
      </h2>

      <AddProductForm />
    </div>
  );
}

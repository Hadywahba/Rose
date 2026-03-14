'use client';

import DashboardCategoryForm from '@/components/dashboard/dashboard-category-form';
import { useCreateCategory } from './_hooks/use-create-category';
import { useTranslations } from 'next-intl';

export default function CreateCategoryPage() {
  // Translations
  const t = useTranslations();
  // Mutation
  const { error, isPending, onCreateCategory } = useCreateCategory();
  return (
    <section>
      <header>
        <h1 className="font-semibold text-zinc-800 dark:text-zinc-50">
          {t('add-a-new-category-0')}
        </h1>
      </header>
      <footer className="mt-4 rounded-lg bg-white p-5 dark:bg-gray-800">
        <DashboardCategoryForm
          formType="category"
          mode="create"
          isLoading={isPending}
          serverError={error?.message}
          submitText={t('add-a-new-category')}
          onSubmit={(formData, reset) =>
            onCreateCategory(formData, { onSuccess: reset })
          }
        />
      </footer>
    </section>
  );
}

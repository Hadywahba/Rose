'use client';
import { useTranslations } from 'next-intl';
import { notFound } from 'next/navigation';
import { useUpdateCategory } from './_hooks/use-update-category';
import { RouteProps } from '@/lib/types/global';
import { useCurrentCategory } from './_hooks/use-current-category';
import DashboardCategoryForm from '@/components/dashboard/dashboard-category-form';
import UpdateCategorySkeleton from './_components/update-category-skeletone';

export default function UpdateCategoryPage({ params }: RouteProps) {
  // Translations
  const t = useTranslations();

  // Variables
  const categoryId = params.categoryId;
  const isValidId = categoryId.trim().length > 0;
  // guard-invalid-id
  if (!isValidId) {
    notFound();
  }

  // Query
  const { data, isPending, isFetching } = useCurrentCategory({
    categoryId,
    enabled: isValidId,
  });
  // Mutation
  const {
    onUpdateCategory,
    isPending: updateIsPending,
    error,
  } = useUpdateCategory(categoryId);

  return (
    <section>
      {isPending || isFetching ? (
        <UpdateCategorySkeleton />
      ) : (
        <>
          <header>
            <h1 className="font-semibold capitalize text-zinc-800 dark:text-zinc-50">
              {t('update-category-0')}
              {data?.category.name}
            </h1>
          </header>
          <footer className="mt-4 rounded-lg bg-white p-5 dark:bg-gray-800">
            <DashboardCategoryForm
              mode="update"
              formType="category"
              submitText={t('update-category')}
              defaultName={data?.category.name}
              currentImageUrl={data?.category.image}
              isLoading={updateIsPending}
              serverError={error?.message}
              onSubmit={(formData, reset) =>
                onUpdateCategory(formData, { onSuccess: reset })
              }
            />
          </footer>
        </>
      )}
    </section>
  );
}

import { fetchAllCategories } from '@/lib/services/category/allcategories.service';
import { CategoriesResponse } from '@/lib/types/category/category';
import { SearchParams } from '@/lib/types/global';
import catchError from '@/lib/utility/catch-error';
import CategoriesListClient from './categories-list';

type CategoriesFetcherProps = {
  searchParams: SearchParams;
};

export default async function CategoriesFetcher({ searchParams }: CategoriesFetcherProps) {
  const nextParams: SearchParams = {
    ...searchParams,
    page: searchParams.page ?? '1',
    limit: searchParams.limit ?? '20',
  };

  const [payload, error] = await catchError<PaginatedResponse<CategoriesResponse>>(
    () => fetchAllCategories(nextParams),
  );

  const categories = payload?.payload?.data ?? [];

  return <CategoriesListClient categories={categories} error={error} />;
}

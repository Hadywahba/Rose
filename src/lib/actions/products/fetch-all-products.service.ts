import { SearchParams } from '@/lib/types/global';
import { convertSearchParams } from '@/lib/utility/convert-search-params-to-string';

export async function fetchAllProductsService(searchParams: SearchParams) {
  const resp = await fetch(
    `${process.env.API_URL}/products?${convertSearchParams(searchParams).toString()}`,
    {
      next: { tags: ['products'], revalidate: 60 * 10 }, // 10 minutes cache
    },
  );
  const payload = await resp.json();
  return payload;
}

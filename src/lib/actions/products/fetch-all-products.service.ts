import { SearchParams } from '@/lib/types/global';
import { convertSearchParams } from '@/lib/utility/convert-search-params-to-string';

export async function fetchAllProductsService(searchParams: SearchParams) {
  const resp = await fetch(
    `${process.env.API_URL}/Products?${convertSearchParams(searchParams).toString()}`,
  );
  const payload = await resp.json();
  return payload;
}

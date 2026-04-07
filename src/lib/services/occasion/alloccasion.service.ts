import { SearchParams } from '@/lib/types/global';
import { convertSearchParams } from '../../utility/convert-search-params-to-string';

export async function fetchAllOccasions(searchParams: SearchParams) {
  const response = await fetch(
    `${process.env.API_URL}/occasions?${convertSearchParams(searchParams).toString()}`,
  );
  const payload = await response.json();
  return payload;
}

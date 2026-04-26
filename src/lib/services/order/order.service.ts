import { JSON_HEADER } from '@/lib/constants/api.constant';
import { SearchParams } from '@/lib/types/global';
import { convertSearchParams } from '@/lib/utility/convert-search-params-to-string';
import { getToken } from '@/lib/utility/manage-token';

export async function fetchAllOrderService(searchParams: SearchParams) {
    // Variables
  const token = await getToken();
  const query = convertSearchParams(searchParams).toString();

  const resp = await fetch(`${process.env.API_URL}/orders?${query}`, {
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token?.accessToken}`,
    },
    next: { tags: ['Orders'], revalidate: 60 * 10 },
  });

  if (!resp.ok) {
    throw new Error('Failed to fetch orders');
  }

  return await resp.json();
}

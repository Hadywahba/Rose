import { JSON_HEADER } from '@/lib/constants/api.constant';
import { ProductsResponse } from '@/lib/types/product/product';


export const getProduct = async ({
  occasionId,
  priceFrom,
  priceTo,
}: {
  occasionId?: string;
  priceFrom?: string;
  priceTo?: string;
}) => {
  const params = new URLSearchParams();

  // Append only if the value exists
  if (priceFrom) params.append('price[gte]', priceFrom);
  if (priceTo) params.append('price[lte]', priceTo);
  if (occasionId) params.append('occasion', occasionId);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/products?${params.toString()}`,
    {
      method: 'GET',
      headers: {
        ...JSON_HEADER,
      },
    },
  );
  const payload: ApiResponse<ProductsResponse> = await response.json();

  return payload;
};

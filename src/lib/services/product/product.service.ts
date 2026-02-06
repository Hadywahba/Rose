import { Product } from '@/lib/types/product';

export async function getProductById(productId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API!}/products/${productId}`,
  );

  const payload = await response.json();

  if (payload.error) {
    return { error: payload.error };
  }

  return payload as ApiResponse<{ product: Product }>;
}

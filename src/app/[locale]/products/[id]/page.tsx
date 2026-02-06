import ProductDetailsUpper from './_components/product-details-upper';
import { getProductById } from '@/lib/services/product/product.service';
import { ErrorMessage } from '@/components/ui/error-message';

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const payload = await getProductById(params.id);
  console.log(payload);

  if ('error' in payload) {
    return <ErrorMessage message={payload.error} />;
  }

  return <ProductDetailsUpper product={payload.product} />;
}

import ProductDetailsUpper from './_components/product-details-upper';
import { getProductById } from '@/lib/services/product/product.service';

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const payload = await getProductById(params.id);


  return <ProductDetailsUpper product={payload.product} />;
}

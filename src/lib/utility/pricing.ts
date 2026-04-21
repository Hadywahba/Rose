export function getFinalPrice({
  price,
  discountType,
  discountValue,
}: {
  price: number | string;
  discountType?: 'PERCENT' | 'FIXED';
  discountValue?: number | string;
}) {
  const p = Number(price);
  const d = Number(discountValue || 0);

  if (!discountType || d === 0) return p;

  if (discountType === 'PERCENT') {
    return p - (p * d) / 100;
  }

  if (discountType === 'FIXED') {
    return p - d;
  }

  return p;
}
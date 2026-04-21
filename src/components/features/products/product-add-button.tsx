'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { Product } from '@/lib/types/products/product';
import { useAddToCart } from '@/lib/hooks/cart/use-add-to-cart';

type ProductAddButtonProps = {
  productInfo: Product;
};

export default function ProductAddButton({
  productInfo,
}: ProductAddButtonProps) {
  // Translations
  const t = useTranslations();

  // Session
  const { data: session } = useSession();

  // Hooks
  const { onAddToCard, isPending } = useAddToCart();

  function handleAddToCart() {
    // If user is not logged in
    if (!session) {
      toast.error(t('please-login-first'));
      return;
    }

    // Add to cart
    onAddToCard({
      productId: productInfo.id,
      quantity: 1,
    });
  }

  return (
    <div>
      {productInfo?.stock > 0 ? (
        <Button
          size="icon"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-maroon-600"
          onClick={handleAddToCart}
          disabled={isPending}
        >
          <ShoppingCart size={35} />
        </Button>
      ) : (
        <Badge variant="secondary" className="text-sm">
          {t('product-out')}
        </Badge>
      )}
    </div>
  );
}

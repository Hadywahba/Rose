import { Button } from '@/components/ui/button';
import { MoveLeft, MoveRight } from 'lucide-react';
import { useRouter } from 'next/router';
import React from 'react';
import { useLocale, useTranslations } from 'use-intl';

export default function CartCheckoutButton() {
  // Translation
  const t = useTranslations('checkout');

  //Navigation
  const router = useRouter();

  // Hook
  const locale = useLocale();

  // Variable
  const arabic = locale === 'ar';

  //   Functions
  const goToCheckout = () => {
    router.push('/checkout');
  };
  return (
    <div className="w-full pb-4 pt-6">
      <Button
        onClick={goToCheckout}
        variant={'primary'}
        className="w-full rounded-lg py-6"
      >
        {arabic ? <MoveLeft /> : null}
        {t('checkout-summary.checkout-button')}
        {!arabic ? <MoveRight /> : null}
      </Button>
    </div>
  );
}

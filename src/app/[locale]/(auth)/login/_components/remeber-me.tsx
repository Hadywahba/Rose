'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { useTranslations } from 'next-intl';

type RememberMeProps = {
  checked: boolean;
  onChange: (value: boolean) => void;
};

export default function RememberMe({ checked, onChange }: RememberMeProps) {
  const t=useTranslations('auth.login');
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm">
      <Checkbox checked={checked} onCheckedChange={onChange} />
      {t('remember me')}
    </label>
  );
}

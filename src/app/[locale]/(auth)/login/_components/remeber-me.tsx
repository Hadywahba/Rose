'use client';

import { Checkbox } from '@/components/ui/checkbox';

type RememberMeProps = {
  checked: boolean;
  onChange: (value: boolean) => void;
};

export default function RememberMe({ checked, onChange }: RememberMeProps) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm">
      <Checkbox checked={checked} onCheckedChange={onChange} />
      Remember me
    </label>
  );
}

'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

export default function ChangePasswordForm() {
  // Translations
  const tProfile = useTranslations('profile');
  const tValidation = useTranslations('validation');

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {fields.map((field) => (
        <div key={field.name} className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-zinc-600 dark:text-zinc-300">
            {field.label}
          </label>
          <Input
            type="password"
            value={form[field.name]}
            onChange={(e) => {
              setForm((p) => ({ ...p, [field.name]: e.target.value }));
              setErrors((p) => ({ ...p, [field.name]: undefined }));
            }}
            error={!!errors[field.name]}
            className="w-full"
            noWrapper
          />
          {errors[field.name] && (
            <p className="text-xs text-red-500">{errors[field.name]}</p>
          )}
        </div>
      ))}

      <div className="flex justify-end">
        <Button
          type="submit"
          variant="primary"
          className="flex items-center gap-2"
        ></Button>
      </div>
    </form>
  );
}

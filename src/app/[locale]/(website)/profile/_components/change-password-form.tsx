'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Loader2, Save } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { resetPassword } from '@/lib/services/auth/reset-password.service';
import { toast } from 'sonner';

type ChangePasswordFormProps = {
  email: string;
};

export default function ChangePasswordForm({ email }: ChangePasswordFormProps) {
  const t = useTranslations('profile');

  const [form, setForm] = useState({
    password: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  const mutation = useMutation({
    mutationFn: () =>
      resetPassword({ email, newPassword: form.newPassword, password: form.password }),
    onSuccess: (data) => {
      if (data.status === false) {
        toast.error(data.message);
        return;
      }
      toast.success(t('password.success'));
      setForm({ password: '', newPassword: '', confirmPassword: '' });
    },
    onError: () => toast.error(t('password.error')),
  });

  const validate = () => {
    const errs: Partial<typeof form> = {};
    if (!form.password) errs.password = t('password.required');
    if (!form.newPassword || form.newPassword.length < 8) errs.newPassword = t('password.minLength');
    if (form.newPassword !== form.confirmPassword) errs.confirmPassword = t('password.mismatch');
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    mutation.mutate();
  };

  const fields: { name: keyof typeof form; label: string }[] = [
    { name: 'password', label: t('password.current') },
    { name: 'newPassword', label: t('password.new') },
    { name: 'confirmPassword', label: t('password.confirm') },
  ];

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
          disabled={mutation.isPending}
          className="flex items-center gap-2"
        >
          {mutation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {mutation.isPending ? t('saving') : t('save')}
        </Button>
      </div>
    </form>
  );
}

import React from 'react'
import { useChangePassword } from '../_hooks/use-change-password';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import type { ChangePasswordForm } from '@/lib/types/profile/change-password';
import { useTranslations } from 'next-intl';

export default function ChangePasswordForm() {

      const changePasswordMutation = useChangePassword();
      const passwordForm = useForm<ChangePasswordForm>();
// translation
const t = useTranslations('change-password');
  const { register: pwRegister, handleSubmit: pwSubmit } = passwordForm;


  const onSubmitPassword = (values: ChangePasswordForm) => {
    if (values.newPassword !== values.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    changePasswordMutation.mutate({
      password: values.password,
      newPassword: values.newPassword,
    });
  };


  return (
    <>
      <form onSubmit={pwSubmit(onSubmitPassword)} className="space-y-4">
            {/* Change Password Form */}
            <div className="space-y-2">
              <Label htmlFor="currentPassword">{t('current-password')}</Label>
              <Input type="password" {...pwRegister('password', { required: true })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">{t('new-password')}</Label>
              <Input type="password" {...pwRegister('newPassword', { required: true })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">{t('confirm-password')}</Label>
              <Input type="password" {...pwRegister('confirmPassword', { required: true })} />
            </div>
            <Button type="submit" className="bg-red-700 hover:bg-red-800 text-white px-8">
              {t('change-password')}
            </Button>
          </form>
    </>
  )
}

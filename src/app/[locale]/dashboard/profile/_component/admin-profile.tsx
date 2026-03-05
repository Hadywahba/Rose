'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { PhoneInput } from '@/components/ui/phone-input';

import { User } from '@/lib/types/auth';
import { useTranslations } from 'next-intl';
import { useEditProfile } from '@/app/[locale]/(website)/profile/_hooks/use-update-profile';
import { useDeleteAccount } from '@/app/[locale]/(website)/profile/_hooks/use-delete-account';
import { useGetProfile } from '@/app/[locale]/(website)/profile/_hooks/use-profile';
import ChangePasswordForm from '@/app/[locale]/(website)/profile/_components/change-password-form';
import { useUploadPhoto } from '@/app/[locale]/(website)/profile/_hooks/use-upload-photo';

export default function AdminProfile({ initialData }: { initialData: User }) {
  const { data, isLoading, error } = useGetProfile(initialData);
  const editMutation = useEditProfile();
  const deleteMutation = useDeleteAccount();
  const {mutate} = useUploadPhoto();
  const [showChangePassword, setShowChangePassword] = useState(false);

  // translation
  const t = useTranslations('profile');

  const profileForm = useForm<User>({
    defaultValues: {
      photo: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      gender: '',
    },
  });

  const { handleSubmit, reset, control } = profileForm;

  useEffect(() => {
    if (data?.user) {
      reset(data.user, { keepDefaultValues: true });
    }
  }, [data, reset]);

  if (isLoading && !data) return <div className="p-10">Loading profile...</div>;
  if (error && !data)
    return <div className="p-10 text-red-500">Error loading profile</div>;

  const onSubmitProfile = (values: User) => {
    editMutation.mutate(values);
  };

  return (
    <div className="flex min-h-screen gap-8 bg-white p-6 text-black">
      {/* Main Content */}
      <main className="max-w-4xl flex-1">
        {!showChangePassword ? (
          <Form {...profileForm}>
            <form
              onSubmit={handleSubmit(onSubmitProfile)}
              className="space-y-8"
            >
              {/* Upload Photo */}
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  id="photoUpload"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) mutate(file);
                  }}
                />

                <label htmlFor="photoUpload" className="cursor-pointer">
                  <Avatar className="h-20 w-20 transition hover:opacity-80">
                    <AvatarImage src={data?.user?.photo} />
                    <AvatarFallback>
                      {data?.user?.firstName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                </label>

                <div>
                  <h3 className="text-lg font-semibold">{t('Upload-Photo')}</h3>
                  <p className="text-sm text-gray-500">{t('photo-info')}</p>
                </div>
              </div>

              {/* First & Last Name */}
              <div className="grid grid-cols-2 gap-8">
                <FormField
                  control={control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>{t('First-name')}</FormLabel>
                      <FormControl>
                        <Input className="w-full" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>{t('Last-name')}</FormLabel>
                      <FormControl>
                        <Input className="w-full" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Email */}
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>{t('Email')}</FormLabel>
                    <FormControl>
                      <Input type="email" className="w-full" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone */}
              <FormField
                control={control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>{t('Phone')}</FormLabel>
                    <FormControl>
                      <PhoneInput
                        defaultCountry="EG"
                        value={field.value}
                        onChange={(value) => field.onChange(value ?? '')}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Gender */}
              <FormField
                control={control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>{t('Gender')}</FormLabel>
                    <FormControl>
                      <Input
                        disabled
                        className="w-full bg-gray-50"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Actions */}
              <div className="flex items-center justify-between border-t pt-6">
                <div>
                    <Button
                  type="button"
                  variant="link"
                  className="p-0 text-red-500"
                  onClick={() => {
                    if (
                      confirm('Are you sure you want to delete your account?')
                    ) {
                      deleteMutation.mutate();
                    }
                  }}
                >
                  {t('delete-account')}
                </Button>
                   <Button
          variant="ghost"
          className={`justify-start gap-2 text-gray-600 ${
            showChangePassword ? 'bg-gray-100' : ''
          }`}
          onClick={() => setShowChangePassword(true)}
        >
          {t('Change-Password')}
        </Button>
                </div>
                <Button
                  type="submit"
                  className="bg-red-700 px-8 text-white hover:bg-red-800"
                  disabled={editMutation.isPending}
                >
                  {editMutation.isPending ? t('Saving...') : t('save-changes')}
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <ChangePasswordForm />
        )}
      </main>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useGetProfile } from '../_hooks/use-profile';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Lock, LogOut, UserPen } from 'lucide-react';
import { PhoneInput } from '@/components/ui/phone-input';
import { useEditProfile } from '../_hooks/use-update-profile';
import { useDeleteAccount } from '../_hooks/use-delete-account';
import { signOut } from 'next-auth/react';
import { useChangePassword } from '../_hooks/use-change-password';
import { useUploadPhoto } from '../_hooks/use-upload-photo';

type ProfileData = {
  user: {
    photo: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    gender: string;
  };
};

type ChangePasswordForm = {
  password: string;
  newPassword: string;
  confirmPassword: string;
};

export default function UpdateProfilePage() {
  const { data, isLoading, error } = useGetProfile();
  const editMutation = useEditProfile();
  const deleteMutation = useDeleteAccount();
  const changePasswordMutation = useChangePassword();
const uploadPhotoMutation = useUploadPhoto();

  const [showChangePassword, setShowChangePassword] = useState(false);

  // Profile form
  const profileForm = useForm<ProfileData['user']>({
    defaultValues: {
      photo: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      gender: '',
    },
  });

  const { register, handleSubmit, reset, control } = profileForm;

  // Password form
  const passwordForm = useForm<ChangePasswordForm>();
  const { register: pwRegister, handleSubmit: pwSubmit } = passwordForm;

  // Reset profile form when data arrives
  useEffect(() => {
    if (data?.user) reset(data.user);
  }, [data, reset]);

  if (isLoading) return <div className="p-10">Loading profile...</div>;
  if (error) return <div className="p-10 text-red-500">Error loading profile</div>;

  const onSubmitProfile = (values: ProfileData['user']) => {
    editMutation.mutate(values);
  };

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
    <div className="flex min-h-screen bg-white text-black p-6 gap-8">
      {/* Sidebar */}
      <aside className="w-64 flex flex-col gap-2">
        <h1 className="text-2xl font-bold mb-6">Account Settings</h1>

        <Button
          variant="ghost"
          className={`justify-start gap-2 font-semibold ${!showChangePassword ? 'bg-gray-800 text-zinc-50' : ''}`}
          onClick={() => setShowChangePassword(false)}
        >
          <UserPen size={18} />
          My Account
        </Button>

        <Button
          variant="ghost"
          className={`justify-start gap-2 text-gray-600 ${showChangePassword ? 'bg-gray-100' : ''}`}
          onClick={() => setShowChangePassword(true)}
        >
          <Lock size={18} />
          Change Password
        </Button>

        <div className="mt-auto">
          <Button
            variant="ghost"
            className="justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 w-full"
            onClick={() => {
              signOut({ callbackUrl: '/login' });
              sessionStorage.removeItem('user');
            }}
          >
            <LogOut size={18} />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl">
        {!showChangePassword ? (
          <form onSubmit={handleSubmit(onSubmitProfile)} className="space-y-8">
            {/* Profile Form */}
            <div className="flex items-center gap-4">

<input
  type="file"
  accept="image/*"
  hidden
  id="photoUpload"
  onChange={(e) => {
    const file = e.target.files?.[0];
    if (file) uploadPhotoMutation.mutate(file);
  }}
/>

<label htmlFor="photoUpload" className="cursor-pointer">
  <Avatar className="h-20 w-20 hover:opacity-80 transition">
    <AvatarImage src={data?.user?.photo} />
    <AvatarFallback>{data?.user?.firstName?.[0]}</AvatarFallback>
  </Avatar>
</label>


              <div>
                <h3 className="font-semibold text-lg">Upload Photo</h3>
                <p className="text-sm text-gray-500">
                  You can upload a .jpg, .png, or .gif photo with max size of 5MB.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input className='w-full' {...register('firstName')} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input className='w-full' {...register('lastName')} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input className='w-full' type="email" {...register('email')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <PhoneInput
                    defaultCountry="EG"
                    value={field.value}
                    onChange={(value) => field.onChange(value ?? '')}
                  />
                )}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Input {...register('gender')} disabled className="bg-gray-50 w-full" />
            </div>

            <div className="flex justify-between items-center pt-6 border-t">
              <Button
                variant="link"
                className="text-red-500 p-0"
                onClick={() => {
                  if (confirm('Are you sure you want to delete your account?')) {
                    deleteMutation.mutate();
                  }
                }}
              >
                Delete Account
              </Button>
              <Button type="submit" className="bg-red-700 hover:bg-red-800 text-white px-8">
                Save Changes
              </Button>
            </div>
          </form>
        ) : (
          <form onSubmit={pwSubmit(onSubmitPassword)} className="space-y-4">
            {/* Change Password Form */}
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input type="password" {...pwRegister('password', { required: true })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input type="password" {...pwRegister('newPassword', { required: true })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input type="password" {...pwRegister('newPassword', { required: true })} />
            </div>
            <Button type="submit" className="bg-red-700 hover:bg-red-800 text-white px-8">
              Change Password
            </Button>
          </form>
        )}
      </main>
    </div>
  );
}

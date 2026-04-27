'use client';

import Image from 'next/image';
import { useContext, useRef, useState } from 'react';
import { Camera, Expand, X } from 'lucide-react';
import { UseUpload } from '@/lib/hooks/use-upload';
import { ImageContext } from '@/components/providers/app/profile/profile-provider';
import { normalize } from '@/lib/utility/normalize-url';
import { useUpdateProfile } from '../_hooks/use-update-profile';
import { ProfileFormFields } from '@/lib/schema/profile/profile.schema';

type ProfileAvatarProps = {
  photo: string | null;
  name: string;
  user: User;
};

export default function ProfileAvatar({
  photo,
  name,
  user,
}: ProfileAvatarProps) {
  // refs
  const fileRef = useRef<HTMLInputElement>(null);

  // state
  const [preview, setPreview] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState(false);

  // hooks
  const { UploadImages, isPending } = UseUpload();
  const { updateProfile } = useUpdateProfile();

  // context
  const { setImage, image } = useContext(ImageContext)!;

  // raw image source
  const rawPhoto = preview ?? image ?? photo;

  // safe normalize (avoid breaking blob URLs)
  const currentPhoto = rawPhoto?.startsWith('blob:')
    ? rawPhoto
    : normalize(rawPhoto);

  // handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    UploadImages(file, {
      onSuccess: (res) => {
        const uploadedPhoto = res.payload?.url;

        if (!uploadedPhoto) return;

        // update context immediately
        setImage(uploadedPhoto);

        const payload: ProfileFormFields = {
          firstName: user?.firstName,
          lastName: user?.lastName,
          phone: user?.phone,
          photo: uploadedPhoto,
        };

        updateProfile(payload, {
          onSuccess: (data) => {
            const finalPhoto = data.payload.user.photo;
            setImage(finalPhoto);
          },
        });
      },

      onError: () => {
        setPreview(null);
      },
    });
  };

  return (
    <>
      {/* Avatar */}
      <div className="relative mx-auto w-fit">
        <div className="relative h-32 w-32 overflow-hidden rounded-full ring-4 ring-maroon-200 dark:ring-maroon-800">
          <Image
            src={currentPhoto || '/images/logo.png'}
            alt={name}
            fill
            sizes="128px"
            className="object-cover"
            unoptimized={currentPhoto?.startsWith('blob:')}
          />
        </div>

        {/* Expand */}
        <button
          type="button"
          onClick={() => setLightbox(true)}
          className="absolute bottom-0 left-0 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800/80 text-white transition hover:bg-zinc-900"
        >
          <Expand className="h-4 w-4" />
        </button>

        {/* Change photo */}
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={isPending}
          className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-maroon-600 text-white transition hover:bg-maroon-700 disabled:opacity-60 dark:bg-softpink-400 dark:hover:bg-softpink-500"
        >
          <Camera className="h-4 w-4" />
        </button>

        {/* hidden input */}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setLightbox(false)}
        >
          <button
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            onClick={() => setLightbox(false)}
          >
            <X className="h-5 w-5" />
          </button>

          <div
            className="relative h-80 w-80 overflow-hidden rounded-2xl sm:h-[28rem] sm:w-[28rem]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={currentPhoto || '/images/logo.png'}
              alt={name}
              fill
              className="object-cover"
              unoptimized={currentPhoto?.startsWith('blob:')}
            />
          </div>
        </div>
      )}
    </>
  );
}

'use client';
import Image from 'next/image';
import React from 'react';
import { useTheme } from 'next-themes';

type Props = {
  position?: 'top' | 'bottom';
};
export default function DecorativeOrnament({ position = 'top' }: Props) {
  const { theme } = useTheme();
  return (
    <Image
      src={
        theme === 'dark'
          ? '/images/decoration-auth-dark-img.png'
          : '/images/decoration-auth-img.png'
      }
      alt="Decorative Ornament"
      width={150}
      height={150}
      className={`mx-auto h-12 w-72 object-contain ${position === 'bottom' ? 'mt-8 rotate-180' : 'mb-8'}`}
    />
  );
}

'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
export default function Error() {
  const t = useTranslations('global-error');

  return (
    <html>
      <body>
        <div className="flex h-screen flex-col items-center justify-center">
          <Image
            src="/assets/images/server-down 1.png"
            alt="Error"
            width={128}
            height={128}
            className="mb-4 h-32 w-32 animate-pulse"
          />
          <h1 className="text-3xl font-bold text-black">
            {t('title')}
          </h1>
          <p className="text-zinc-400">{t('description')}</p>
        </div>
      </body>
    </html>
  );
}

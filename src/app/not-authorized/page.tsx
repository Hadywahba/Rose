import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function NotAuthorized() {
  // translation
  const t = useTranslations('not-authorized');
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <Image
          src="/assets/images/not-authorized.png"
          alt="Error"
          width={228}
          height={228}
          className="mb-4 m-auto"
        />
        <h1 className="mt-2">{t('title')}</h1>
        <p className="mb-8">{t('description')}</p>
        <Link href="/"  className="mt-8 bg-zinc-50 border-zinc-300 border p-2 rounded-md ">
            {t('go-home')}
        </Link>
      </div>
    </div>
  );
}
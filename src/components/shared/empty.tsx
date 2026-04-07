import { Link } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';

interface EmptyProps {
  title: string;
  subtitle: string;
  buttontitle?: string;
  link?: string;
}
export default function Empty({
  title,
  subtitle,
  buttontitle,
  link,
}: EmptyProps) {
  // Translations
  const t = useTranslations();
  const locale = useLocale();

  return (
    <p className="flex min-h-[400px] flex-col items-center justify-center gap-4 text-center text-sm text-zinc-700 dark:text-zinc-400 sm:text-base">
      <span className="text-xl font-semibold text-zinc-700 dark:text-zinc-300">
        {t(title)}
      </span>

      <span className="text-zinc-500">{t(subtitle)}</span>

      {link && (
        <Link
          href={link}
          locale={locale}
          className="dark:bg-soft-pink-300 dark:hover:bg-soft-pink-200 inline-flex items-center justify-center rounded-md bg-maroon-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-maroon-700 dark:text-maroon-800"
        >
          {t(buttontitle)}
        </Link>
      )}
    </p>
  );
}

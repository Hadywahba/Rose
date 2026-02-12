import Image from 'next/image';
import emptyPhoto from '../../../../../../public/assets/images/empty-cart.png';
import { useTranslations } from 'next-intl';
export default function EmptyCart() {
  // Translations
  const t = useTranslations();
  return (
    <div className="my-5 flex flex-col items-center gap-6 rounded-md border border-zinc-200 px-2 py-5">
      <div className="img relative">
        <Image src={emptyPhoto} alt="emty-cart" width={250} height={0} />
      </div>
      <p className="text-lg text-zinc-400">{t('emtycart')}</p>
    </div>
  );
}

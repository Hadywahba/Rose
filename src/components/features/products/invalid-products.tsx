import { Link } from "@/i18n/navigation"
export default function InvalidProducts() {

    // Translations
const locale = useLocale()

  return (
    
         <p className="w-full text-center flex flex-col items-center gap-4 text-sm sm:text-base text-zinc-700 dark:text-zinc-400">
                <span className="text-3xl" aria-hidden> 🌸</span>
      
                <span className="font-medium">{t('no-products-found-for-this-page')}</span>
      
                <span className="max-w-md leading-relaxed">
                 {t('products-filter-not-found')}
                </span>
      
      {/* back-to-all-products */}
                <Link
                  href="/products"
                  locale={locale}
                  className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-maroon-600 text-white hover:bg-maroon-700
            transition-colors
            dark:bg-soft-pink-300 dark:text-maroon-800
            dark:hover:bg-soft-pink-200
          "
                >
{t('view-all-products')}               
 </Link>
              </p>
        
    
  )
}

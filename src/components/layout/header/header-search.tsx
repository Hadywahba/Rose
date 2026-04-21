'use client';

import { Input } from '@/components/ui/input';

import { Search } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import ProductSearch from './product-search';
import { useDebounce } from 'use-debounce';
import { useTranslations } from 'next-intl';
import { Product } from '@/lib/types/products/product';
import { getFinalPrice } from '@/lib/utility/pricing';

interface SearchProps {
  products: Product[];
}

export default function HeaderSearch({ products }: SearchProps) {
  // Translation
  const t = useTranslations('product');

  // State
  const [showProduct, setShowProduct] = useState(false);
  const [query, setQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [debouncedQuery] = useDebounce(query, 300);

  // Ref
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Effect
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowProduct(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter products based on query
  useEffect(() => {
    if (!products || products.length === 0) {
      setFilteredProducts([]);
      return;
    }

    if (debouncedQuery.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(debouncedQuery.toLowerCase()),
      );
      setFilteredProducts(filtered);
    }
  }, [debouncedQuery, products]);

  return (
    <div ref={wrapperRef} className="relative flex-grow">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

      <Input
        onClick={() => setShowProduct(true)}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        value={query}
        placeholder={t('search-placeholder')}
        className="h-12 w-full rounded-lg border-gray-200 pl-10 focus:border-none focus-visible:ring-zinc-200 dark:text-white"
      />

      {showProduct && (
        <div className="absolute top-12 z-40 w-full rounded-sm bg-zinc-50 shadow-md dark:bg-zinc-800">
          <h1 className="border-y-[.0625rem] border-zinc-200 p-3 text-base font-semibold text-maroon-700 dark:text-softpink-200">
            {t('product-you-may-liked')}
          </h1>

          <div className="max-h-[25rem] w-full overflow-y-auto py-2">
            {products.length === 0 ? (
              <p className="p-3 text-zinc-500 dark:text-zinc-100">
                {t('no-products-available')}
              </p>
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((product: Product) => {
                const finalPrice = getFinalPrice({
                  price: product.price,
                  discountType: product.discountType,
                  discountValue: product.discountValue,
                });
                return (
                  <ProductSearch
                    key={product.id}
                    priceBeforeSale={Number(product.price)}
                    productId={product.id}
                    priceAfterSale={finalPrice}
                    rate={product.rating}
                    salesCount={Number(product.discountValue)}
                    src={product.cover}
                    title={product.title}
                    showWishListBtn={true}
                    quantity={product.stock}
                    createdAt={product.createdAt}
                    product={product}
                  />
                );
              })
            ) : (
              <p className="p-3 text-zinc-500 dark:text-zinc-100">
                {t('product-not-found')}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

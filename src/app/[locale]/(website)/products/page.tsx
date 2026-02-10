import { Suspense } from "react"; // 1. استيراد Suspense
import ProductListing from "@/components/features/products/product-listing";
import CategoriesFilter from "./_components/categories/categories-filter";
import RatingFilter from "./_components/rating/rating-filter";
import ResetAll from "./_components/reset/reset-all";

export default async function ProductsPage() {
  return (
    <div className="flex flex-row items-start gap-6 p-6">
      <main className="w-[280px] rounded-2xl bg-white p-4 shadow-sm space-y-6">
        {/* 2. تغليف الفلاتر بـ Suspense لأنها غالباً بتغير في الـ URL */}
        <Suspense fallback={<div>Loading Filters...</div>}>
          <CategoriesFilter />
          <RatingFilter />
          <ResetAll />
        </Suspense>
      </main>

      <section className="flex-1">
        {/* 3. تغليف قائمة المنتجات بـ Suspense */}
        <Suspense fallback={<div>Loading Products...</div>}>
          <ProductListing />
        </Suspense>
      </section>
    </div>
  );
}
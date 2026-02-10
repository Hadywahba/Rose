import { fetchAllProductsAction } from "@/lib/actions/products/fetch-all-products.action";
import { SearchParams } from "@/lib/types/global";
import catchError from "@/lib/utility/catch-error";
import { getLocale } from "next-intl/server";
import ProductCard from "./product-card";

type ProductsListProps = {
  pathName: string;
  searchParams: SearchParams;
};

export default async function ProductsList({
  pathName,
  searchParams,
}: ProductsListProps) {
  // Translation
  const locale = await getLocale();

//   Variables
  const nextParams: SearchParams = {
    ...searchParams,
    page: searchParams.page ?? "1",  //default
    limit: searchParams.limit ?? "6", //default
  };

  const [payload, error] = await catchError<PaginatedResponse<ProductsRespons>>(() =>
    fetchAllProductsAction(nextParams),
  );

  if (error || !payload || "error" in payload) {
    throw new Error(payload?.message || "Error During Fetch Products");
  }

  const totalPages = payload.metadata?.totalPages ?? 1;

  return (
    <div className="w-full flex-1">
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {payload.products.length > 0 &&
          payload.products.map((product) => (
            <ProductCard
              key={product._id}
              priceBeforeSale={product.price}
              productId={product._id}
              priceAfterSale={product.priceAfterDiscount!}
              rate={product.rateAvg}
              salesCount={product.sold}
              src={product.imgCover}
              title={product.title}
            />
          ))}
      </div>

      {/* label for invalid products */}
      {payload.products.length === 0 &&  InvalidProducts}
     
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center">
            {/* pagination */}
          <AppPagination
            pathname={pathName}
            searchParams={searchParams}
            currentPage={payload.metadata.currentPage}
            totalPages={totalPages}
            show={payload.products.length > 0}
            locale={locale}
          />
        </div>
      )}
    </div>
  );
}

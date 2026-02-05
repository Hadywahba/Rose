import { SearchParams } from "@/lib/types/global";
import { convertSearchParams } from "@/lib/utility/convert-search-params-to-string";


const PRODUCTS = "/Products"

export async function fetchAllProductsAction(searchParams:SearchParams) {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_API}${PRODUCTS}?${convertSearchParams(searchParams).toString()}`);
  const payload = await resp.json();
  return payload;
}

import { CategoriesResponse } from "@/app/[locale]/(website)/products/_types/categories";

export async function getCategories(
  page: number = 1,
  limit: number = 7
): Promise<CategoriesResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/categories?page=${page}&limit=${limit}`,
    {
      headers: {
        "Content-Type": "application/json",
      },

    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
}

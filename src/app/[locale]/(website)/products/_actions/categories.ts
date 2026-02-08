"use server"; // مهم جداً لو هتكلم قاعدة البيانات مباشرة أو API داخلي

import { CategoriesResponse } from "../_types/categories";

export async function fetchCategoriesAction(pageParam: number = 1): Promise<CategoriesResponse> {
  // Use the backend API directly from the server action
  const backendUrl = `${process.env.API_URL}/categories?page=${pageParam}&limit=7`;
  
  const res = await fetch(backendUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 60 }, // Cache for 60 seconds
  });
  
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  
  return res.json();
}